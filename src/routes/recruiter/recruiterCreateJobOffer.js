const express = require('express');
const router = express.Router();
const jobOfferModel = require('../../model/jobOffer');
const jobDescriptionModel = require('../../model/jobDescription');

// GET route for /offreDemploi, récupère toutes les fiches de poste de l\'organisation et affiche un formulaire pour la création d\'une offre d\'emploi
router.get('/', function (req, res) {
    try {
        const idOrganization = req.session.idOrganization;

        jobDescriptionModel.readallInOrganisation(
            idOrganization,
            function (result) {
                if (result) {
                    console.log(
                        result.length +
                            'fiches de poste trouvees. - (GET /recruteur/creationOffre)'
                    );

                    res.render('../views/recruteur/creationOffreForm', {
                        fichesDePoste: result,
                        status: 'success'
                    });
                } else {
                    console.log(
                        'Aucune fiche de poste trouvee. - (GET /recruteur/creationOffre)'
                    );

                    res.render('../views/recruteur/creationOffreForm', {
                        fichesDePoste: [],
                        error: 'Aucune fiche de poste trouvee.',
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        console.log(
            'Echec de la lecture des ficheDePoste: ' +
                error +
                ' - (GET /recruteur/creationOffre)'
        );

        res.render('../views/recruteur/creationOffreForm', {
            fichesDePoste: [],
            error: 'Echec de la lecture des ficheDePoste.',
            status: 'error'
        });
    }
});

// POST route for /offreDemploi, ajoute une offre d\'emploi
router.post('/addOffer', function (req, res, next) {
    try {
        const idJobDescription = req.body.idJobDescription;
        const expirationDate = req.body.expirationDate;
        const indication = req.body.indication;
        const numberOfRequiredDocuments = req.body.numberOfRequiredDocuments;
        const state = req.body.state;
        const idRecruiter = req.session.idUser;

        console.log(
            idJobDescription,
            expirationDate,
            indication,
            numberOfRequiredDocuments,
            state,
            idRecruiter,
            ' - (POST /recruteur/creationOffre/addOffer)'
        );

        jobOfferModel.create(
            idJobDescription,
            expirationDate,
            indication,
            numberOfRequiredDocuments,
            state,
            idRecruiter,
            function (success) {
                if (success) {
                    console.log(
                        "Offre d'emploi ajoutee avec succes - (POST /recruteur/creationOffre/addOffer)"
                    );

                    res.status(500).json({
                        message: "Offre d'emploi ajoutee avec succes",
                        status: 'success'
                    });
                } else {
                    console.log(
                        "Echec d'ajout d'une offre d'emploi - (POST /recruteur/creationOffre/addOffer)"
                    );

                    res.status(500).json({
                        error: "Echec d'ajout d'une offre d'emploi",
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        console.log(
            "Echec de l'ajout de l'offre d'emploi: " +
                error +
                ' - (POST /recruteur/creationOffre/addOffer)'
        );

        res.status(500).json({
            error: "Echec de l'ajout de l'offre d'emploi",
            status: 'error'
        });
        next(error);
    }
});

// PUT route for /offreDemploi/:offerNumber, modifie une offre d\'emploi
router.put('/:offerNumber', function (req, res) {
    try {
        const offerNumber = req.params.offerNumber;

        const expirationDate = req.body.expirationDate;
        const indication = req.body.indication;
        const numberOfRequiredDocuments = req.body.numberOfRequiredDocuments;
        const state = req.body.state;
        const idRecruiter = req.session.idUser;

        jobOfferModel.update(
            offerNumber,
            expirationDate,
            indication,
            numberOfRequiredDocuments,
            state,
            idRecruiter,
            function (success) {
                if (success) {
                    console.log(
                        'offreDemploi modifiee avec succes - (PUT /recruteur/creationOffre/:offerNumber)'
                    );

                    res.status(200).json({
                        message: 'offreDemploi modifiee avec succes',
                        redirect: '/recruteur/listeOffresDemploi',
                        status: 'success'
                    });
                } else {
                    console.log(
                        "Erreur lors de la modification de l'offreDemploi - (PUT /recruteur/creationOffre/:offerNumber)"
                    );

                    res.status(500).json({
                        error: "Erreur lors de la modification de l'offreDemploi",
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        console.log(
            "Erreur lors de la modification de l'offreDemploi: " +
                error +
                ' - (PUT /recruteur/creationOffre/:offerNumber)'
        );

        res.status(500).json({
            error: "Erreur lors de la modification de l'offreDemploi",
            status: 'error'
        });
    }
});

module.exports = router;
