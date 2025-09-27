var express = require('express');
var router = express.Router();
var organisationModel = require("../../model/organisation");
const demandeModel = require("../../model/demande");

router.get('/', function(req, res) {
    try {
        organisationModel.readall(function(organisations) {
            if(organisations) {
                console.log("Lecture des organisations effectuee avec succes. - (GET /candidat/devenirRecruteur)");

                res.render('../views/candidat/devenirRecruteurForm', {
                    title: 'MT Rec - Formulaire Devenir Recruteur',
                    organisations: organisations,
                    status: "success",
                });
            } else {
                console.log("Erreur lors de la lecture des organisations. - (GET /candidat/devenirRecruteur)");

                res.render('../views/candidat/devenirRecruteurForm', {
                    title: 'MT Rec - Formulaire Devenir Recruteur',
                    organisations: [],
                    error:"Aucune organisation trouvee. Vous pouvez demander a devenir recruteur pour en créer une !",
                    status: "error",
                });
            }
        });
    } catch (error) {
        console.log("Erreur lors de l'affichage du formulaire de demande de devenir recruteur: " + error + ". - (GET /candidat/devenirRecruteur)");

        res.render('../views/candidat/devenirRecruteurForm', {
            title: 'MT Rec - Formulaire Devenir Recruteur',
            organisations: [],
            error:"Une erreur est survenue !",
            status: "error",
        });
    }
});

// POST route for /candidat/devenirRecruteur inspired by /demande/demandeDevenirRecruteur
router.post('/', function(req, res) {
    try {
        const id_utilisateur = req.session.id_utilisateur;
        const id_organisation = req.body.siren_org;
        const nom_org = req.body.nom_org;
        const raison = req.body.raison;
    
        demandeModel.createDemandeDevenirRecruteur(id_utilisateur, id_organisation, nom_org, raison, function(success) {
            if (success) {
                console.log("Demande de devenir recruteur ajoutee avec succes. - (POST /candidat/devenirRecruteur)");

                res.status(201).json({
                    message: "Demande ajoutee avec succes.",
                    status: "success",
                });
            } else {
                console.log("Echec de l'ajout de la demande de devenir recruteur. - (POST /candidat/devenirRecruteur)");

                res.status(500).json({
                    error: "Echec de l'ajout de la demande de devenir recruteur.",
                    status: "error",
                });
            }
        });
    } catch (error) {
        console.log("Echec de l'ajout de la demande de devenir recruteur: " + error + ". - (POST /candidat/devenirRecruteur)");

        res.status(500).json({
            error: "Echec de l'ajout de la demande de devenir recruteur.",
            status: "error",
        });
    }
});



module.exports = router;
