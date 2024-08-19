import express from 'express';
import { generatePredictions } from '../utils/predictionAlgorithm.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { bannerSize, category, budget } = req.body;
        const predictions = await generatePredictions(bannerSize, category, budget);
        res.json(predictions);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
