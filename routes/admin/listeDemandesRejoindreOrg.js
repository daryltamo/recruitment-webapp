var express = require('express');
var router = express.Router();
var demandeModel = require("../../model/demande");
const utilisateurModel = require("../../model/utilisateur");
const organisationModel = require("../../model/organisation");

// GET route for /admin/listeDemandesRejoindreOrg inspired by GET /demande/demandeRejoindreOrg
router.get('/', function(req, res) {
    try {
        demandeModel.readallDemandeJoindreOrg(function(result) {
            if (result) {
                console.log("Lecture des demandes d'attribution d'organisation effectuee. " + result + " - (GET /admin/listeDemandesRejoindreOrg)");

                res.render('../views/admin/listeDemandesRejoindreOrg', {
                    title: "MT Rec - Liste des demandes d\'attribution d\'organisations",
                    demandes: result,
                    status: "success"
                });
            } else {
                console.log("Demandes d'attribution d'organisations non trouvees ou liste vide. - (GET /admin/listeDemandesRejoindreOrg)");
                
                res.render('../views/admin/listeDemandesRejoindreOrg', {
                    title: "MT Rec - Liste des demandes d\'attribution d\'organisations",
                    demandes: [],
                    status: "success"
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture des demandes d'attribution d'organisation: " + error + " - (GET /admin/listeDemandesRejoindreOrg)");
        
        res.render('../views/admin/listeDemandesRejoindreOrg', {
            title: "MT Rec - Liste des demandes d\'attribution d\'organisations",
            demandes: [], // renvoyer une liste vide
            error: "Echec de la lecture des demandes d'attribution d'organisation.",
            status: "error",
        });
    }
});



// Accepter une demande de rejoindre une organisation
router.post('/accept/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
        // const id_demande = req.body.id_demande;
        const id_utilisateur = req.body.id_utilisateur;

        const siren_org = req.body.siren_org;
        const nom_org = req.body.nom_org;
        const raison = req.body.raison;

        utilisateurModel.updateUserOrgUsingId(id_utilisateur, siren_org, function(success) { 
            if (success) {
                console.log("Changement d'organisation de l'utilisateur (id_utilisateur: " + id_utilisateur + ") effectue. - (POST /admin/listeDemandesRejoindreOrg/accept/:id)");

                demandeModel.acceptDemandeJoindreOrg(id_demande, function(success) {
                    if (success) {
                        console.log("Acceptation de la demande de rejoindre une organisation effectuee. - (POST /admin/listeDemandesRejoindreOrg/accept/:id)");
        
                        res.status(200).json({
                            message: "Demande acceptee avec succes.",
                            status: 'success',
                        });
                    } else {
                        console.log("Echec de l'acceptation de la demande de rejoindre une organisation. - (POST /admin/listeDemandesRejoindreOrg/accept/:id)");
        
                        res.status(500).json({
                            error: "Echec de l'acceptation de la demande.",
                            status: 'error',
                        });
                    }
                });
            } else {
                console.log("Echec du changement d'organisation de l'utilisateur (id_utilisateur: " + id_utilisateur + "). - (POST /admin/listeDemandesRejoindreOrg/accept/:id)");

                res.status(500).json({
                    error: "Echec du changement d'organisation de l'utilisateur.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de l'acceptation de la demande de rejoindre une organisation: " + error + ". - (POST /admin/listeDemandesRejoindreOrg/accept/:id)");

        res.status(500).json({
            error: "Echec de l'acceptation de la demande.",
            status: 'error',
        });
    }
});

// Refuser une demande de rejoindre une organisation
router.post('/refuse/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
    
        demandeModel.refuseDemandeJoindreOrg(id_demande, function(success) {
            if (success) {
                console.log("Refus de la demande de rejoindre une organisation effectuee. - (POST /admin/listeDemandesRejoindreOrg/refuse/:id)");

                res.status(200).json({
                    message: "Demande refusee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec du refus de la demande de rejoindre une organisation. - (POST /admin/listeDemandesRejoindreOrg/refuse/:id)");

                res.status(500).json({
                    error: "Echec du refus de la demande.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec du refus de la demande de rejoindre une organisation: " + error + ". - (POST /admin/listeDemandesRejoindreOrg/refuse/:id)");

        res.status(500).json({
            error: "Echec du refus de la demande.",
            status: 'error',
        });
    }
});

// GET route for /admin/listeDemandeRejoindreOrg/pending inspired by GET /demande/demandeRejoindreOrg/pending
router.get('/demandeRejoindreOrg/pending', function(req, res) {
    try {
        demandeModel.readallDemandeJoindreOrgPending(function(result) {
            if (result) {
                console.log("Lecture des demandes de rejoindre une organisation en attente effectuee. " + result + " - (GET /admin/listeDemandesRejoindreOrg/pending)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture des demandes de rejoindre une organisation en attente. - (GET /admin/listeDemandesRejoindreOrg/pending)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    }catch (error) {
        console.log("Echec de la lecture des demandes de rejoindre une organisation en attente: " + error + ". - (GET /admin/listeDemandesRejoindreOrg/pending)");

        res.status(500).json({
            error: 'Echec de la lecture des demandes de rejoindre une organisation en attente.',
            status: 'error',
        });
    }
});



// GET route for /admin/listeDemandeRejoindreOrg/notpending inspired by GET /demande/demandeRejoindreOrg/notpending
router.get('/notpending', function(req, res) {
    try {
        demandeModel.readallDemandeJoindreOrgNotPending(function(result) {
            if (result) {
                console.log("Lecture des demandes de rejoindre une organisation non en attente effectuee. " + result + " - (GET /admin/listesDemandeRejoindreOrg/notpending)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            }
            else {
                console.log("Erreur lors de la lecture des demandes de rejoindre une organisation non en attente. - (GET /admin/listeDemandesRejoindreOrg/notpending)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture des demandes de rejoindre une organisation non en attente: " + error + ". - (GET /admin/listeDemandesRejoindreOrg/notpending)");

        res.status(500).json({
            error: 'Echec de la lecture des demandes de rejoindre une organisation non en attente.',
            status: 'error',
        });
    }
});





module.exports = router;

