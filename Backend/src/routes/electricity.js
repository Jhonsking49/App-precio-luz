import express from 'express';
import { getPricesByHour, getPricesByDay, getPricesByRange } from '../controllers/electricityController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/prices/hour', authMiddleware, getPricesByHour);
router.get('/prices/day', authMiddleware, getPricesByDay);
router.get('/prices/range', authMiddleware, getPricesByRange);

export default router;
