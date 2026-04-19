import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import sendEmail from '../utils/mailHelper.util.js';
import generateToken from '../utils/generateToken.util.js';
import {
  signupWelcomeTemplate,
  forgotPasswordTemplate,
} from '../utils/mailTemplate.util.js';

const sendRefreshTokenCookie = (res, token) => {
  res.cookie('refreshToken', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: '/api/v1/auth/refresh',
  });
};

const hashToken = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const register = async (req, res) => {
  try {
    const { username, email, password, firstName, lastName } = req.body;

    const existingUser = await User.findOne({
      $or: [
        { email: email.toLowerCase() },
        { username: username.toLowerCase() },
      ],
    });

    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'Username or Email already taken' });
    }

    const { rawToken, hashedToken } = generateToken();

    const user = await User.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
      firstName,
      lastName,
      emailVerifyToken: hashedToken,
      emailVerifyTokenExpiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${rawToken}&id=${user._id}`;

    await sendEmail({
      email: user.email,
      subject: 'Verify your account',
      html: signupWelcomeTemplate(user.username, verifyUrl),
    });

    res.status(201).json({
      success: true,
      message: 'Registration successful. Please verify your email.',
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Registration failed', error: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { token, id } = req.query;
    if (!token || !id)
      return res.status(400).json({ message: 'Invalid verification request' });

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    if (user.emailVerified) {
      return res.status(200).json({ message: 'Account already verified' });
    }

    if (
      user.emailVerifyToken !== hashToken(token) ||
      user.emailVerifyTokenExpiresAt < new Date()
    ) {
      return res
        .status(400)
        .json({ message: 'Token is invalid or has expired' });
    }

    user.emailVerified = true;
    user.emailVerifyToken = undefined;
    user.emailVerifyTokenExpiresAt = undefined;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: 'Email verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Verification failed' });
  }
};

export const resendVerification = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.emailVerified)
      return res.status(400).json({ message: 'Account already verified' });

    const { rawToken, hashedToken } = generateToken();
    user.emailVerifyToken = hashedToken;
    user.emailVerifyTokenExpiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    await user.save();

    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${rawToken}&id=${user._id}`;

    await sendEmail({
      email: user.email,
      subject: 'Verify your account',
      html: signupWelcomeTemplate(user.username, verifyUrl),
    });

    res.status(200).json({ success: true, message: 'Verification email sent' });
  } catch (error) {
    res.status(500).json({ message: 'Error resending verification' });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    if (!user.emailVerified) {
      return res
        .status(403)
        .json({ message: 'Please verify your email to continue' });
    }

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = hashToken(refreshToken);
    await user.save();

    sendRefreshTokenCookie(res, refreshToken);

    res.status(200).json({
      success: true,
      accessToken,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        balance: user.balance,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login encountered an error' });
  }
};

export const refresh = async (req, res) => {
  try {
    const rawToken = req.cookies?.refreshToken;
    if (!rawToken) return res.status(401).json({ message: 'Unauthorized' });

    const user = await User.findOne({ refreshToken: hashToken(rawToken) });
    if (!user) return res.status(401).json({ message: 'Invalid session' });

    try {
      jwt.verify(rawToken, process.env.REFRESH_TOKEN_SECRET);
    } catch {
      user.refreshToken = null;
      await user.save();
      return res.status(401).json({ message: 'Session expired' });
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    user.refreshToken = hashToken(newRefreshToken);
    await user.save();

    sendRefreshTokenCookie(res, newRefreshToken);
    res.status(200).json({ success: true, accessToken: newAccessToken });
  } catch (error) {
    res.status(500).json({ message: 'Session refresh failed' });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res
        .status(200)
        .json({ message: 'If an account exists, a reset link has been sent' });
    }

    const { rawToken, hashedToken } = generateToken();
    user.passwordResetToken = hashedToken;
    user.passwordResetTokenExpiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${rawToken}&id=${user._id}`;

    await sendEmail({
      email: user.email,
      subject: 'Password Reset Request',
      html: forgotPasswordTemplate(resetUrl),
    });

    res
      .status(200)
      .json({ success: true, message: 'Reset link sent to your email' });
  } catch (error) {
    res.status(500).json({ message: 'Password reset request failed' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, id, newPassword } = req.body;

    const user = await User.findOne({
      _id: id,
      passwordResetToken: hashToken(token),
      passwordResetTokenExpiresAt: { $gt: new Date() },
    });

    if (!user)
      return res
        .status(400)
        .json({ message: 'Link is invalid or has expired' });

    user.password = newPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiresAt = undefined;
    user.refreshToken = null;
    await user.save();

    res
      .status(200)
      .json({ success: true, message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: 'Password reset failed' });
  }
};

export const logout = async (req, res) => {
  try {
    const rawToken = req.cookies?.refreshToken;

    if (rawToken) {
      await User.findOneAndUpdate(
        { refreshToken: hashToken(rawToken) },
        { refreshToken: null }
      );
    }

    res.clearCookie('refreshToken', {
      path: '/api/v1/auth/refresh',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    res.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Logout failed' });
  }
};
