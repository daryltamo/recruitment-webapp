const express = require('express');
const router = express.Router();
const Demande = require('../models/demande');

// Get all demandes
router.get('/', async (req, res) => {
    try {
        const demandes = await Demande.find();
        res.json(demandes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific demande by ID
router.get('/:id', async (req, res) => {
    try {
        const demande = await Demande.findById(req.params.id);
        if (!demande) return res.status(404).json({ message: 'Demande not found' });
        res.json(demande);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new demande
router.post('/', async (req, res) => {
    const demande = new Demande({
        title: req.body.title,
        description: req.body.description,
        // Add other fields as necessary
    });

    try {
        const newDemande = await demande.save();
        res.status(201).json(newDemande);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a demande by ID
router.patch('/:id', async (req, res) => {
    try {
        const demande = await Demande.findById(req.params.id);
        if (!demande) return res.status(404).json({ message: 'Demande not found' });

        if (req.body.title != null) {
            demande.title = req.body.title;
        }
        if (req.body.description != null) {
            demande.description = req.body.description;
        }
        // Update other fields as necessary

        const updatedDemande = await demande.save();
        res.json(updatedDemande);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a demande by ID
router.delete('/:id', async (req, res) => {
    try {
        const demande = await Demande.findById(req.params.id);
        if (!demande) return res.status(404).json({ message: 'Demande not found' });

        await demande.remove();
        res.json({ message: 'Demande deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;