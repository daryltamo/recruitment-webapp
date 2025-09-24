const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
    res.render('../views/recruteur/monCompteRecruteur', {
        title: 'MT Rec - Mon compte Recruteur',
        nom : req.session.nom,
        prenom : req.session.prenom,
        role : req.session.role,
        organisation : req.session.idOrganization
    });
});

router.post('/update', function(req, res) {
    res.render('../views/recruteur/monCompteRecruteur', {
        title: 'MT Rec - Mon compte Recruteur'
    });
});



module.exports = router;
