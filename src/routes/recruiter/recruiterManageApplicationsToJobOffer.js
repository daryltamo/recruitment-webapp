const express = require('express');
const router = express.Router();
const applicationModel = require('../../model/application');

router.get('/', function (req, res) {
    // rediriger vers la des offres  (coté recruteur : /recruteur/gestionOffresRecruteur) parce qu'il faut utiliser la routes /recruteur/gestionCandAUneOffre/:idJobOffer qui précise sur quelle offre on veut candidater
    // on pourrait faire mieux: si le numéro de l'offre est dans la session, on le récupère et on affiche la vue ../views/recruteur/gestionCandAUneOffre

    const idJobOffer = req.params.offerNumber;

    if (idJobOffer === null) {
        console.log(
            'Erreur: idJobOffer est null. - (/recruteur/gestionCandAUneoffre/)'
        );

        res.redirect('/recruteur/gestionOffresRecruteur');
    } else {
        applicationModel.readallforOffer(idJobOffer, function (results) {
            if (results) {
                console.log(
                    'Lecture des candidatures pour offreDemploi(id_offredemploi= ' +
                        idJobOffer +
                        ') reussie. - (/recrruteur/gestionCandAUneoffre/)'
                );

                res.render('../views/recrruteur/gestionCandAUneoffre/', {
                    title:
                        'Liste des candidatures pour offreDemploi' + idJobOffer,
                    message: 'Candidature lues avec succes',
                    candidatures: results
                });
            } else {
                console.log(
                    'Echec de la lecture des candidatures pour offreDemploi(id_offredemploi= ' +
                        idJobOffer +
                        '). - (/recrruteur/gestionCandAUneoffre/)'
                );

                res.status(404).json({
                    error: 'Echec de la suppression de la candidature',
                    status: 'error'
                });
            }
        });
    }
});

router.get('/:offerNumber', function (req, res) {
    const idJobOffer = req.params.offerNumber;

    applicationModel.readallforOffer(idJobOffer, function (results) {
        if (results) {
            console.log(
                'Lecture des candidatures pour offreDemploi(id_offredemploi= ' +
                    idJobOffer +
                    ') reussie. - (/recrruteur/gestionCandAUneoffre/:offerNumber)'
            );

            res.render('../views/recrruteur/gestionCandAUneoffre/', {
                title: 'Liste des candidatures pour offreDemploi' + idJobOffer,
                message: 'Candidature lues avec succes',
                candidatures: results
            });
        } else {
            console.log(
                'Echec de la lecture des candidatures pour offreDemploi(id_offredemploi= ' +
                    idJobOffer +
                    '). - (/recrruteur/gestionCandAUneoffre/:offerNumber)'
            );

            res.status(404).json({
                error: 'Echec de la suppression de la candidature',
                status: 'error'
            });
        }
    });
});

router.delete('/:offerNumber', function (req, res) {
    const idApplicant = req.session.idUser;
    const offerNumber = req.params.offerNumber;

    applicationModel.delete(idApplicant, offerNumber, function (result) {
        if (result) {
            res.status(200).json({
                message: 'Candidature supprimee',
                status: 'success'
            });
        } else {
            res.status(404).json({
                error: 'Echec de la suppression de la candidature',
                status: 'error'
            });
        }
    });
});

module.exports = router;
