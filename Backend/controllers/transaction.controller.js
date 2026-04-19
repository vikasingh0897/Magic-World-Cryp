import Transaction from '../models/transaction.model.js';

export const getTransactions = async (req, res) => {
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

    const formattedData = transactions.map((t) => {
      const isSender = t.fromUser?._id.equals(req.user._id);
      return {
        transactionId: t._id,
        type: t.type,
        counterparty: isSender
          ? t.toUser?.username || 'System/Admin'
          : t.fromUser?.username || 'System/Admin',
        amount: t.amount,
        balanceAfter: isSender ? t.senderBalanceAfter : t.recipientBalanceAfter,
        note: t.note,
        createdAt: t.createdAt,
      };
    });

    res.status(200).json({
      success: true,
      data: formattedData,
      pagination: {
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving transaction history' });
  }
};
