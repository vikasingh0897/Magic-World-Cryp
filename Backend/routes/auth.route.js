import { Router } from 'express';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import {
  register,
  login,
  refresh,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  resendVerification,
} from '../controllers/auth.controller.js';

const router = Router();

// User registration
router.post('/register', register);

// Email verification logic
router.get('/verify-email', verifyEmail);
router.post('/resend-verification', resendVerification);

// Authentication & Token management
router.post('/login', login);
router.post('/refresh', refresh);

// Password recovery
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Logout (Requires valid Access Token)
router.post('/logout', verifyJWT, logout);

export default router;
