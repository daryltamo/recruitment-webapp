const express = require('express');
const { logDebug } = require('../utils/logger');
// const { logError } = require('../utils/logger');

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
    logDebug('GET /health - Health check');
    res.status(200).json({ status: 'ok' });
});

module.exports = router;
