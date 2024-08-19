import express from 'express';
import { body, validationResult } from 'express-validator';
import Click from '../models/click.model.js';

const router = express.Router();

const validateClick = [
    body('click_id').isString().notEmpty().withMessage('click_id is required and must be a string'),
    body('timestamp').isISO8601().toDate().withMessage('timestamp must be a valid date'),
    body('impression_id').isString().notEmpty().withMessage('impression_id is required and must be a string'),
    body('user_id').isString().notEmpty().withMessage('user_id is required and must be a string')
];

// POST a click
router.post('/', validateClick, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const click = new Click(req.body);
        await click.save();
        res.status(201).send(click);
    } catch (error) {
        res.status(400).send(error);
    }
});

// GET all clicks
router.get('/', async (req, res) => {
    try {
        const clicks = await Click.find();
        res.send(clicks);
    } catch (error) {
        res.status(500).send(error);
    }
});

export default router;
