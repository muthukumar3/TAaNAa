import express from 'express';
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const router = express.Router();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// POST /api/auth/sso-login
router.post('/sso-login', async (req, res) => {
    console.log('Received Google Login request');
    const { idToken } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { sub: googleId, email, name, picture } = payload;

        // Find or create user
        let user = await User.findOne({ googleId });
        if (!user) {
            user = new User({
                googleId,
                email,
                username: name || email.split('@')[0],
                role: 'user'
            });
            await user.save();
            
            // Create a default wallet for new users
            const Wallet = (await import('../models/Wallet.js')).default;
            await new Wallet({ user: user._id, balance: 100 }).save(); // Give $100 starting bonus
        }

        // Generate custom JWT
        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        res.status(200).json({
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                role: user.role,
                picture
            }
        });
    } catch (error) {
        console.error('GOOGLE VERIFY ERROR:', error);
        res.status(401).json({ 
            message: 'Invalid Google Token',
            error: error.message 
        });
    }
});

// GET /api/auth/current_user
router.get('/current_user', async (req, res) => {
    // This will be handled by the authenticate middleware in app.js
    // If it reaches here, it means req.user is already populated
    if (req.user) {
        res.status(200).json(req.user);
    } else {
        res.status(401).json({ message: 'Not authenticated' });
    }
});

export default router;