import mongoose from 'mongoose';

const walletRequestSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'settled', 'failed', 'canceled'],
    default: 'pending'
  },
  referenceId: {
    type: String // For deposits (TXID)
  },
  walletAddress: {
    type: String // For withdrawals
  },
  adminNote: {
    type: String
  }
}, { timestamps: true });

const WalletRequest = mongoose.model('WalletRequest', walletRequestSchema);

export default WalletRequest;
