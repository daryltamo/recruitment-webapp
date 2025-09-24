const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('../views/recruteur/accueilRecruteur', {
        title: 'MT Rec - Accueil Recruteur'
    });
});

module.exports = router;
