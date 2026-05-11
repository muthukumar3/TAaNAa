import express from 'express';
import { 
    requestDeposit, 
    getWalletBalance, 
    requestWithdraw, 
    getWalletHistory 
} from '../controllers/walletController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/deposit', authenticate, requestDeposit);
router.get('/balance', authenticate, getWalletBalance);
router.post('/withdraw', authenticate, requestWithdraw);
router.get('/history', authenticate, getWalletHistory);

export default router;