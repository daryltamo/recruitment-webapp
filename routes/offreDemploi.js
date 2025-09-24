const express = require('express');
const router = express.Router();
var offreDemploiModel =require("../model/offreDemploi");

// GET route for /offreDemploi
router.get('/', function(req, res, next) {
    try {

        offreDemploiModel.readall( function(result) {
            if (result) {
                console.log(result.lenght + " offres d'emploi recuperees avec succes. - (GET /offreDemploi)");

                res.render('offreDemploi', {
                    title: "Liste des offres d'emploi",
                    offresDemploi: result,
                    status: "success",
                });
            }
            else {
                console.log("Aucne offre d'emploi trouvee. - (GET /offreDemploi)");

                res.render('offreDemploi', {
                    title: "Liste des offres d'emploi",
                    offresDemploi: [],
                    error: "Aucune offre d'emploi trouvee",
                    status: "error"
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture de la table offreDemploi: " + error + ". - (GET /offreDemploi)");

        res.render('offreDemploi', {
            title: "Liste des offres d'emploi",
            offresDemploi: [],
            error: "Echec de la lecture des offres d'emploi.",
            status: "error"
        });
    }
});

router.get('/candidat/filterOffers', function(req, res, next) {
    try {

    }
    catch (error) {
        console.log("Echec du filtre des offres d'emploi: " + error);

        res.status(500).json({
            error: "Echec du filtre des offres d'emploi.",
            status: "error"
        });
        next(error);
    }
});

// GET route for /offreDemploi/:id
router.get('/:num_offre', function(req, res, next) {
    try {
        const num_offre = req.params.num_offre;

        offreDemploiModel.read(num_offre, function(result) {
            if (result) {
                console.log("")

                res.render('offreDemploi-details', {
                    title: 'Details de l\'offre d\'emploi',
                    offreDemploi: result,
                    status: "success"
                });
            } else {


                res.status(500).json({
                    error: "Offre d'emploi non trouvee.",
                    status: "error",
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture de l'offre d'emploi(num=" + num_offre+ "): " + error);
        
        res.status(500).json({
            error: "Echec de la lecture de l'offre d'emploi.",
            status: "error",
        });
    }
});

// POST route for /offreDemploi
router.post('/addOffer',  function (req, res, next){
    try {
        const num_offre = req.body.num_offre;
        const date_validite = req.body.date_validite;
        const indication = req.body.indication;
        const num_docs_req = req.body.num_docs_req;
        const etat = req.body.etat;

        const recruteur = req.session.id_utilisateur;
        // const recruteur = req.body.recruteur;
    
        console.log(num_offre, date_validite, indication, num_docs_req, etat, recruteur);

        offreDemploiModel.create(num_offre, date_validite, indication, num_docs_req, etat, recruteur, function (success) {
            if (success) {


                res.redirect('/recruteur/creationOffre');
            } else {


                res.status(500).json({
                    error: "Echec d'ajout de l'offre d'emploi",
                });
            }
        });
    } catch (error) {
        console.log("Echec de l'ajout de l'offre d'emploi: " + error);

        res.status(500).json({
            error: "Echec de l'ajout de l'offre d'emploi",
            status: "error",
        });
    }
});

// PUT route for /offreDemploi/:id
router.put('/:num_offre', function (req, res, next) {
    try {
        // const { date_validite, indication, num_docs_req, etat, recruteur } = req.body;
        const num_offre = req.params.num_offre;

        const date_validite = req.body.date_validite;
        const indication = req.body.indication;
        const num_docs_req = req.body.num_docs_req;
        const etat = req.body.etat;

        const recruteur = req.session.id_utilisateur;
        // const recruteur = req.body.recruteur;

        offreDemploiModel.update(num_offre, date_validite, indication, num_docs_req, etat, recruteur, function(success) {
            if (success) {
                console.log("offre demploi (num=" + num_offre + ") mise a jour avec succes. (PUT /offreDempoi/:num_offre)");

                res.status(200).json({
                    message: "Offre d'emploi mise a jour avec succes.",
                    status: "success",
                });
            } else {
                console.log("offre demploi (num=" + num_offre + ") non trouvee. (PUT /offreDempoi/:num_offre)");

                res.status(500).json({
                    error: "Echec de la mise a jour de l'offre d'emploi: offre d'empoi non trouvee.",
                    status: "error",
                });
            }
        });
    } catch (error) {
        console.log("Echec de la mise a jour de offreDemploi(num=" + num_offre + "): " + error + ". (PUT /offreDempoi/:num_offre)");

        res.status(500).json({
            error: "Echec de la mise a jour de l\'offre d\'emploi.",
            status: "success",
        });
    }
});

// DELETE route for /offreDemploi/:num_offre
router.delete('/:num_offre', function (req, res, next) {
    try {
        const num_offre = req.params.num_offre;

        offreDemploiModel.delete(num_offre, function(success) {
            if (success) {
                console.log("offre demploi (num=" + num_offre + ") supprimee avec succes. (DELETE /offreDempoi/:num_offre)");

                res.status(200).json({
                    message: "Offre d'emploi supprimee avec succes.",
                    status: "success",
                });
            } else {
                console.log("offre demploi (num=" + num_offre + ") non trouvee. (DELETE /offreDempoi/:num_offre)");

                res.status(404).json({
                    error: "Echec de la suppression de l'offre d'emploi: offre d'empoi non trouvee.",
                    status: "error",
                });
            }
        });
    } catch (error) {
        console.log("Echec de la suppression de offreDemploi(num=" + num_offre + "): " + error + ". (DELETE /offreDempoi/:num_offre)");
        
        res.status(500).json({
            error: "Echec de la suppression de l\'offre d\'emploi.",
            status: "error"
        });
    }
});

module.exports = router;

