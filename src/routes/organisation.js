const express = require('express');
const router = express.Router();
const Organisation = require('../models/organisation');

// Get all organisations
router.get('/', async (req, res) => {
    try {
        const organisations = await Organisation.find();
        res.json(organisations);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get organisation by ID
router.get('/:id', async (req, res) => {
    try {
        const organisation = await Organisation.findById(req.params.id);
        if (!organisation) {
            return res.status(404).json({ message: 'Organisation not found' });
        }
        res.json(organisation);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new organisation
router.post('/', async (req, res) => {
    const organisation = new Organisation({
        name: req.body.name,
        address: req.body.address,
        // Add other fields as necessary
    });

    try {
        const newOrganisation = await organisation.save();
        res.status(201).json(newOrganisation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update an organisation
router.patch('/:id', async (req, res) => {
    try {
        const organisation = await Organisation.findById(req.params.id);
        if (!organisation) {
            return res.status(404).json({ message: 'Organisation not found' });
        }

        if (req.body.name != null) {
            organisation.name = req.body.name;
        }
        if (req.body.address != null) {
            organisation.address = req.body.address;
        }
        // Update other fields as necessary

        const updatedOrganisation = await organisation.save();
        res.json(updatedOrganisation);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an organisation
router.delete('/:id', async (req, res) => {
    try {
        const organisation = await Organisation.findById(req.params.id);
        if (!organisation) {
            return res.status(404).json({ message: 'Organisation not found' });
        }

        await organisation.remove();
        res.json({ message: 'Organisation deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;