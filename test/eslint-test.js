/**
 * ESLint Configuration Test
 * This file tests that our ESLint setup is working correctly
 */

// This should pass all linting rules
const express = require('express');
const router = express.Router();

// Good practices
const getUserById = (id) => {
    if (!id) {
        throw new Error('ID is required');
    }
    return { id, name: 'Test User' };
};

// Proper route handler
router.get('/test-lint', (req, res) => {
    try {
        const { id } = req.params;
        const user = getUserById(id);
        res.json({ success: true, data: user });
    } catch (error) {
        res.status(400).json({ success: false, error: error.message });
    }
});

module.exports = router;
