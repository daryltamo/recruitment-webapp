const express = require('express');
const router = express.Router();
const jobOfferModel = require('../../model/jobOffer');
const jobDescriptionModel = require('../../model/jobDescription');

router.get('/', function (req, res) {
    try {
        jobDescriptionModel.readall(function (fiches) {
            if (fiches) {
                console.log(
                    fiches.length +
                        " fiches de poste recuperees lors de la lecture des offre d'emploi par l'utilisteur " +
                        req.session.idUser +
                        '. - (GET /recruteur/gestionOffresRecruteur/)'
                );

                jobOfferModel.readall(function (result) {
                    if (result) {
                        result = result.filter(
                            (element) =>
                                element.idRecruiter === req.session.idUser
                        );

                        console.log(
                            result.length +
                                " offres d'emploi recuperees pour le recruteur " +
                                req.session.idUser +
                                '. - (GET /recruteur/gestionOffresRecruteur)'
                        );

                        res.render(
                            '../views/recruteur/gestionOffresRecruteur',
                            {
                                title: 'MT Rec - Gestion des offres',
                                offres: result,
                                fichesDePoste: fiches,
                                status: 'success'
                            }
                        );
                    } else {
                        console.log(
                            'Aucune offre trouvee pour le recruteur ' +
                                req.session.idUser +
                                '. - (GET /recruteur/gestionOffresRecruteur)'
                        );

                        res.render(
                            '../views/recruteur/gestionOffresRecruteur',
                            {
                                title: 'MT Rec - Gestion des offres',
                                offres: [],
                                fichesDePoste: fiches,
                                error: 'Aucune offre trouvee.',
                                status: 'error'
                            }
                        );
                    }
                });
            } else {
                console.log(
                    "Aucune fiche de poste recuperee lors de la lecture des offre d'emploi par l'utilisteur " +
                        req.session.idUser +
                        '. - (GET /recruteur/gestionOffresRecruteur/:offerNumber)'
                );

                res.render('../views/recruteur/gestionOffresRecruteur', {
                    title: 'MT Rec - Gestion des offres',
                    offres: [],
                    fichesDePoste: [],
                    error: 'Aucune fiche de poste trouvee.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log(
            'Echec de la lecture des offres pour le recruteur : ' +
                error +
                ' - (GET /recruteur/gestionOffresRecruteur)'
        );

        res.render('../views/recruteur/gestionOffresRecruteur', {
            title: 'MT Rec - Gestion des offres',
            offres: [],
            fichesDePoste: [],
            error: 'Echec de la lecture des offres/fiches de poste.',
            status: 'error'
        });
    }
});

router.get('/:offerNumber', function (req, res) {
    const offerNumber = req.params.offerNumber;
    try {
        jobDescriptionModel.readall(function (fiches) {
            if (fiches) {
                console.log(
                    fiches.length +
                        " fiches de poste recuperees pour modification de l'offre d'emploi (offerNumber" +
                        offerNumber +
                        ") par l'utilisteur " +
                        req.session.idUser +
                        '. - (GET /recruteur/gestionOffresRecruteur/:offerNumber)'
                );

                jobOfferModel.read(offerNumber, function (result) {
                    if (result) {
                        console.log(
                            "offre d'emploi (offerNumber" +
                                offerNumber +
                                ') recuperee pour le recruteur ' +
                                req.session.idUser +
                                ' pour modification. - (GET /recruteur/gestionOffresRecruteur/:offerNumber)'
                        );

                        res.status(200).json({
                            title: 'MT Rec - Gestion des offres',
                            offre: result,
                            fichesDePoste: fiches,
                            status: 'success'
                        });
                    } else {
                        console.log(
                            "offre d'emploi (offerNumber" +
                                offerNumber +
                                ') non trouvee pour le recruteur ' +
                                req.session.idUser +
                                '. - (GET /recruteur/gestionOffresRecruteur/:offerNumber)'
                        );

                        res.status(200).json({
                            title: 'MT Rec - Gestion des offres',
                            offre: [],
                            fichesDePoste: fiches,
                            error:
                                'offre (offerNumber ' +
                                offerNumber +
                                ') non trouvee !',
                            status: 'error'
                        });
                    }
                });
            } else {
                console.log(
                    "Aucune fiche de poste recuperee pour modification de l'offre d'emploi (offerNumber" +
                        offerNumber +
                        ") par l'utilisteur " +
                        req.session.idUser +
                        '. - (GET /recruteur/gestionOffresRecruteur/:offerNumber)'
                );

                res.status(200).json({
                    title: 'MT Rec - Gestion des offres',
                    offre: [],
                    fichesDePoste: [],
                    error: 'Aucune fiche de poste trouvee!',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log(
            "Echec de la lecture de l'offre d'emploi (offerNumber" +
                offerNumber +
                ') pour le recruteur : ' +
                error +
                '. - (GET /recruteur/gestionOffresRecruteur/:offerNumber)'
        );

        res.status(200).json({
            title: 'MT Rec - Gestion des offres',
            offre: [],
            fichesDePoste: [],
            error: "Echec de la lectur de l'offre ou des fiches de poste !",
            status: 'error'
        });
    }
});

// PUT route for /offreDemploi, modifie une offre d'emploi
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
                        'offreDemploi modifiee avec succes. - (PUT /recruteur/gesionOffresRecruteur/:offerNumber)'
                    );

                    res.status(200).json({
                        message: 'offreDemploi modifiee avec succes',
                        status: 'success'
                    });
                } else {
                    console.log(
                        "Erreur lors de la modification de l'offreDemploi. - (PUT /recruteur/gesionOffresRecruteur/:offerNumber)"
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
                '. - (PUT /recruteur/gesionOffresRecruteur/:offerNumber)'
        );

        res.status(500).json({
            error: "Erreur lors de la modification de l'offreDemploi",
            status: 'error'
        });
    }
});

// DELETE route for /offreDemploi/:num, supprime une offre d'emploi
router.delete('/:num', function (req, res) {
    try {
        const offerNumber = req.params.num;

        console.log(offerNumber);

        jobOfferModel.delete(offerNumber, function (result) {
            if (result) {
                console.log(
                    'Offre supprimee. - (DELETE /recruteur/gestionOffresRecruteur)'
                );

                res.status(200).json({
                    message: 'Offre supprimee',
                    redirect: '/recruteur/gestionOffresRecruteur',
                    status: 'success'
                });
            } else {
                console.log(
                    "Echec de la suppression de l'offre. - (DELETE /recruteur/gestionOffresRecruteur)"
                );

                res.status(404).json({
                    error: 'Offre non trouvee',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log(
            "Echec de la suppression de l'offre: " +
                error +
                '. - (DELETE /recruteur/gestionOffresRecruteur)'
        );

        res.status(500).json({
            error: "Echec de la suppression de l'offre",
            status: 'error'
        });
    }
});

module.exports = router;
