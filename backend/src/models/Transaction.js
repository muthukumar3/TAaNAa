import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['deposit', 'withdraw'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    default: 'completed'
  }
}, { timestamps: true });

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
