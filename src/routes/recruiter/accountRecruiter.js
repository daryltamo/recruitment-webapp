var express = require('express');
var router = express.Router();


router.get('/', function(req, res) {
    res.render('../views/recruteur/monCompteRecruteur', {
        title: 'MT Rec - Mon compte Recruteur',
        nom : req.session.nom,
        prenom : req.session.prenom,
        role : req.session.role,
        organisation : req.session.id_organisation,
    });
});

router.post('/update', function(req, res) {
    res.render('../views/recruteur/monCompteRecruteur', {
        title: 'MT Rec - Mon compte Recruteur',
    });
});



module.exports = router;
