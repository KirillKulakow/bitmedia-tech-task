import express from 'express';
import { body, validationResult } from 'express-validator';
import Impression from '../models/impression.model.js';

const router = express.Router();

const validateImpression = [
    body('impression_id').isString().notEmpty().withMessage('impression_id is required and must be a string'),
    body('timestamp').isISO8601().toDate().withMessage('timestamp must be a valid ISO 8601 date'),
    body('banner_size').isString().notEmpty().withMessage('banner_size is required and must be a string'),
    body('category').isString().notEmpty().withMessage('category is required and must be a string'),
    body('user_id').isString().notEmpty().withMessage('user_id is required and must be a string'),
    body('bid').isFloat({ min: 0.1, max: 10 }).withMessage('bid must be a number between 0.1 and 10')
];

// POST an impression
router.post('/', validateImpression, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const impression = new Impression(req.body);
        await impression.save();
        res.status(201).send(impression);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET all impressions
router.get('/', async (req, res) => {
    try {
        const impressions = await Impression.find();
        res.send(impressions);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
