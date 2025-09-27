var express = require('express');
var router = express.Router();
var demandeModel = require("../../model/demande");
const utilisateurModel = require("../../model/utilisateur");
const { stat } = require('fs');

router.get('/', function(req, res) {
    try {
        demandeModel.readallDemandeAjoutOrg(function(result) {
            if (result) {
                console.log("Lecture des demandes d'ajout d'organisation effectuee. " + result + " - (GET /admin/listeDemandesAjoutOrg)");

                res.render('../views/admin/listeDemandesAjoutOrg', {
                    title: 'MT Rec - Liste des demandes d\'ajout d\'organisations',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Demandes d'ajout d'organisations non trouvees ou liste vide. - (GET /admin/listeDemandesAjoutOrg)");

                res.render('../views/admin/listeDemandesAjoutOrg', {
                    title: 'MT Rec - Liste des demandes d\'ajout d\'organisations',
                    demandes: [], // renvoyer une liste vide
                    status: 'success'
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture des demandes d'ajout d'organisation: " + error + " - (GET /admin/listeDemandesAjoutOrg)");
        
        res.render('../views/admin/listeDemandesAjoutOrg', {
            title: 'MT Rec - Liste des demandes d\'ajout d\'organisations',
            demandes: [], // renvoyer une liste vide
            error: 'Echec de la lecture des demandes d\'ajout d\'organisation.',
            status: 'error'
        });
    }
});



// Accepter une demande d'ajout d'organisation
router.post('/accept/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
        // const id_demande = req.body.id_demande;
        // const id_utilisateur = req.body.id_utilisateur;
        const siren_org = req.body.siren_org;
        const nom_org = req.body.nom_org;
        const siege_social = req.body.siege_social;
        const type_assos = req.body.type_assos;

        organisationModel.create(siren_org, nom_org, siege_social, type_assos, function(success) {
            if (success) {
                console.log("Organisation creee avec succes. - (POST /admin/listeDemandesAjoutOrg/accepter/:id)");
                
                demandeModel.acceptDemandeAjoutOrg(id_demande, function(success) {
                    if (success) {
                        console.log("Acceptation de la demande d'ajout d'organisation effectuee. - (POST /admin/listeDemandesAjoutOrg/accepter/:id)");
        
                        res.status(200).json({
                            message: "Demande acceptee avec succes.",
                            status: 'success',
                        });
                    } else {
                        console.log("Echec de l'acceptation de la demande d'ajout d'organisation. - (POST /admin/listeDemandesAjoutOrg/accepter/:id)");
        
                        res.status(500).json({
                            error: "Echec de l'acceptation de la demande.",
                            status: 'error',
                        });
                    }
                });
            } else {
                console.log("Echec de la creation de l'organisation. - (POST /admin/listeDemandesAjoutOrg/accepter/:id)");

                res.status(500).json({
                    error: "Echec de la creation de l'organisation.",
                    status: 'error',
                });
            } 
        });
    } catch (error) {
        console.log("Echec de l'acceptation de la demande d'ajout d'organisation: " + error + ". - (POST /admin/listeDemandesAjoutOrg/accepter/:id)");

        res.status(500).json({
            error: "Echec de l'acceptation de la demande.",
            status: 'error',
        });
    }
});

// Refuser une demande d'ajout d'organisation
router.post('/refuse/:id', function(req, res) {
    try {
        const id_demande = req.params.id;

        demandeModel.refuseDemandeAjoutOrg(id_demande, function(success) {
            if (success) {
                console.log("Refus de la demande d'ajout d'organisation effectuee. - (POST /admin/listeDemandesAjoutOrg/refuser/:id)");

                res.status(200).json({
                    message: "Demande refusee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec du refus de la demande d'ajout d'organisation. - (POST /admin/listeDemandesAjoutOrg/refuser/:id)");

                res.status(500).json({
                    error: "Echec du refus de la demande.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec du refus de la demande d'ajout d'organisation: " + error + ". - (POST /admin/listeDemandesAjoutOrg/refuser/:id)");

        res.status(500).json({
            error: "Echec du refus de la demande.",
            status: 'error',
        });

    }
});



// GET route for /admin/listeDemandesAjoutOrg/pending inspired by /demande/demandeAjoutOrg/pending
router.get('/pending', function(req, res) {
    try {
        demandeModel.readallDemandeAjoutOrgPending(function(result) {
            if (result) {
                console.log("Lecture des demandes d'ajout d'organisation en attente effectuee. " + result + " - (GET /admin/listeDemandesAjoutOrg/pending)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture des demandes d'ajout d'organisation en attente. - (GET /admin/listeDemandesAjoutOrg/pending)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });

    } catch (error) {
        console.log("Echec de la lecture des demandes d'ajout d'organisation en attente: " + error + ". - (GET /admin/listeDemandesAjoutOrg/pending)");

        res.status(500).json({
            error: 'Echec de la lecture des demandes d\'ajout d\'organisation en attente.',
            status: 'error',
        });
    }
});

// GET route for /admin/listeDemandesAjoutOrg/notpending inspired by /demandedemandeAjoutOrg/notpending
router.get('/notpending', function(req, res) {
    try {
        demandeModel.readallDemandeAjoutOrgNotPending(function(result) {
            if (result) {
                console.log("Lecture des demandes d'ajout d'organisation non en attente effectuee. " + result + " - (GET /admin/listeDemandesAjoutOrg/notpending)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture des demandes d'ajout d'organisation non en attente. - (GET /admin/listeDemandesAjoutOrg/notpending)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture des demandes d'ajout d'organisation non en attente: " + error + ". - (GET /admin/listeDemandesAjoutOrg/notpending)");

        res.status(500).json({
            error: 'Echec de la lecture des demandes d\'ajout d\'organisation non en attente.',
            status: 'error',
        });
    }
});

module.exports = router;
