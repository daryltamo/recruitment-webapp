var express = require('express');
var router = express.Router();
var demandeModel =require("../model/demande");



// Demandes d'ajout d'une organisation

// GET route for /demandedemandeAjoutOrg
router.get('/demandeAjoutOrg', function(req, res) {
    try {
        demandeModel.readallDemandeAjoutOrg(function(result) {
            if (result) {
                console.log("Lecture des demandes d'ajout d'organisation effectuee. " + result + " - (GET /demande/demandeAjoutOrg)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture des demandes d'ajout d'organisation. - (GET /demande/demandeAjoutOrg)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture des demandes d\'ajout d\'organisation: " + error + ". - (GET /demande/demandeAjoutOrg)");

        res.status(500).json({
            error: 'Echec de la lecture des demandes d\'ajout d\'organisation.',
            status: 'error',
        });
    }
});

// GET route for /demandedemandeAjoutOrg/:id
router.get('/demandeAjoutOrg/:id', function(req, res) {
    try {
        const id_demande = req.params.id;

        demandeModel.readDemandeAjoutOrg(id_demande, function(result) {
            if (result) {
                console.log("Lecture de la demande d'ajout d'organisation effectuee. " + result + " - (GET /demande/demandeAjoutOrg/:id)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture de la demande d'ajout d'organisation. - (GET /demande/demandeAjoutOrg/:id)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture de la demande d\'ajout d\'organisation: " + error + " - (GET /demande/demandeAjoutOrg/:id)");
        
        res.status(500).json({
            error: 'Echec de la lecture de la demande d\'ajout d\'organisation.',
            status: 'error',
        });
    }
});

// GET route for /demande/demandeAjoutOrg/pending
router.get('/demandeAjoutOrg/pending', function(req, res) {
    try {
        demandeModel.readallDemandeAjoutOrgPending(function(result) {
            if (result) {
                console.log("Lecture des demandes d'ajout d'organisation en attente effectuee. " + result + " - (GET /demande/demandeAjoutOrg/pending)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture des demandes d'ajout d'organisation en attente. - (GET /demande/demandeAjoutOrg/pending)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });

    } catch (error) {
        console.log("Echec de la lecture des demandes d'ajout d'organisation en attente: " + error + ". - (GET /demande/demandeAjoutOrg/pending)");

        res.status(500).json({
            error: 'Echec de la lecture des demandes d\'ajout d\'organisation en attente.',
            status: 'error',
        });
    }
});

// GET route for /demandedemandeAjoutOrg/notpending
router.get('/demandeAjoutOrg/notpending', function(req, res) {
    try {
        demandeModel.readallDemandeAjoutOrgNotPending(function(result) {
            if (result) {
                console.log("Lecture des demandes d'ajout d'organisation non en attente effectuee. " + result + " - (GET /demande/demandeAjoutOrg/notpending)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture des demandes d'ajout d'organisation non en attente. - (GET /demande/demandeAjoutOrg/notpending)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture des demandes d'ajout d'organisation non en attente: " + error + ". - (GET /demande/demandeAjoutOrg/notpending)");

        res.status(500).json({
            error: 'Echec de la lecture des demandes d\'ajout d\'organisation non en attente.',
            status: 'error',
        });
    }
});

// GET route for /demandedemandeAjoutOrg/utilisateur/:id
router.get('/demandeAjoutOrg/utilisateur/:id', function(req, res) {
    try {
        const id_utilisateur = req.params.id;

        demandeModel.readallDemandeAjoutOrgForUtilisateur(id_utilisateur, function(result) {
            if (result) {
                console.log("Lecture des demandes d'ajout d'organisation pour un utilisateur effectuee. " + result + " - (GET /demande/demandeAjoutOrg/utilisateur/:id)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture des demandes d'ajout d'organisation pour un utilisateur. - (GET /demande/demandeAjoutOrg/utilisateur/:id)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture des demandes d'ajout d'organisation pour un utilisateur: " + error + " - (GET /demande/demandeAjoutOrg/utilisateur/:id)");

        res.status(500).json({
            error: 'Echec de la lecture des demandes d\'ajout d\'organisation pour un utilisateur.',
            status: 'error',
        });
    }
});


// Accepter une demande d'ajout d'organisation
router.get('/demandeAjoutOrg/accept/:id', function(req, res) {
    try {
        const id_demande = req.params.id;

        demandeModel.acceptDemandeAjoutOrg(id_demande, function(success) {
            if (success) {
                console.log("Acceptation de la demande d'ajout d'organisation effectuee. - (GET /demande/demandeAjoutOrg/accepter/:id)");

                res.status(200).json({
                    message: "Demande acceptee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de l'acceptation de la demande d'ajout d'organisation. - (GET /demande/demandeoutOrg/accepter/:id)");

                res.status(500).json({
                    error: "Echec de l'acceptation de la demande.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de l'acceptation de la demande d'ajout d'organisation: " + error + ". - (GET /demande/demandeAjoutOrg/accepter/:id)");

        res.status(500).json({
            error: "Echec de l'acceptation de la demande.",
            status: 'error',
        });
    }
});

// Refuser une demande d'ajout d'organisation
router.get('/demandeAjoutOrg/refuse/:id', function(req, res) {
    try {
        const id_demande = req.params.id;

        demandeModel.refuseDemandeAjoutOrg(id_demande, function(success) {
            if (success) {
                console.log("Refus de la demande d'ajout d'organisation effectuee. - (GET /demande/demandeAjoutOrg/refuser/:id)");

                res.status(200).json({
                    message: "Demande refusee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec du refus de la demande d'ajout d'organisation. - (GET /demande/demandeAjoutOrg/refuser/:id)");

                res.status(500).json({
                    error: "Echec du refus de la demande.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec du refus de la demande d'ajout d'organisation: " + error + ". - (GET /demande/demandeAjoutOrg/refuser/:id)");

        res.status(500).json({
            error: "Echec du refus de la demande.",
            status: 'error',
        });

    }
});



// POST route for /demande/demandeAjoutOrg
router.post('/demandeOrg', function(req, res) {
    try {
        const id_utilisateur = req.session.id_utilisateur;
        const id_organisation = req.body.id_organisation;
        const nom_org = req.body.nom_org;
        const siege_social = req.body.siege_social;
        const type_assos = req.body.type_assos;
    
        demandeModel.createDemandeAjoutOrg(id_utilisateur, id_organisation, nom_org, siege_social, type_assos, function(success) {
            if (success) {
                console.log("Demande d'ajout d'organisation ajoutee avec succes. - (POST /demande/demandeAjoutOrg)");

                res.status(201).json({
                    message: "Demande ajoutee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de l'ajout de la demande d'ajout d'organisation. - (POST /demande/demandeAjoutOrg)");

                res.status(500).json({
                    error: "Echec de l'ajout de la demande.- (POST /demande/demandeAjoutOrg)",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de l'ajout de la demande: " + error + ". - (POST /demande/demandeAjoutOrg)");

        res.status(500).json({
            error: "Echec de l'ajout de la demande.",
            status: 'error',
        });
    }
});

// PUT route for /demande/demandeAjoutOrg/:id
router.put('/demandeAjoutOrg/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
        const id_utilisateur = req.session.id_utilisateur;
        const id_organisation = req.body.id_organisation;
        const nom_org = req.body.nom_org;
        const siege_social = req.body.siege_social;
        const type_assos = req.body.type_assos;
    
        demandeModel.updateDemandeAjoutOrg(id_demande, id_utilisateur, id_organisation, nom_org, siege_social, type_assos, function(success) {
            if (success) {
                console.log("Modification de la demande d'ajout d'organisation effectuee. - (PUT /demande/demandeAjoutOrg/:id)");

                res.status(200).json({
                    message: "Demande modifiee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de la modification de la demande d'ajout d'organisation. - (PUT /demande/demandeAjoutOrg/:id)");

                res.status(500).json({
                    error: "Echec de la modification de la demande.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la modification de la demande: " + error + ". - (PUT /demande/demandeAjoutOrg/:id)");

        res.status(500).json({
            error: "Echec de la modification de la demande.",
            status: 'error',
        });
    }
});


// DELETE route for /demande/demandeAjoutOrg/:id
router.delete('/demandeAjoutOrg/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
    
        demandeModel.deleteDemandeAjoutOrg(id_demande, function(success) {
            if (success) {
                console.log("Suppression de la demande d'ajout d'organisation effectuee. - (DELETE /demande/demandeAjoutOrg/:id)");

                res.status(200).json({
                    message: "Demande supprimee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de la suppression de la demande d'ajout d'organisation. - (DELETE /demande/demandeAjoutOrg/:id)");

                res.status(500).json({
                    error: "Echec de la suppression de la demande.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la suppression de la demande d'ajout d'organisation: " + error + ". - (DELETE /demande/demandeoutOrg/:id)");

        res.status(500).json({
            error: "Echec de la suppression de la demande.",
            status: 'error',
        });
    }
});



// Demandes de rejoindre une organisation

// GET route for /demande/demandeRejoindreOrg
router.get('/demandejoindreOrg', function(req, res) {
    try {
        demandeModel.readallDemandeJoindreOrg(function(result) {
            if (result) {
                console.log("Lecture des demandes de rejoindre une organisation effectuee. " + result + " - (GET /demande/demandeRejoindreOrg)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            }
            else {
                console.log("Erreur lors de la lecture des demandes de rejoindre une organisation. - (GET /demande/demandeeOrg)");
                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture des demandes de rejoindre une organisation: " + error + " - (GET /demande/demandeRejoindreOrg)");
        
        res.status(500).json({
            error: 'Echec de la lecture des demandes de rejoindre une organisation.',
            status: 'error',
        });
    }
});

// GET route for /demande/demandeRejoindreOrg/:id
router.get('/demandeRejoindreOrg/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
    
        demandeModel.readDemandeJoindreOrg(id_demande, function(result) {
            if (result) {
                console.log("Lecture de la demande de rejoindre une organisation effectuee. " + result + " - (GET /demande/demandeRejoindreOrg/:id)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture de la demande de rejoindre une organisation. - (GET /demande/demandeRejoindreOrg/:id)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture de la demande de rejoindre une organisation: " + error + " - (GET /demande/demandeRejoindreOrg/:id)");

        res.status(500).json({
            error: 'Echec de la lecture de la demande de rejoindre une organisation.',
            status: 'error',
        });
    }
});

// GET route for /demande/demandeRejoindreOrg/pending
router.get('/demandeRejoindreOrg/pending', function(req, res) {
    try {
        demandeModel.readallDemandeJoindreOrgPending(function(result) {
            if (result) {
                console.log("Lecture des demandes de rejoindre une organisation en attente effectuee. " + result + " - (GET /demande/demandeRejoindreOrg/pending)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture des demandes de rejoindre une organisation en attente. - (GET /demande/demandeRejoindreOrg/pending)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    }catch (error) {
        console.log("Echec de la lecture des demandes de rejoindre une organisation en attente: " + error + ". - (GET /demande/demandeRejoindreOrg/pending)");

        res.status(500).json({
            error: 'Echec de la lecture des demandes de rejoindre une organisation en attente.',
            status: 'error',
        });
    }
});

// GET route for /demande/demandeRejoindreOrg/notpending
router.get('/demandeRejoindreOrg/notpending', function(req, res) {
    try {
        demandeModel.readallDemandeJoindreOrgNotPending(function(result) {
            if (result) {
                console.log("Lecture des demandes de rejoindre une organisation non en attente effectuee. " + result + " - (GET /demande/demandeRejoindreOrg/notpending)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            }
            else {
                console.log("Erreur lors de la lecture des demandes de rejoindre une organisation non en attente. - (GET /demande/demandeRejoindreOrg/notpending)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture des demandes de rejoindre une organisation non en attente: " + error + ". - (GET /demande/demandeRejoindreOrg/notpending)");

        res.status(500).json({
            error: 'Echec de la lecture des demandes de rejoindre une organisation non en attente.',
            status: 'error',
        });
    }
});

// GET route for /demande/demandeRejoindreOrg/utilisateur/:id
router.get('/demandeRejoindreOrg/utilisateur/:id', function(req, res) {
    try {
        const id_utilisateur = req.params.id;
    
        demandeModel.readallDemandeJoindreOrgForUtilisateur(id_utilisateur, function(result) {
            if (result) {
                console.log("Lecture des demandes de rejoindre une organisation pour un utilisateur effectuee. " + result + " - (GET /demande/demandeRejoindreOrg/utilisateur/:id)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture des demandes de rejoindre une organisation pour un utilisateur. - (GET /demande/demandeRejoindreOrg/utilisateur/:id)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture des demandes de rejoindre une organisation pour un utilisateur: " + error + " - (GET /demande/demandeRejoindreOrg/utilisateur/:id)");

        res.status(500).json({
            error: 'Echec de la lecture des demandes de rejoindre une organisation pour un utilisateur.',
            status: 'error',
        });
    }
});


// Accepter une demande de rejoindre une organisation
router.get('/demandeRejoindreOrg/accept/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
    
        demandeModel.acceptDemandeJoindreOrg(id_demande, function(success) {
            if (success) {
                console.log("Acceptation de la demande de rejoindre une organisation effectuee. - (GET /demande/demandeRejoindreOrg/accept/:id)");

                res.status(200).json({
                    message: "Demande acceptee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de l'acceptation de la demande de rejoindre une organisation. - (GET /demande/demandeRejoindreOrg/accept/:id)");

                res.status(500).json({
                    error: "Echec de l'acceptation de la demande.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de l'acceptation de la demande de rejoindre une organisation: " + error + ". - (GET /demande/demandeRejoindreOrg/accept/:id)");

        res.status(500).json({
            error: "Echec de l'acceptation de la demande.",
            status: 'error',
        });
    }
});

// Refuser une demande de rejoindre une organisation
router.get('/demandeRejoindreOrg/refuse/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
    
        demandeModel.refuseDemandeJoindreOrg(id_demande, function(success) {
            if (success) {
                console.log("Refus de la demande de rejoindre une organisation effectuee. - (GET /demande/demandeefuse/:id)");

                res.status(200).json({
                    message: "Demande refusee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec du refus de la demande de rejoindre une organisation. - (GET /demande/demandeRejoindreOrg/refuse/:id)");

                res.status(500).json({
                    error: "Echec du refus de la demande.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec du refus de la demande de rejoindre une organisation: " + error + ". - (GET /demande/demandeRejoindreOrg/refuse/:id)");

        res.status(500).json({
            error: "Echec du refus de la demande.",
            status: 'error',
        });
    }
});


// POST route for /demande/demandeRejoindreOrg
router.post('/demandeRejoindreOrg', function(req, res) {
    try {
        const id_utilisateur = req.session.id_utilisateur;
        const id_organisation = req.body.siren_org;
        const nom_org = req.body.nom_org;
        const raison = req.body.raison;
    
        demandeModel.createDemandeJoindreOrg(id_utilisateur, id_organisation, nom_org, raison, function(success) {
            if (success) {
                console.log("Demande de rejoindre une organisation ajoutee avec succes. - (POST /demande/demandeRejoindreOrg)");

                res.status(201).json({
                    message: "Demande ajoutee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de l'ajout de la demande de rejoindre une organisation. - (POST /demande/demandeRejoindreOrg)");

                res.status(500).json({
                    error: "Echec de l'ajout de la demande de rejoindre une organisation.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de l'ajout de la demande de rejoindre une organisation: " + error + ". - (POST /demande/demandeRejoindreOrg)");

        res.status(500).json({
            error: "Echec de l'ajout de la demande de rejoindre une organisation.",
            status: 'error',
        });
    }
});



// PUT route for /demande/demandeRejoindreOrg/:id
router.put('/demandeRejoindreOrg/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
        const id_utilisateur = req.session.id_utilisateur;
        const siren_organ_cible = req.body.siren_org;
        const nom_organ_cible = req.body.nom_org;
        const raison = req.body.raison;
    
        demandeModel.updateDemandeJoindreOrg(id_demande, id_utilisateur, siren_organ_cible, nom_organ_cible, raison, function(succes) {
            if (succes) {
                console.log("Modification de la demande de rejoindre une organisation d'organisation effectuee. - (PUT /demande/demandeRejoindreOrg/:id)");
                res.status(200).json({
                    message: "Demande de rejoindre une organisation modifiée avec succès.",
                    status: 'success',
                });
            } else {
                console.log("Echec de la modification de la demande de rejoindre une organisation d'organisation effectuee: Aucune demande trouvee / Echec de la requete SQL. - (PUT /demande/demandeRejoindreOrg/:id)");
                res.status(500).json({
                    error: "Echec de la modification de la demande de rejoindre une organisation.",
                    status: 'error',
                });
            }

        });
    } catch (error) {
        console.log("Echec de la modification de la demande de rejoindre une organisation: " + error + ". - (PUT /demande/demandeRejoindreOrg/:id)");

        res.status(500).json({
            error: "Echec de la modification de la demande de rejoindre une organisation.",
            status: 'error',
        });
    
    }
});

// DELETE route for /demande/demandeRejoindreOrg/:id
router.delete('/demandeRejoindreOrg/:id', function(req, res) {
    try {
        const id_demande = req.params.id;

        demandeModel.deleteDemandeJoindreOrg(id_demande, function(success) {
            if (success) {
                console.log("Suppression de la demande de rejoindre une organisation effectuee. - (DELETE /demande/demandeRejoindreOrg/:id)");

                res.status(200).json({
                    message: "Demande supprimee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de la suppression de la demande de rejoindre une organisation. - (DELETE /demande/demandeRejoindreOrg/:id)");

                res.status(500).json({
                    error: "Echec de la suppression de la demande de rejoindre une organisation.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la suppression de la demande de rejoindre une organisation: " + error + ". - (DELETE /demande/demandeRejoindreOrg/:id)");

        res.status(500).json({
            error: "Echec de la suppression de la demande de rejoindre une organisation.",
            status: 'error',
        });
    }
});




// Demande Devenir Recruteur

// GET route for /demande/demandeDevenirRecruteur
router.get('/demandeDevenirRecruteur', function(req, res) {
    try {
        demandeModel.readallDemandeDevenirRecruteur(function(result) {
            if (result) {
                console.log("Lecture des demandes de devenir recruteur effectuee. " + result + " - (GET /demande/demandeDevenirRecruteur)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture des demandes de devenir recruteur. - (GET /demande/demandeDevenirRecruteur)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture des demandes de devenir recruteur: " + error + " - (GET /demande/demandeDevenirRecruteur)");
        
        res.status(500).json({
            error: 'Echec de la lecture des demandes de devenir recruteur.',
            status: 'error',
        });
    }
});

// GET route for /demande/demandeDevenirRecruteur/:id
router.get('/demandeDevenirRecruteur/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
    
        demandeModel.readDemandeDevenirRecruteur(id_demande, function(result) {
            if (result) {
                console.log("Lecture de la demande de devenir recruteur effectuee. " + result + " - (GET /demande/demandeenirRecruteur/:id)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture de la demande de devenir recruteur. - (GET /demande/demandeDevenirRecruteur/:id)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture de la demande de devenir recruteur: " + error + " - (GET /demande/demandeDevenirRecruteur/:id)");
        
        res.status(500).json({
            error: 'Echec de la lecture de la demande de devenir recruteur.',
            status: 'error',
        });

    }
});

// GET route for /demande/demandeDevenirRecruteur/pending
router.get('/demandeDevenirRecruteur/pending', function(req, res) {
    try {
        demandeModel.readallDemandeDevenirRecruteurPending(function(result) {
            if (result) {
                console.log("Lecture des demandes de devenir recruteur en attente effectuee. " + result + " - (GET /demande/demandeDevenirRecruteur/pending)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture des demandes de devenir recruteur en attente. - (GET /demande/demandeDevenirRecruteur/pending)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    
    } catch (error) {
        console.log("Echec de la lecture des demandes de devenir recruteur en attente: " + error + ". - (GET /demande/demandeDevenirRecruteur/pending)");

        res.status(500).json({
            error: 'Echec de la lecture des demandes de devenir recruteur en attente.',
            status: 'error',
        });
    }
});

// GET route for /demande/demandeDevenirRecruteur/notpending
router.get('/demandeDevenirRecruteur/notpending', function(req, res) {
    try {
        demandeModel.readallDemandeDevenirRecruteurNotPending(function(result) {
            if (result) {
                console.log("Lecture des demandes de devenir recruteur non en attente effectuee. " + result + " - (GET /demande/demandeDevenirRecruteur/notpending)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture des demandes de devenir recruteur non en attente. - (GET /demande/demandeDevenirRecruteur/notpending)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture des demandes de devenir recruteur non en attente: " + error + ". - (GET /demande/demandeDevenirRecruteur/notpending)");

        res.status(500).json({
            error: 'Echec de la lecture des demandes de devenir recruteur non en attente.',
            status: 'error',
        });
    }
});

// GET route for /demande/demandeDevenirRecruteur/utilisateur/:id
router.get('/demandeDevenirRecruteur/utilisateur/:id', function(req, res) {
    try {
        const id_utilisateur = req.params.id;
    
        demandeModel.readallDemandeDevenirRecruteurForUtilisateur(id_utilisateur, function(result) {
            if (result) {
                console.log("Lecture des demandes de devenir recruteur pour un utilisateur effectuee. " + result + " - (GET /demande/demandeDevenirRecruteur/utilisateur/:id)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture des demandes de devenir recruteur pour un utilisateur. - (GET /demande/demandeDevenirRecruteur/utilisateur/:id)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture des demandes de devenir recruteur pour un utilisateur: " + error + " - (GET /demande/demandeDevenirRecruteur/utilisateur/:id)");

        res.status(500).json({
            error: 'Echec de la lecture des demandes de devenir recruteur pour un utilisateur.',
            status: 'error',
        });
    }
});


// Accepter une demande de devenir recruteur
router.get('/demandeDevenirRecruteur/accept/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
    
        demandeModel.acceptDemandeDevenirRecruteur(id_demande, function(success) {
            if (success) {
                console.log("Acceptation de la demande de devenir recruteur effectuee. - (GET /demande/demandeDevenirRecruteur/accept/:id)");

                res.status(200).json({
                    message: "Demande acceptee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de l'acceptation de la demande de devenir recruteur. - (GET /demande/demandeevenirRecruteur/accept/:id)");

                res.status(500).json({
                    error: "Echec de l'acceptation de la demande.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de l'acceptation de la demande de devenir recruteur: " + error + ". - (GET /demande/demandeDevenirRecruteur/accept/:id)");

        res.status(500).json({
            error: "Echec de l'acceptation de la demande.",
            status: 'error',
        });
    }
});

// Refuser une demande de devenir recruteur
router.get('/demandeDevenirRecruteur/refuse/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
    
        demandeModel.refuseDemandeDevenirRecruteur(id_demande, function(success) {
            if (success) {
                console.log("Refus de la demande de devenir recruteur effectuee. - (GET /demande/demandeDevenirRecruteur/refuse/:id)");

                res.status(200).json({
                    message: "Demande refusee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec du refus de la demande de devenir recruteur. - (GET /demande/demandeirRecruteur/refuse/:id)");

                res.status(500).json({
                    error: "Echec du refus de la demande.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec du refus de la demande de devenir recruteur: " + error + ". - (GET /demande/demandeDevenirRecruteur/refuse/:id)");

        res.status(500).json({
            error: "Echec du refus de la demande.",
            status: 'error',
        });
    }
});

// POST route for /demande/demandeDevenirRecruteur
router.post('/demandeDevenirRecruteur', function(req, res) {
    try {
        const id_utilisateur = req.session.id_utilisateur;
        const id_organisation = req.body.id_organisation;
        const nom_org = req.body.nom_org;
        const raison = req.body.raison;
    
        demandeModel.createDemandeDevenirRecruteur(id_utilisateur, id_organisation, nom_org, raison, function(success) {
            if (success) {
                console.log("Demande de devenir recruteur ajoutee avec succes. - (POST /demande/demandeDevenirRecruteur)");

                res.status(201).json({
                    message: "Demande ajoutee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de l'ajout de la demande de devenir recruteur. - (POST /demande/demandeDevenirRecruteur)");

                res.status(500).json({
                    error: "Echec de l'ajout de la demande de devenir recruteur.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de l'ajout de la demande de devenir recruteur: " + error + ". - (POST /demande/demandeDevenirRecruteur)");

        res.status(500).json({
            error: "Echec de l'ajout de la demande de devenir recruteur.",
            status: 'error',
        });
    }
});

// PUT route for /demande/demandeDevenirRecruteur/:id
router.put('/demandeDevenirRecruteur/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
        const id_utilisateur = req.session.id_utilisateur;
        const id_organisation = req.body.id_organisation;
        const nom_org = req.body.nom_org;
        const raison = req.body.raison;

        demandeModel.updateDemandeDevenirRecruteur(id_demande, id_utilisateur, id_organisation, nom_org, raison, function(success) {
            if (success) {
                console.log("Modification de la demande de devenir recruteur effectuee. - (PUT /demande/demandeDevenirRecruteur/:id)");

                res.status(200).json({
                    message: "Demande modifiee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de la modification de la demande de devenir recruteur. - (PUT /demande/demandeDevenirRecruteur/:id)");

                res.status(500).json({
                    error: "Echec de la modification de la demande.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la modification de la demande de devenir recruteur: " + error + ". - (PUT /demande/demandeDevenirRecruteur/:id)");

        res.status(500).json({
            error: "Echec de la modification de la demande.",
            status: 'error',
        });
    }
});

// DELETE route for /demande/demandeDevenirRecruteur/:id
router.delete('/demandeDevenirRecruteur/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
    
        demandeModel.deleteDemandeDevenirRecruteur(id_demande, function(success) {
            if (success) {
                console.log("Suppression de la demande de devenir recruteur effectuee. - (DELETE /demande/demandeDevenirRecruteur/:id)");

                res.status(200).json({
                    message: "Demande supprimee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de la suppression de la demande de devenir recruteur. - (DELETE /demande/demandeDevenirRecruteur/:id)");

                res.status(500).json({
                    error: "Echec de la suppression de la demande.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la suppression de la demande de devenir recruteur: " + error + ". - (DELETE /demande/demandeDevenirRecruteur/:id)");

        res.status(500).json({
            error: "Echec de la suppression de la demande.",
            status: 'error',
        });
    }
});




// Demandes Devenir Admin

// GET route for /demande/demandeDevenirAdmin
router.get('/demandeDevenirAdmin', function(req, res) {
    try {
        demandeModel.readallDemandeDevenirAdmin(function(result) {
            if (result) {
                console.log("Lecture des demandes de devenir admin effectuee. " + result + " - (GET /demande/demandeDevenirAdmin)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture des demandes de devenir admin. - (GET /demande/demandeDevenirAdmin)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        }); 
    } catch (error) {
        console.log("Echec de la lecture des demandes de devenir admin: " + error + " - (GET /demande/demandeDevenirAdmin)");
        
        res.status(500).json({
            error: 'Echec de la lecture des demandes de devenir admin.',
            status: 'error',
        });
    }
});

// GET route for /demande/demandeDevenirAdmin/:id
router.get('/demandeDevenirAdmin/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
    
        demandeModel.readDemandeDevenirAdmin(id_demande, function(result) {
            if (result) {
                console.log("Lecture de la demande de devenir admin effectuee. " + result + " - (GET /demande/demandeDevenirAdmin/:id)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture de la demande de devenir admin. - (GET /demande/demandeDevenirAdmin/:id)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture de la demande de devenir admin: " + error + " - (GET /demande/demandeDevenirAdmin/:id)");
        
        res.status(500).json({
            error: 'Echec de la lecture de la demande de devenir admin.',
            status: 'error',
        });
    }
});

// GET route for /demande/demandeDevenirAdmin/pending
router.get('/demandeDevenirAdmin/pending', function(req, res) {
    try {
        demandeModel.readallDemandeDevenirAdminPending(function(result) {
            if (result) {
                console.log("Lecture des demandes de devenir admin en attente effectuee. " + result + " - (GET /demande/demandeDevenirAdmin/pending)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture des demandes de devenir admin en attente. - (GET /demande/demandeDevenirAdmin/pending)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture des demandes de devenir admin en attente: " + error + ". - (GET /demande/demandeDevenirAdmin/pending)");

        res.status(500).json({
            error: 'Echec de la lecture des demandes de devenir admin en attente.',
            status: 'error',
        });
    }
});

// GET route for /demande/demandeDevenirAdmin/notpending
router.get('/demandeDevenirAdmin/notpending', function(req, res) {
    try {
        demandeModel.readallDemandeDevenirAdminNotPending(function(result) {
            if (result) {
                console.log("Lecture des demandes de devenir admin non en attente effectuee. " + result + " - (GET /demande/demandeDevenirAdmin/notpending)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture des demandes de devenir admin non en attente. - (GET /demande/demandeDevenirAdmin/notpending)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture des demandes de devenir admin non en attente: " + error + ". - (GET /demande/demandeDevenirAdmin/notpending)");

        res.status(500).json({
            error: 'Echec de la lecture des demandes de devenir admin non en attente.',
            status: 'error',
        });
    }
});

// GET route for /demande/demandeDevenirAdmin/utilisateur/:id
router.get('/demandeDevenirAdmin/utilisateur/:id', function(req, res) {
    try {
        const id_utilisateur = req.params.id;
    
        demandeModel.readallDemandeDevenirAdminForUtilisateur(id_utilisateur, function(result) {
            if (result) {
                console.log("Lecture des demandes de devenir admin pour un utilisateur effectuee. " + result + " - (GET /demande/demandeDevenirAdmin/utilisateur/:id)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log("Erreur lors de la lecture des demandes de devenir admin pour un utilisateur. - (GET /demande/demandeDevenirAdmin/utilisateur/:id)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture des demandes de devenir admin pour un utilisateur: " + error + " - (GET /demande/demandeDevenirAdmin/utilisateur/:id)");

        res.status(500).json({
            error: 'Echec de la lecture des demandes de devenir admin pour un utilisateur.',
            status: 'error',
        });
    }
});

// Accepter une demande de devenir admin
router.get('/demandeDevenirAdmin/accept/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
    
        demandeModel.acceptDemandeDevenirAdmin(id_demande, function(success) {
            if (success) {
                console.log("Acceptation de la demande de devenir admin effectuee. - (GET /demande/demandeDevenirAdmin/accept/:id)");

                res.status(200).json({
                    message: "Demande acceptee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de l'acceptation de la demande de devenir admin. - (GET /demande/demandeDevenirAdmin/accept/:id)");

                res.status(500).json({
                    error: "Echec de l'acceptation de la demande.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de l'acceptation de la demande de devenir admin: " + error + ". - (GET /demande/demandeDevenirAdmin/accept/:id)");

        res.status(500).json({
            error: "Echec de l'acceptation de la demande.",
            status: 'error',
        });
    }
});


// Refuser une demande de devenir admin
router.get('/demandeDevenirAdmin/refuse/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
    
        demandeModel.refuseDemandeDevenirAdmin(id_demande, function(success) {
            if (success) {
                console.log("Refus de la demande de devenir admin effectuee. - (GET /demande/demandeDevenirAdmin/refuse/:id)");

                res.status(200).json({
                    message: "Demande refusee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec du refus de la demande de devenir admin. - (GET /demande/demandeDevenirAdmin/refuse/:id)");

                res.status(500).json({
                    error: "Echec du refus de la demande.",
                    status: 'error',
                });
            }
        });
    } catch (error) { 
        console.log("Echec du refus de la demande de devenir admin: " + error + ". - (GET /demande/demandeDevenirAdmin/refuse/:id)");

        res.status(500).json({
            error: "Echec du refus de la demande.",
            status: 'error',
        });      
    }
});

// POST route for /demande/demandeDevenirAdmin
router.post('/demandeDevenirAdmin', function(req, res) {
    try {
        const id_utilisateur = req.session.id_utilisateur;
        const raison = req.body.raison;
    
        demandeModel.createDemandeDevenirAdmin(id_utilisateur, raison, function(success) {
            if (success) {
                console.log("Demande de devenir admin ajoutee avec succes. - (POST /demande/demandeDevenirAdmin)");

                res.status(201).json({
                    message: "Demande ajoutee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de l'ajout de la demande de devenir admin. - (POST /demande/demandeDevenirAdmin)");

                res.status(500).json({
                    error: "Echec de l'ajout de la demande de devenir admin.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de l'ajout de la demande de devenir admin: " + error + ". - (POST /demande/demandeDevenirAdmin)");

        res.status(500).json({
            error: "Echec de l'ajout de la demande de devenir admin.",
            status: 'error',
        });
    }
});

// PUT route for /demande/demandeDevenirAdmin/:id
router.put('/demandeDevenirAdmin/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
        const id_utilisateur = req.session.id_utilisateur;
        const raison = req.body.raison;
    
        demandeModel.updateDemandeDevenirAdmin(id_demande, id_utilisateur, raison, function(success) {
            if (success) {
                console.log("Modification de la demande de devenir admin effectuee. - (PUT /demande/demandeDevenirAdmin/:id)");

                res.status(200).json({
                    message: "Demande modifiee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de la modification de la demande de devenir admin. - (PUT /demande/demandeDevenirAdmin/:id)");

                res.status(500).json({
                    error: "Echec de la modification de la demande.",
                    status: 'error',
                });
            }
        });
        
    } catch (error) {
        console.log("Echec de la modification de la demande de devenir admin: " + error + ". - (PUT /demande/demandeDevenirAdmin/:id)");

        res.status(500).json({
            error: "Echec de la modification de la demande.",
            status: 'error',
        });
    }
});

// DELETE route for /demande/demandeDevenirAdmin/:id
router.delete('/demandeDevenirAdmin/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
    
        demandeModel.deleteDemandeDevenirAdmin(id_demande, function(success) {
            if (success) {
                console.log("Suppression de la demande de devenir admin effectuee. - (DELETE /demande/demandeDevenirAdmin/:id)");

                res.status(200).json({
                    message: "Demande supprimee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de la suppression de la demande de devenir admin. - (DELETE /demande/demandeDevenirAdmin/:id)");

                res.status(500).json({
                    error: "Echec de la suppression de la demande.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la suppression de la demande de devenir admin: " + error + ". - (DELETE /demande/demandeDevenirAdmin/:id)");

        res.status(500).json({
            error: "Echec de la suppression de la demande.",
            status: 'error',
        });
    }
});




// Anciennes routes

// GET route for /demande
router.get('/', function(req, res) {
    try {
        demandeModel.readall(function(result) {
            if (result) {
                console.log("Lecture des demandes effectuee. - (GET /demande)");

                res.render('demande', { // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result
                });
            } else {
                console.log("Erreur lors de la lecture des demandes. - (GET /demande)");

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status
                });
            }
        });
    } catch (error) {
        console.log('Echec de la lecture des demandes: ' + error);

        res.status(500).json({
            error: 'Echec de la lecture des demandes.',
            status: 'error',
        });
    }
});


// GET route for /demande/:id
router.get('/:id', function(req, res, next) {
    try {
        const id_demande = req.params.id;

        demandeModel.read(id_demande, function(result) {
            if (result) {
                console.log("Lecture de la demande effectuee. - (GET /demande/:id)");

                res.render('demande-detail', { // TODO: create demande-detail.ejs
                    title: 'Détails de la demande',
                    demande: result 
                });
            } else {
                console.log("Erreur lors de la lecture de la demande. - (GET /demande/:id)");

                res.status(404).json({
                    error: "Demande non trouvee.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture (read) de la demande (id= " + id + "): " + error);

        res.status(500).json({
            error: "Echec de la lecture de la demande.",
            status: 'error',
        });
    }
});

// POST route for /demande
router.post('/addDemande',  function (req, res) {
    try {
        const id_utilisateur = req.session.id_utilisateur;
        const id_organisation = req.body.id_organisation;
        const type_demande = req.body.type_demande;
    
        demandeModel.create(id_organisation, id_utilisateur, type_demande, function(success) {
            if (success) {
                console.log("Demande(type_demande = " + type_demande + ") ajoutee avec succes. - (POST /demande/addDemande)");

                res.status(201).json({
                    message: "Demande ajoutee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de l'ajout de la demande. - (POST /demande/addDemande)");

                res.status(500).json({
                    error: "Echec de l'ajout de la demande.- (/demande/addDemande)",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de l'ajout de la demande: " + error + ". - (/demande/addDemande)");

        res.status(500).json({
            error: "Echec de l'ajout de la demande.",
            status: 'error',
        });
    }
});

// PUT route for /demande/:id
router.put('/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
        const { id_applicant, id_jobOffer, date_application} = req.body;

        demandeModel.update(id_demande, id_applicant, id_jobOffer, date_application, function(success) {
            if (success) {
                console.log("Modification de la demande effectuee. - (PUT /demande/:id)");

                res.status(200).json({
                    message: "Demande modifiee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de la modification de la demande. - (PUT /demande/:id)");

                res.status(500).json({
                    error: "Echec de la modification de la demande.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la modification de la demande: " + error);

        res.status(500).json({
            error: "Echec de la modification de la demande.",
            status: 'error',
        });
    }
});

// DELETE route for /demande/:id
router.delete('/:id', function(req, res) {
    try {
        const id_demande = req.params.id;
        
        demandeModel.delete(id_demande, function(success) {
            if (success) {
                console.log("Suppression de la demande effectuee. - (DELETE /demande/:id)");

                res.status(200).json({
                    message: "Demande supprimee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de la suppression de la demande. - (DELETE /demande/:id)");

                res.status(500).json({
                    error: "Echec de la suppression de la demande.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la suppression de la demande: " + error);
        
        res.status(500).json({
            error: "Echec de la suppression de la demande.",
            status: 'error',
        });
    }
});



module.exports = router;
