import express from 'express';
import { body, validationResult } from 'express-validator';
import { generatePredictions } from '../utils/predictionAlgorithm.js';

const router = express.Router();

const validBannerSizes = ['300x250', '728x90', '160x600', '468x60'];
const validCategories = ['Technology', 'Health', 'Finance', 'Education', 'Entertainment'];

const validatePredictions = [
    body('bannerSize')
        .isString()
        .isIn(validBannerSizes)
        .withMessage('Invalid bannerSize'),
    body('category')
        .isString()
        .isIn(validCategories)
        .withMessage('Invalid category'),
    body('budget')
        .isFloat({ min: 0.01 })
        .withMessage('Budget must be a positive number')
];

router.post('/', validatePredictions, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { bannerSize, category, budget } = req.body;
        const predictions = await generatePredictions(bannerSize, category, budget);
        res.json(predictions);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

export default router;
