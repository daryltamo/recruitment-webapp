var express = require('express');
var router = express.Router();
var offreDemploiModel = require("../../model/offreDemploi");

router.get('/', function(req, res) {
    // rediriger vers la des offres  (coté recruteur : /recruteur/gestionOffresRecruteur) parce qu'il faut utiliser la routes /recruteur/detailOffreRecruteur/:num_offre qui précise sur quelle offre on veut candidater
    // on pourrait faire mieux: si le numéro de l'offre est dans la session, on le récupère et on affiche la vue ../views/recruteur/detailOffreRecruteur
    res.redirect("/recruteur/gestionOffresRecruteur");
    const id_candidat = req.session.id_utilisateur;
    const id_offre_demploi = req.params.num_offre;

    if (id_offre_demploi === null) {
        console.log("Erreur: id_offre_demploi est null. - (GET /recruteur/detailOffreRecruteur/)");

        res.redirect("/recruteur/gestionOffresRecruteur");
    } else {
        offreDemploiModel.read(id_offre_demploi, function(result) {
            if (result) {
                console.log("Lecture de l'offre (id_offre_demploi= " + id_offre_demploi + ") reussie. - (GET /recruteur/detailOffreRecruteur/)");

                res.render("../views/recruteur/detailOffreRecruteur", {
                    title: "MT Rec - Detail de l'offre (num=" + num + ") pour Recruteur",
                    offre: result,
                });
            } else {
                console.log("Echec de la lecture de l'offre (id_offre_demploi= " + id_offre_demploi + "). - (GET /recruteur/detailOffreRecruteur/)");

                res.status(404).json({
                    error: "Aucune offre trouve.",
                });
            }
        });
    }

});

router.get('/:num_offre', function(req, res) {
    const id_candidat = req.session.id_utilisateur;
    const id_offre_demploi = req.params.num_offre;

    offreDemploiModel.read(id_offre_demploi, function(result) {
        if (result) {
            console.log("Lecture de l'offre (id_offre_demploi= " + id_offre_demploi + ") reussie. - (GET /recruteur/detailOffreRecruteur/:num_offre)");

            res.render("../views/recruteur/detailOffreRecruteur", {
                title: "MT Rec - Detail de l'offre (id_offre_demploi=" + id_offre_demploi + ") pour Recruteur",
                offre: result,
            });
        } else {
            console.log("Echec de la lecture de l'offre (id_offre_demploi= " + id_offre_demploi + "). - (GET /recruteur/detailOffreRecruteur/:num_offre)");

            res.status(404).json({
                error: "Aucune offre trouve.",
            });
        }
    });
});





module.exports = router;

