import express from "express";
import Impression from "../models/impression.model.js";

const router = express.Router();

// POST an impression
router.post('/', async (req, res) => {
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
