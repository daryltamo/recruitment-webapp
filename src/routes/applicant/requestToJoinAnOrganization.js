var express = require('express');
var router = express.Router();
var organisationModel = require("../../model/organisation");
var demandeModel = require("../../model/demande");

router.post('/', function(req, res) {

    const nom = req.body.nom;
    const type = req.body.type;
    const adresse = req.body.adresse;
    const telephone = req.body.telephone;
    const email = req.body.email;
    const site_web = req.body.site_web;
    const description = req.body.description;

    const id_demande = req.body.id_demande;
    const id_organisation = req.body.id_organisation;
    const id_utilisateur = req.body.id_utilisateur; // ou session.id_utilisateur
    const type_demande = req.body.type_demande;

    demandeModel.create(id_organisation, id_utilisateur, type_demande, function(result) {
        if (result) {
            res.render('../views/candidat/demandeRejoindreOrgForm', {
                title: 'MT Rec - Demande d\'attribution d\'organisation',
                message: 'Demande creee',
            });
        } else {
            res.status(500).json({
                error: 'Erreur lors de la creation de la demande.',
            });
        }
    });
});



module.exports = router;
