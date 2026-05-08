import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import walletRoutes from './routes/walletRoutes.js';
import gameRoutes from './routes/gameRoutes.js';

dotenv.config();

const app = express();

// Middleware
// Allowing common frontend ports (3000, 3001, 5173) and being more permissive for development
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:5173'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request Logger
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
    next();
});

// Health check
app.get('/', (req, res) => res.send(`🚀 ${process.env.APP_NAME || 'App'} API is running...`));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/game', gameRoutes);

export default app;