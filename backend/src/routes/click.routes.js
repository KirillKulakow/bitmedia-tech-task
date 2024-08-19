import express from 'express';
import Click from '../models/click.model.js';

const router = express.Router();

// POST a click
router.post('/', async (req, res) => {
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
