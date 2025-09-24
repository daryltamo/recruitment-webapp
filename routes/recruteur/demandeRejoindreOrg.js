var express = require('express');
var router = express.Router();
var organisationModel = require("../../model/organisation");
var demandeModel = require("../../model/demande");

router.get('/', function(req, res) {
    try {
        organisationModel.readall(function(result) {
            if(result) {
                console.log("Lecture des organisations effectuee avec succes. - (GET /recruteur/demandeRejoindreOrg/)");

                res.render('../views/recruteur/demandeRejoindreOrgForm', {
                    title: "MT Rec - Demande de rejoindre une organisation",
                    organisations: result,
                    status: "success"
                });
            } else {
                console.log("Organisations non trouvees. - (GET /recruteur/demandeRejoindreOrg/)");
                
                res.render('../views/recruteur/demandeRejoindreOrgForm', {
                    title: "MT Rec - Demande de rejoindre une organisation",
                    organisations: [],
                    error: "Aucune organisation trouvée. Vous pouvez demander à en creer une !",
                    status: "error",
                });
            }
        });
    } catch (error) {
        console.log("Error occurred: " + error);

        res.render('../views/recruteur/demandeRejoindreOrgForm', {
            title: "MT Rec - Demande de rejoindre une organisation",
            organisations: [],
            error: "Une erreur est survenue !",
            status: "error",
        });
    }
});



// POST route for /recruteur/demandeRejoindreorg/ inspired from /demande/demandeRejoindreOrg
router.post('/', function(req, res) {
    try {
        const id_utilisateur = req.session.id_utilisateur;
        const id_organisation = req.body.siren_org;
        const nom_org = req.body.nom_org;
        const raison = req.body.raison;
        
        demandeModel.createDemandeJoindreOrg(id_utilisateur, id_organisation, nom_org, raison, function(success) {
            if (success) {
                console.log("Demande de rejoindre une organisation ajoutee avec succes. - (POST /recruteur/demandeRejoindreorg/)");

                res.status(201).json({
                    message: "Demande ajoutee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de l'ajout de la demande de rejoindre une organisation. - (POST /recruteur/demandeRejoindreorg/)");

                res.status(500).json({
                    error: "Echec de l'ajout de la demande de rejoindre une organisation.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de l'ajout de la demande de rejoindre une organisation: " + error + ". - (POST /recruteur/demandeRejoindreorg/)");

        res.status(500).json({
            error: "Echec de l'ajout de la demande de rejoindre une organisation.",
            status: 'error',
        });
    }
});

// POST route for /recruteur/demandeRejoindreorg/addDemande inspired from /demande/demandeRejoindreOrg
router.post('/addDemande', function(req, res) {
    try {
        const id_utilisateur = req.session.id_utilisateur;
        const id_organisation = req.body.siren_org;
        const nom_org = req.body.nom_org;
        const raison = req.body.raison;
        
        demandeModel.createDemandeJoindreOrg(id_utilisateur, id_organisation, nom_org, raison, function(success) {
            if (success) {
                console.log("Demande de rejoindre une organisation ajoutee avec succes. - (POST /recruteur/demandeRejoindreorg/)");

                res.status(201).json({
                    message: "Demande ajoutee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de l'ajout de la demande de rejoindre une organisation. - (POST /recruteur/demandeRejoindreorg/)");

                res.status(500).json({
                    error: "Echec de l'ajout de la demande de rejoindre une organisation.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de l'ajout de la demande de rejoindre une organisation: " + error + ". - (POST /recruteur/demandeRejoindreorg/)");

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

// DELETE route for /recruteur/demandeRejoindreorg/:id inspired from /demande/demandeRejoindreOrg/:id
router.delete('/:id', function(req, res) {
    try {
        const id_demande = req.params.id;

        demandeModel.deleteDemandeJoindreOrg(id_demande, function(success) {
            if (success) {
                console.log("Suppression de la demande de rejoindre une organisation effectuee. - (DELETE /recruteur/demandeRejoindreorg/:id)");

                res.status(200).json({
                    message: "Demande supprimee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de la suppression de la demande de rejoindre une organisation. - (DELETE /recruteur/demandeRejoindreorg/:id)");

                res.status(500).json({
                    error: "Echec de la suppression de la demande de rejoindre une organisation.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la suppression de la demande de rejoindre une organisation: " + error + ". - (DELETE /recruteur/demandeRejoindreorg/:id)");

        res.status(500).json({
            error: "Echec de la suppression de la demande de rejoindre une organisation.",
            status: 'error',
        });
    }
});






module.exports = router;

