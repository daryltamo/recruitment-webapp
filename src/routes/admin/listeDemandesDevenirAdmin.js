const express = require('express');
const router = express.Router();
const { Utilisateur } = require('../../models/utilisateur');

// Route to list admin requests
router.get('/', async (req, res) => {
    try {
        const demandes = await Utilisateur.find({ role: 'admin_request' });
        res.status(200).json(demandes);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving admin requests', error });
    }
});

module.exports = router;