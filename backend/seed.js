import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './src/models/User.js';
import Wallet from './src/models/Wallet.js';

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const testUser = await User.findOneAndUpdate(
            { googleId: 'test_google_id' },
            {
                username: 'TestUser',
                email: 'test@example.com',
                googleId: 'test_google_id',
                role: 'user'
            },
            { upsert: true, new: true }
        );

        console.log('Test user created/updated:', testUser._id);

        const testWallet = await Wallet.findOneAndUpdate(
            { user: testUser._id },
            { user: testUser._id, balance: 1000 },
            { upsert: true, new: true }
        );

        console.log('Test wallet created/updated with balance:', testWallet.balance);

        process.exit(0);
    } catch (err) {
        console.error('Seed failed:', err);
        process.exit(1);
    }
};

seed();
