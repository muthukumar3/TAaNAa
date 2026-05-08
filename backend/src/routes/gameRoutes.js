import express from 'express';
import { participateInGame, getGameResults } from '../controllers/gameController.js';
import { authenticate } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/participate', authenticate, participateInGame);
router.get('/results', authenticate, getGameResults);

export default router;