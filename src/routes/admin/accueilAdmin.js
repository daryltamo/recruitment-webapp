const express = require('express');
const router = express.Router();

// Route for the admin dashboard
router.get('/', (req, res) => {
    res.render('administrateur', { title: 'Admin Dashboard' });
});

module.exports = router;