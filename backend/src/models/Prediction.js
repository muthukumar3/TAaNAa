import mongoose from 'mongoose';

const predictionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  prediction: {
    type: String,
    enum: ['heads', 'tails'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  result: {
    type: String,
    enum: ['heads', 'tails', 'pending'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Prediction = mongoose.model('Prediction', predictionSchema);

export default Prediction;