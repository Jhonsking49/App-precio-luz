import express from 'express';
import { getWeatherByCity, getRecentSearches } from '../controllers/weatherController.js';
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/city', authMiddleware, getWeatherByCity);
router.get('/recent', authMiddleware, getRecentSearches);

export default router;
