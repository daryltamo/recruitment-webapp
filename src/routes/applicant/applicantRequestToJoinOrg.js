const express = require('express');
const router = express.Router();
// const organizationModel = require('../../model/organization');
const requestModel = require('../../model/request');

router.post('/', function (req, res) {
    // const nom = req.body.nom;
    // const type = req.body.type;
    // const adresse = req.body.adresse;
    // const telephone = req.body.telephone;
    // const email = req.body.email;
    // const site_web = req.body.site_web;
    // const description = req.body.description;

    // const idRequest = req.body.idRequest;
    const idOrganization = req.body.idOrganization;
    const idUser = req.body.idUser; // ou session.idUser
    const requestType = req.body.requestType;

    requestModel.create(idOrganization, idUser, requestType, function (result) {
        if (result) {
            res.render('../views/candidat/demandeRejoindreOrgForm', {
                title: "MT Rec - Demande d'attribution d'organisation",
                message: 'Demande creee'
            });
        } else {
            res.status(500).json({
                error: 'Erreur lors de la creation de la demande.'
            });
        }
    });
});

module.exports = router;
