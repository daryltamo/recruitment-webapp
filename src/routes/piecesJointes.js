const express = require('express');
const router = express.Router();
const PiecesJointes = require('../models/piecesJointes');

// Get all attachments
router.get('/', async (req, res) => {
    try {
        const piecesJointes = await PiecesJointes.find();
        res.json(piecesJointes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get a specific attachment by ID
router.get('/:id', async (req, res) => {
    try {
        const pieceJointe = await PiecesJointes.findById(req.params.id);
        if (!pieceJointe) {
            return res.status(404).json({ message: 'Attachment not found' });
        }
        res.json(pieceJointe);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new attachment
router.post('/', async (req, res) => {
    const pieceJointe = new PiecesJointes({
        // Add fields based on your model
    });

    try {
        const newPieceJointe = await pieceJointe.save();
        res.status(201).json(newPieceJointe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an attachment
router.put('/:id', async (req, res) => {
    try {
        const pieceJointe = await PiecesJointes.findById(req.params.id);
        if (!pieceJointe) {
            return res.status(404).json({ message: 'Attachment not found' });
        }

        // Update fields based on your model
        Object.assign(pieceJointe, req.body);
        const updatedPieceJointe = await pieceJointe.save();
        res.json(updatedPieceJointe);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an attachment
router.delete('/:id', async (req, res) => {
    try {
        const pieceJointe = await PiecesJointes.findById(req.params.id);
        if (!pieceJointe) {
            return res.status(404).json({ message: 'Attachment not found' });
        }

        await pieceJointe.remove();
        res.json({ message: 'Attachment deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;