const express = require('express');
const router = express.Router();
const userModel = require('../model/user');
const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

// Render registration view

router.get('/', function (req, res) {
    logDebug('GET /registration - Rendering registration view');
    res.render('registration');
});

// Register a new user
router.post('/', function (req, res) {
    logDebug('POST /registration - Registering new user');
    try {
        const {
            email,
            password,
            name,
            surname,
            phoneNumber,
            userType,
            organizationId
        } = req.body;
        const registrationDate = new Date();
        userModel.create(
            email,
            password,
            name,
            surname,
            phoneNumber,
            registrationDate,
            1, // active by default
            organizationId || 0,
            userType || 'Candidate',
            function (success) {
                if (success) {
                    logDebug(
                        'POST /registration - User registered successfully'
                    );
                    res.status(201).json({
                        message: 'User registered successfully.'
                    });
                } else {
                    logError('POST /registration - Failed to register user');
                    res.status(500).json({
                        error: 'Failed to register user.'
                    });
                }
            }
        );
    } catch (error) {
        logError('POST /registration - Failed to register user', error);
        res.status(500).json({
            error: 'Failed to register user.'
        });
    }
});

module.exports = router;
