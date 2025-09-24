const express = require('express');
const router = express.Router();
const FicheDePoste = require('../models/ficheDePoste');

// Get all job descriptions
router.get('/', async (req, res) => {
    try {
        const fichesDePoste = await FicheDePoste.find();
        res.json(fichesDePoste);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific job description by ID
router.get('/:id', async (req, res) => {
    try {
        const ficheDePoste = await FicheDePoste.findById(req.params.id);
        if (!ficheDePoste) {
            return res.status(404).json({ message: 'Job description not found' });
        }
        res.json(ficheDePoste);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new job description
router.post('/', async (req, res) => {
    const ficheDePoste = new FicheDePoste({
        title: req.body.title,
        description: req.body.description,
        requirements: req.body.requirements,
        // Add other fields as necessary
    });

    try {
        const newFicheDePoste = await ficheDePoste.save();
        res.status(201).json(newFicheDePoste);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a job description by ID
router.put('/:id', async (req, res) => {
    try {
        const ficheDePoste = await FicheDePoste.findById(req.params.id);
        if (!ficheDePoste) {
            return res.status(404).json({ message: 'Job description not found' });
        }

        ficheDePoste.title = req.body.title || ficheDePoste.title;
        ficheDePoste.description = req.body.description || ficheDePoste.description;
        ficheDePoste.requirements = req.body.requirements || ficheDePoste.requirements;
        // Update other fields as necessary

        const updatedFicheDePoste = await ficheDePoste.save();
        res.json(updatedFicheDePoste);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a job description by ID
router.delete('/:id', async (req, res) => {
    try {
        const ficheDePoste = await FicheDePoste.findById(req.params.id);
        if (!ficheDePoste) {
            return res.status(404).json({ message: 'Job description not found' });
        }

        await ficheDePoste.remove();
        res.json({ message: 'Job description deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;