const express = require('express');
const router = express.Router();
const Candidature = require('../models/candidature');

// Get all candidatures
router.get('/', async (req, res) => {
    try {
        const candidatures = await Candidature.find();
        res.json(candidatures);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific candidature by ID
router.get('/:id', async (req, res) => {
    try {
        const candidature = await Candidature.findById(req.params.id);
        if (!candidature) return res.status(404).json({ message: 'Candidature not found' });
        res.json(candidature);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new candidature
router.post('/', async (req, res) => {
    const candidature = new Candidature({
        // Populate with necessary fields from req.body
    });

    try {
        const newCandidature = await candidature.save();
        res.status(201).json(newCandidature);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a candidature
router.patch('/:id', async (req, res) => {
    try {
        const updatedCandidature = await Candidature.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedCandidature) return res.status(404).json({ message: 'Candidature not found' });
        res.json(updatedCandidature);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a candidature
router.delete('/:id', async (req, res) => {
    try {
        const deletedCandidature = await Candidature.findByIdAndDelete(req.params.id);
        if (!deletedCandidature) return res.status(404).json({ message: 'Candidature not found' });
        res.json({ message: 'Candidature deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;