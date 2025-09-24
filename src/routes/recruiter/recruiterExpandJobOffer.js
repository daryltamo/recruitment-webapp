const express = require('express');
const router = express.Router();
const jobOfferModel = require('../../model/jobOffer');

router.get('/', function (req, res) {
    // rediriger vers la des offres  (coté recruteur : /recruteur/gestionOffresRecruteur) parce qu'il faut utiliser la routes /recruteur/detailOffreRecruteur/:offerNumber qui précise sur quelle offre on veut candidater
    // on pourrait faire mieux: si le numéro de l\'offre est dans la session, on le récupère et on affiche la vue ../views/recruteur/detailOffreRecruteur
    res.redirect('/recruteur/gestionOffresRecruteur');
    //const idApplicant = req.session.idUser;
    const idJobOffer = req.params.offerNumber;

    if (idJobOffer === null) {
        console.log(
            'Erreur: idJobOffer est null. - (GET /recruteur/detailOffreRecruteur/)'
        );

        res.redirect('/recruteur/gestionOffresRecruteur');
    } else {
        jobOfferModel.read(idJobOffer, function (result) {
            if (result) {
                console.log(
                    "Lecture de l'offre (idJobOffer= " +
                        idJobOffer +
                        ') reussie. - (GET /recruteur/detailOffreRecruteur/)'
                );

                res.render('../views/recruteur/detailOffreRecruteur', {
                    title:
                        "MT Rec - Detail de l'offre (num=" +
                        idJobOffer +
                        ') pour Recruteur',
                    offre: result
                });
            } else {
                console.log(
                    "Echec de la lecture de l'offre (idJobOffer= " +
                        idJobOffer +
                        '). - (GET /recruteur/detailOffreRecruteur/)'
                );

                res.status(404).json({
                    error: 'Aucune offre trouve.'
                });
            }
        });
    }
});

router.get('/:offerNumber', function (req, res) {
    // const idApplicant = req.session.idUser;
    const idJobOffer = req.params.offerNumber;

    jobOfferModel.read(idJobOffer, function (result) {
        if (result) {
            console.log(
                "Lecture de l'offre (idJobOffer= " +
                    idJobOffer +
                    ') reussie. - (GET /recruteur/detailOffreRecruteur/:offerNumber)'
            );

            res.render('../views/recruteur/detailOffreRecruteur', {
                title:
                    "MT Rec - Detail de l'offre (idJobOffer=" +
                    idJobOffer +
                    ') pour Recruteur',
                offre: result
            });
        } else {
            console.log(
                "Echec de la lecture de l'offre (idJobOffer= " +
                    idJobOffer +
                    '). - (GET /recruteur/detailOffreRecruteur/:offerNumber)'
            );

            res.status(404).json({
                error: 'Aucune offre trouve.'
            });
        }
    });
});

module.exports = router;
