import Wallet from '../models/Wallet.js';
import Transaction from '../models/Transaction.js';
import WalletRequest from '../models/WalletRequest.js';

export const requestDeposit = async (req, res) => {
    try {
        const { amount, referenceId } = req.body;
        const userId = req.user._id;

        const depositRequest = new WalletRequest({
            user: userId,
            type: 'deposit',
            amount: Number(amount),
            referenceId,
            status: 'pending'
        });

        await depositRequest.save();

        res.status(200).json({ 
            message: 'Deposit request submitted successfully. It will be processed soon.', 
            request: depositRequest 
        });
    } catch (error) {
        res.status(500).json({ message: 'Deposit request failed', error: error.message });
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

export const requestWithdraw = async (req, res) => {
    try {
        const { amount, walletAddress } = req.body;
        const userId = req.user._id;

        const wallet = await Wallet.findOne({ user: userId });
        if (!wallet || wallet.balance < amount) {
            return res.status(400).json({ message: 'Insufficient balance' });
        }

        const withdrawReq = new WalletRequest({
            user: userId,
            type: 'withdraw',
            amount: Number(amount),
            walletAddress,
            status: 'pending'
        });

        await withdrawReq.save();

        // Optionally deduct balance here or when "processing"
        // For now, let's keep it in balance until admin approves, 
        // but maybe we should "lock" it? 
        // User just asked to save the request.

        res.status(200).json({ 
            message: 'Withdrawal request sent successfully', 
            request: withdrawReq 
        });
    } catch (error) {
        res.status(500).json({ message: 'Withdrawal request failed', error: error.message });
    }
};

export const getWalletHistory = async (req, res) => {
    try {
        const userId = req.user._id;
        // Fetch all requests for this user (both deposit and withdraw)
        const requests = await WalletRequest.find({ user: userId }).sort({ createdAt: -1 });
        // Fetch confirmed transactions
        const transactions = await Transaction.find({ user: userId }).sort({ createdAt: -1 });

        res.status(200).json({ 
            requests, 
            history: transactions 
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch history', error: error.message });
    }
};
