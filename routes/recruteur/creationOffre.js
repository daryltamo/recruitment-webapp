var express = require("express");
var router = express.Router();
var offreDemploiModel = require("../../model/offreDemploi");
var ficheDePosteModel = require('../../model/ficheDePoste');

// GET route for /offreDemploi, récupère toutes les fiches de poste de l'organisation et affiche un formulaire pour la création d'une offre d'emploi
router.get('/', function(req,res){
    try {
        const id_organisation = req.session.id_organisation;

        ficheDePosteModel.readallInOrganisation(id_organisation, function(result) {
            if (result) {
                console.log(result.length + "fiches de poste trouvees. - (GET /recruteur/creationOffre)");

                res.render('../views/recruteur/creationOffreForm', {
                    fichesDePoste: result,
                    status: "success"
                });
            } else {
                console.log("Aucune fiche de poste trouvee. - (GET /recruteur/creationOffre)");

                res.render('../views/recruteur/creationOffreForm', {
                    fichesDePoste: [],
                    error: "Aucune fiche de poste trouvee.",
                    status: "error"
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture des ficheDePoste: " + error + " - (GET /recruteur/creationOffre)");

        res.render('../views/recruteur/creationOffreForm', {
            fichesDePoste: [],
            error: "Echec de la lecture des ficheDePoste.",
            status: "error"
        });
    }
})

// POST route for /offreDemploi, ajoute une offre d'emploi
router.post('/addOffer',  function (req, res, next){
    try {
        const id_fichedeposte = req.body.id_fichedeposte;
        const date_validite = req.body.date_validite;
        const indication = req.body.indication;
        const num_docs_req = req.body.num_docs_req;
        const etat = req.body.etat;
        const id_recruteur = req.session.id_utilisateur;

        console.log(id_fichedeposte, date_validite, indication, num_docs_req, etat, id_recruteur, " - (POST /recruteur/creationOffre/addOffer)");

        offreDemploiModel.create(id_fichedeposte, date_validite, indication, num_docs_req, etat, id_recruteur, function (success) {
            if (success) {
                console.log("Offre d'emploi ajoutee avec succes - (POST /recruteur/creationOffre/addOffer)");

                res.status(500).json({
                    message: "Offre d'emploi ajoutee avec succes",
                    status: "success"
                });
            } else {
                console.log("Echec d'ajout d'une offre d'emploi - (POST /recruteur/creationOffre/addOffer)");

                res.status(500).json({
                    error: "Echec d'ajout d'une offre d'emploi",
                    status: "error"
                });
            }
        });
    } catch (error) {
        console.log("Echec de l'ajout de l'offre d'emploi: " + error + " - (POST /recruteur/creationOffre/addOffer)");

        res.status(500).json({
            error: "Echec de l'ajout de l'offre d'emploi",
            status: "error"
        });
    }
});

// PUT route for /offreDemploi/:num_offre, modifie une offre d'emploi
router.put('/:num_offre', function(req, res) {
    try {
        const num_offre = req.params.num_offre;

        const date_validite = req.body.date_validite;
        const indication = req.body.indication;
        const num_docs_req = req.body.num_docs_req;
        const etat = req.body.etat;
        const id_recruteur = req.session.id_utilisateur;

        offreDemploiModel.update(num_offre, date_validite, indication, num_docs_req, etat, id_recruteur, function(success) {
            if (success) {
                console.log("offreDemploi modifiee avec succes - (PUT /recruteur/creationOffre/:num_offre)");

                res.status(200).json({
                    message: "offreDemploi modifiee avec succes",
                    redirect: "/recruteur/listeOffresDemploi",
                    status: "success",
                })
            } else {
                console.log("Erreur lors de la modification de l'offreDemploi - (PUT /recruteur/creationOffre/:num_offre)");

                res.status(500).json({
                    error: "Erreur lors de la modification de l'offreDemploi",
                    status: "error",
                });
            }
        });
    } catch (error) {
        console.log("Erreur lors de la modification de l'offreDemploi: " + error + " - (PUT /recruteur/creationOffre/:num_offre)");

        res.status(500).json({
            error: "Erreur lors de la modification de l'offreDemploi",
            status: "error",
        });
    }
});




module.exports = router;

