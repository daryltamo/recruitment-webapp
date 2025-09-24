const express = require('express');
const router = express.Router();
const OffreDemploi = require('../models/offreDemploi');

// Get all job offers
router.get('/', async (req, res) => {
    try {
        const offres = await OffreDemploi.find();
        res.json(offres);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific job offer by ID
router.get('/:id', async (req, res) => {
    try {
        const offre = await OffreDemploi.findById(req.params.id);
        if (!offre) return res.status(404).json({ message: 'Job offer not found' });
        res.json(offre);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new job offer
router.post('/', async (req, res) => {
    const offre = new OffreDemploi(req.body);
    try {
        const newOffre = await offre.save();
        res.status(201).json(newOffre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a job offer
router.put('/:id', async (req, res) => {
    try {
        const offre = await OffreDemploi.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!offre) return res.status(404).json({ message: 'Job offer not found' });
        res.json(offre);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a job offer
router.delete('/:id', async (req, res) => {
    try {
        const offre = await OffreDemploi.findByIdAndDelete(req.params.id);
        if (!offre) return res.status(404).json({ message: 'Job offer not found' });
        res.json({ message: 'Job offer deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;