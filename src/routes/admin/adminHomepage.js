const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('../views/admin/accueilAdmin', {
        title: 'MT Rec - Accueil Admin'
    });
});

module.exports = router;
