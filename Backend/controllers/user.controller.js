import User from '../models/user.model.js';
import Transaction from '../models/transaction.model.js';

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select(
      '-password -refreshToken'
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        balance: user.balance,
        role: user.role,
        emailVerified: user.emailVerified,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile' });
  }
};

export const getMyTransactions = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = Math.min(parseInt(req.query.limit) || 20, 100);
    const { type } = req.query;

    const query = {
      $or: [{ fromUser: req.user._id }, { toUser: req.user._id }],
    };

    if (['credited', 'debited', 'added'].includes(type)) {
      query.type = type;
    }

    const [transactions, totalCount] = await Promise.all([
      Transaction.find(query)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .populate('fromUser', 'username')
        .populate('toUser', 'username'),
      Transaction.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: transactions,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving transaction history' });
  }
};
