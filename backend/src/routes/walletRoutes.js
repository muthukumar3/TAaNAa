import express from 'express';
import { depositWallet, getWalletBalance, withdrawRequest } from '../controllers/walletController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/deposit', authenticate, depositWallet);
router.get('/balance', authenticate, getWalletBalance);
router.post('/withdraw', authenticate, withdrawRequest);

export default router;