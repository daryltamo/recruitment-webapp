const express = require('express');
const router = express.Router();
// const organizationModel = require('../../model/organization');

router.get('/', function (req, res) {
    res.render('../views/admin/monCompteAdmin', {
        title: 'MT Rec - Mon compte Admin',
        nom: req.session.nom,
        prenom: req.session.prenom,
        role: req.session.role,
        organisation: req.session.idOrganization
    });
});

router.post('/update', function (req, res) {
    res.render('../views/admin/monCompteAdmin', {
        title: 'MT Rec - Mon compte Admin'
    });
});

module.exports = router;
