import Prediction from '../models/Prediction.js';
import Wallet from '../models/Wallet.js';

export const participateInGame = async (req, res) => {
    try {
        const { prediction, amount } = req.body;
        const userId = req.user._id;

        const wallet = await Wallet.findOne({ user: userId });
        if (!wallet || wallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        wallet.balance -= Number(amount);
        await wallet.save();

        const newPrediction = new Prediction({
            userId,
            prediction,
            amount: Number(amount)
        });
        await newPrediction.save();

        res.status(201).json({ message: 'Participation successful', prediction: newPrediction });
    } catch (error) {
        res.status(500).json({ message: 'Participation failed', error: error.message });
    }
};

export const getGameResults = async (req, res) => {
    try {
        const userId = req.user._id;
        const predictions = await Prediction.find({ userId }).sort({ createdAt: -1 });
        res.status(200).json(predictions);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch results', error: error.message });
    }
};
