var express = require('express');
var router = express.Router();
var ficheDePosteModel = require('../model/ficheDePoste.js');

router.get('/', function(req, res) {
    try {
        ficheDePosteModel.readall(function(result) {
            if (result) {
                res.render('ficheDePoste', {
                    title: 'Liste des fiches de poste',
                    fichesDePoste: result
                });
            } else {
                res.status(404).json({
                    error: 'Aucune fiche de poste trouvée.'
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            error: "Echec de la lecture des fiche de postes.",
        });
        console.log("Echec de la lecture des ficheDePoste: " + error);
    }
});

// POST route for fiche de poste
router.post('/addJobDescription', function (req, res){
    try {
        const intitule = req.body.intitule;
        const id_organisation = req.body.id_organisation;
        const statut_poste = req.body.statut_poste;
        const resp_hierarch = req.body.resp_hierarch;
        const type_metier = req.body.type_metier;
        const lieu_mission = req.body.lieu_mission;
        const rythme = req.body.rythme;
        const salaire = req.body.rythme;
        const description = req.body.description;
        ficheDePosteModel.create(intitule, id_organisation, statut_poste, resp_hierarch, type_metier, lieu_mission, rythme, salaire, description, function(success) {
            if(success) {
                res.json({
                    message: "ficheDePoste ajoutée avec succès",
                })
            } else {
                throw new Error("Echec de la requete SQL d'ajout d'une ficheDePoste.");
            }
        });
    } catch (error) {
        res.status(500).json({
            error: "Echec de l'ajout de la fiche de poste",
        });
        console.log("Echec de l'ajout de ficheDePoste(intitule= " + intitule + ", id_organisation= " + id_organisation + "): "  + error);
    }
});

// PUT route for fiche de poste
router.put('/', function (req, res) {
    try{
        const intitule = req.body.intitule;
        const id_organisation = req.body.id_organisation;
        const statut_poste = req.body.statut_poste;
        const resp_hierarch = req.body.resp_hierarch;
        const type_metier = req.body.type_metier;
        const lieu_mission = req.body.lieu_mission;
        const rythme = req.body.rythme;
        const salaire = req.body.rythme;
        const description = req.body.description;

        ficheDePosteModel.update(intitule, id_organisation, statut_poste, resp_hierarch, type_metier, lieu_mission, rythme, salaire, description, function(success) {
            if (success) {
                res.json({
                    message: "ficheDePoste modifiee avec succes",
                });
            } else {
                res.status(500).json({
                    message: "Erreur lors de la modification de la ficheDePoste",
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la modification de la ficheDePoste",
        });
    }
});

// DELETE route for fiche de poste
router.delete('/', function(req, res) {
    try {
        const intitule = req.body.intitule;
        const id_organisation = req.body.id_organisation;

        ficheDePosteModel.delete(intitule, id_organisation, function(success) {
            if (success) {
                res.json({
                    message: "ficheDePoste supprimee avec succes",
                });
            } else {
                res.status(500).json({
                    message: "Erreur lors de la suppression de la ficheDePoste",
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            message: "Erreur lors de la suppression de la ficheDePoste",
        });
    }
});







module.exports = router;

