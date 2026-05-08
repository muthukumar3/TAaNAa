import Wallet from '../models/Wallet.js';

export const depositWallet = async (req, res) => {
    try {
        const { amount } = req.body;
        const userId = req.user._id;

        let wallet = await Wallet.findOne({ user: userId });
        if (!wallet) {
            wallet = new Wallet({ user: userId, balance: 0 });
        }

        wallet.balance += Number(amount);
        await wallet.save();

        res.status(200).json({ message: 'Deposit successful', balance: wallet.balance });
    } catch (error) {
        res.status(500).json({ message: 'Deposit failed', error: error.message });
    }
};

export const getWalletBalance = async (req, res) => {
    try {
        const userId = req.user._id;
        const wallet = await Wallet.findOne({ user: userId });
        
        if (!wallet) {
            return res.status(200).json({ balance: 0 });
        }

        res.status(200).json({ balance: wallet.balance });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch balance', error: error.message });
    }
};

export const withdrawRequest = async (req, res) => {
    try {
        const { amount } = req.body;
        const userId = req.user._id;

        const wallet = await Wallet.findOne({ user: userId });
        if (!wallet || wallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        wallet.balance -= Number(amount);
        await wallet.save();

        res.status(200).json({ message: 'Withdrawal successful', balance: wallet.balance });
    } catch (error) {
        res.status(500).json({ message: 'Withdrawal failed', error: error.message });
    }
};
