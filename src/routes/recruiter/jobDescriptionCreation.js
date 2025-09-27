var express = require("express");
var router = express.Router();
var ficheDePosteModel = require("../../model/ficheDePoste");
const { stat } = require("fs");

// GET route for /ficheDePoste, affiche un formulaire pour la création d'une fiche de poste
router.get('/', function(req, res) {
    res.render('../views/recruteur/creationFicheDePoste');
});


// POST route for /ficheDePoste, ajoute une fiche de poste
router.post('/', function(req, res) {
    try {
        const intitule = req.body.intitule;

        // const id_organisation = req.body.id_organisation;
        const id_organisation = req.session.id_organisation;
        const statut_poste = req.body.statut_poste;
        const resp_hierarch = req.body.resp_hierarch;
        const type_metier = req.body.type_metier;
        const lieu_mission = req.body.lieu_mission;
        const rythme = req.body.rythme;
        const salaire = req.body.salaire;
        const description = req.body.description;

        ficheDePosteModel.create(intitule, id_organisation, statut_poste, resp_hierarch, type_metier, lieu_mission, rythme, salaire, description, function(success) {
            if (success) {
                res.redirect("/recruteur/gestionFichesDePoste");

            } else {
                res.status(500).json({
                    error: "Echec de l'ajout de la fiche de poste",
                    status: "error",
                });
            }
        });
    } catch(error) {
        res.status(500).json({
            error: "Erreur lors de l'ajout de la ficheDePoste",
            status: "error",
        });
    }
});


router.post('/addFicheDePoste', function(req, res) {
    try {
        const intitule = req.body.intitule;

        // const id_organisation = req.body.id_organisation;
        const id_organisation = req.session.id_organisation;
        const statut_poste = req.body.statut_poste;
        const resp_hierarch = req.body.resp_hierarch;
        const type_metier = req.body.type_metier;
        const lieu_mission = req.body.lieu_mission;
        const rythme = req.body.rythme;
        const salaire = req.body.salaire;
        const description = req.body.description;

        ficheDePosteModel.create(intitule, id_organisation, statut_poste, resp_hierarch, type_metier, lieu_mission, rythme, salaire, description, function(success) {
            if (success) {
                console.log("Fiche de poste ajoutée avec succès. - (POST /recruteur/creationFicheDePoste/addFicheDePoste)");
                
                res.status(200).json({
                    message: "Fiche de poste ajoutée avec succès",
                    status: "success",
                });
            } else {
                console.log("Echec de l'ajout de la fiche de poste. - (POST /recruteur/creationFicheDePoste/addFicheDePoste)");

                res.status(500).json({
                    error: "Echec de l'ajout de la fiche de poste",
                    status: "error",
                });
            }
        });
    } catch(error) {
        console.log("Erreur lors de l'ajout de la ficheDePoste: " + error + ". - (POST /recruteur/creationFicheDePoste/addFicheDePoste)");

        res.status(500).json({
            error: "Erreur lors de l'ajout de la ficheDePoste",
            status: "error",
        });
    }
});

module.exports = router;
