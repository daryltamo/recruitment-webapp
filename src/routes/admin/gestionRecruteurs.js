const express = require('express');
const router = express.Router();
const { User } = require('../../models/utilisateur');

// Get all recruiters
router.get('/', async (req, res) => {
    try {
        const recruiters = await User.find({ role: 'recruiter' });
        res.status(200).json(recruiters);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching recruiters', error });
    }
});

// Create a new recruiter
router.post('/', async (req, res) => {
    const { name, email, password } = req.body;
    const newRecruiter = new User({ name, email, password, role: 'recruiter' });

    try {
        await newRecruiter.save();
        res.status(201).json(newRecruiter);
    } catch (error) {
        res.status(400).json({ message: 'Error creating recruiter', error });
    }
});

// Update a recruiter
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedRecruiter = await User.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedRecruiter) {
            return res.status(404).json({ message: 'Recruiter not found' });
        }
        res.status(200).json(updatedRecruiter);
    } catch (error) {
        res.status(400).json({ message: 'Error updating recruiter', error });
    }
});

// Delete a recruiter
router.delete('/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedRecruiter = await User.findByIdAndDelete(id);
        if (!deletedRecruiter) {
            return res.status(404).json({ message: 'Recruiter not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'Error deleting recruiter', error });
    }
});

module.exports = router;