import User from '../models/user.model.js';
import AuditLog from '../models/auditLog.model.js';
import Transaction from '../models/transaction.model.js';

export const getAdminStats = async (req, res) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const [totalUsers, balanceSum, recentSignups] = await Promise.all([
      User.countDocuments(),
      User.aggregate([{ $group: { _id: null, total: { $sum: '$balance' } } }]),
      User.countDocuments({ createdAt: { $gte: sevenDaysAgo } }),
    ]);

    res.status(200).json({
      success: true,
      data: {
        totalUsers,
        totalLiquidity: balanceSum[0]?.total || 0,
        recentSignups,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching stats' });
  }
};

export const updateUserBalance = async (req, res) => {
  try {
    const { userId } = req.params;
    const { action, amount, reason } = req.body;

    if (
      !['balance_credit', 'balance_debit'].includes(action) ||
      typeof amount !== 'number' ||
      amount <= 0
    ) {
      return res.status(400).json({ message: 'Invalid action or amount' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const previousBalance = user.balance;
    let newBalance = previousBalance;

    if (action === 'balance_credit') {
      newBalance += amount;
    } else {
      newBalance -= amount;
      if (newBalance < 0) {
        return res
          .status(422)
          .json({ message: 'Debit amount exceeds current balance' });
      }
    }

    const sanitizedReason = reason?.trim()
      ? reason.trim().substring(0, 500)
      : 'Admin manual adjustment';
    const noteValue = reason?.trim() ? reason.trim().substring(0, 200) : null;

    user.balance = newBalance;
    await user.save();

    const transactionDoc =
      action === 'balance_credit'
        ? {
            type: 'added',
            fromUser: null,
            toUser: userId,
            amount,
            senderBalanceAfter: null,
            recipientBalanceAfter: newBalance,
            note: noteValue,
            status: 'success',
          }
        : {
            type: 'debited',
            fromUser: userId,
            toUser: null,
            amount,
            senderBalanceAfter: newBalance,
            recipientBalanceAfter: null,
            note: noteValue,
            status: 'success',
          };

    const transaction = await Transaction.create(transactionDoc);

    await AuditLog.create({
      adminId: req.user._id,
      targetUserId: userId,
      action,
      previousBalance,
      newBalance,
      amountChanged: amount,
      reason: sanitizedReason,
      relatedTransactionId: transaction._id,
      metadata: {
        ipAddress: req.ip,
        userAgent: req.headers['user-agent'],
      },
    });

    res.status(200).json({
      success: true,
      message: 'Balance updated successfully',
      updatedBalance: newBalance,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Internal server error during balance update',
      detail: error.message,
    });
  }
};

export const getAuditLogs = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const pageNum = Math.max(1, parseInt(page));
    const limitNum = parseInt(limit);

    const [logs, count] = await Promise.all([
      AuditLog.find({})
        .sort({ createdAt: -1 })
        .limit(limitNum)
        .skip((pageNum - 1) * limitNum)
        .populate('targetUserId', 'username email'),
      AuditLog.countDocuments({}),
    ]);

    res.status(200).json({
      success: true,
      logs,
      totalPages: Math.ceil(count / limitNum),
      currentPage: pageNum,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving audit logs' });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password -refreshToken');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users' });
  }
};
