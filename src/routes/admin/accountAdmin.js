const express = require('express');
const router = express.Router();
var organisationModel = require("../../model/organisation")


router.get('/', function(req, res) {
    res.render('../views/admin/monCompteAdmin', {
        title: 'MT Rec - Mon compte Admin',
        nom : req.session.nom,
        prenom : req.session.prenom,
        role : req.session.role,
        organisation : req.session.id_organisation,
    });
});

router.post('/update', function(req, res) {
    res.render('../views/admin/monCompteAdmin', {
        title: 'MT Rec - Mon compte Admin',
    });
});

module.exports = router;
