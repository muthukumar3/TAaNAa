import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const authenticate = async (req, res, next) => {
    // Development Mode Bypass
    if (process.env.DEV_MODE === 'true' && !req.headers.authorization) {
        const user = await User.findOne({ googleId: 'test_google_id' });
        if (user) {
            req.user = user;
            return next();
        }
    }

    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export const checkRole = (roles) => {
    return (req, res, next) => {
        if (req.user && roles.includes(req.user.role)) {
            return next();
        }
        res.status(403).json({ message: 'Forbidden' });
    };
};