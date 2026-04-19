import mongoose from 'mongoose';
import User from '../models/user.model.js';
import Transaction from '../models/transaction.model.js';

export const initiateTransfer = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { recipientIdentifier, amount, note } = req.body;
    const senderId = req.user._id;

    if (!amount || amount < 0.01) {
      return res.status(400).json({ message: 'Amount must be at least 0.01' });
    }

    const recipient = await User.findOne({
      $or: [
        { username: recipientIdentifier?.toLowerCase() },
        { email: recipientIdentifier?.toLowerCase() },
      ],
    }).session(session);

    if (!recipient) {
      await session.abortTransaction();
      return res.status(404).json({ message: 'Recipient not found' });
    }

    if (recipient._id.equals(senderId)) {
      await session.abortTransaction();
      return res
        .status(400)
        .json({ message: 'Cannot transfer funds to yourself' });
    }

    const sender = await User.findById(senderId).session(session);
    if (sender.balance < amount) {
      await session.abortTransaction();
      return res.status(422).json({ message: 'Insufficient balance' });
    }

    sender.balance -= amount;
    recipient.balance += amount;

    await Promise.all([sender.save({ session }), recipient.save({ session })]);

    const [transaction] = await Transaction.create(
      [
        {
          type: 'debited',
          fromUser: senderId,
          toUser: recipient._id,
          amount,
          senderBalanceAfter: sender.balance,
          recipientBalanceAfter: recipient.balance,
          note: note?.substring(0, 200),
          status: 'success',
        },
      ],
      { session }
    );

    await session.commitTransaction();

    res.status(200).json({
      success: true,
      message: 'Transfer successful',
      transaction,
      updatedBalance: sender.balance,
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: 'Transfer failed due to server error' });
  } finally {
    session.endSession();
  }
};
