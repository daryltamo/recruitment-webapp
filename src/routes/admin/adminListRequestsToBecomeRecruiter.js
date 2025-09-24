const express = require('express');
const router = express.Router();
const requestModel = require('../../model/request');
const userModel = require('../../model/user');

// GET /demande/demandeDevenirRecruteur
router.get('/', function (req, res) {
    try {
        requestModel.readallDemandeDevenirRecruteur(function (result) {
            if (result) {
                console.log(
                    'Lecture des demandes de devenir recruteur effectuee. ' +
                        result +
                        ' - (GET /demande/demandeDevenirRecruteur)'
                );

                res.render('../views/admin/listeDemandesDevenirRecruteur', {
                    title: 'MT Rec - Liste des demandes Devenir Recruteur',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log(
                    "Demandes 'Devenir Recruteur' non trouvees ou liste vide. - (GET /demande/demandeDevenirRecruteur)"
                );

                res.render('../views/admin/listeDemandesDevenirRecruteur', {
                    title: 'MT Rec - Liste des demandes Devenir Recruteur',
                    demandes: [], // renvoyer une liste vide
                    status: 'success'
                });
            }
        });
    } catch (error) {
        console.log(
            'Echec de la lecture des demandes de devenir recruteur: ' +
                error +
                ' - (GET /demande/demandeDevenirRecruteur)'
        );

        res.render('../views/admin/listeDemandesDevenirRecruteur', {
            title: 'MT Rec - Liste des demandes Devenir Recruteur',
            demandes: [], // renvoyer une liste vide
            error: 'Echec de la lecture des demandes de devenir recruteur.',
            status: 'error'
        });
    }
});

// Accepter une demande de devenir recruteur
router.post('/accept/:id', function (req, res) {
    try {
        const idRequest = req.params.id;
        // const idRequest = req.body.idRequest;
        const email = req.session.mail;
        const NEEDED_USER_TYPE = 'Recruteur';

        userModel.updateUserType(email, NEEDED_USER_TYPE, function (success) {
            if (success) {
                console.log(
                    "Mise a jour de l'utilisateur (" +
                        email +
                        ") en 'Recruteur' effectuee. - (POST /admin/listeDemandesDevenirRecruteur/accept/:id)"
                );

                requestModel.acceptDemandeDevenirRecruteur(
                    idRequest,
                    function (success) {
                        if (success) {
                            console.log(
                                'Acceptation de la demande de devenir recruteur effectuee. - (POST /admin/listeDemandesDevenirRecruteur/accept/:id)'
                            );

                            res.status(200).json({
                                message: 'Demande acceptee avec succes.',
                                status: 'success'
                            });
                        } else {
                            console.log(
                                "Echec de l'acceptation de la demande de devenir recruteur. - (POST /admin/listeDemandesDevenirRecruteur/accept/:id)"
                            );

                            res.status(500).json({
                                error: "Echec de l'acceptation de la demande.",
                                status: 'error'
                            });
                        }
                    }
                );
            } else {
                console.log(
                    "Echec de la mise a jour de l'utilisateur (" +
                        email +
                        ") en 'Recruteur'. - (POST /admin/listeDemandesDevenirRecruteur/accept/:id)"
                );

                res.status(500).json({
                    error: "Echec de l'acceptation de la demande.",
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log(
            "Echec de l'acceptation de la demande de devenir recruteur: " +
                error +
                '. - (POST /admin/listeDemandesDevenirRecruteur/accept/:id)'
        );

        res.status(500).json({
            error: "Echec de l'acceptation de la demande.",
            status: 'error'
        });
    }
});

// Refuser une demande de devenir recruteur
router.post('/refuse/:id', function (req, res) {
    try {
        const idRequest = req.params.id;

        requestModel.refuseDemandeDevenirRecruteur(
            idRequest,
            function (success) {
                if (success) {
                    console.log(
                        'Refus de la demande de devenir recruteur effectuee. - (POST /admin/listeDemandesDevenirRecruteur/refuse/:id)'
                    );

                    res.status(200).json({
                        message: 'Demande refusee avec succes.',
                        status: 'success'
                    });
                } else {
                    console.log(
                        'Echec du refus de la demande de devenir recruteur. - (POST /admin/listeDemandesDevenirRecruteur/refuse/:id)'
                    );

                    res.status(500).json({
                        error: 'Echec du refus de la demande.',
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        console.log(
            'Echec du refus de la demande de devenir recruteur: ' +
                error +
                '. - (POST /admin/listeDemandesDevenirRecruteur/refuse/:id)'
        );

        res.status(500).json({
            error: 'Echec du refus de la demande.',
            status: 'error'
        });
    }
});

// GET route for  /admin/listeDemandesDevenirRecruteur/pending inspired by /demande/demandeDevenirRecruteur/pending
router.get('/pending', function (req, res) {
    try {
        requestModel.readallDemandeDevenirRecruteurPending(function (result) {
            if (result) {
                console.log(
                    'Lecture des demandes de devenir recruteur en attente effectuee. ' +
                        result +
                        ' - (GET /admin/listeDemandesDevenirRecruteur/pending)'
                );

                res.render('demande', {
                    // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log(
                    'Erreur lors de la lecture des demandes de devenir recruteur en attente. - (GET /admin/listeDemandesDevenirRecruteur/pending)'
                );

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log(
            'Echec de la lecture des demandes de devenir recruteur en attente: ' +
                error +
                '. - (GET /admin/listeDemandesDevenirRecruteur/pending)'
        );

        res.status(500).json({
            error: 'Echec de la lecture des demandes de devenir recruteur en attente.',
            status: 'error'
        });
    }
});

// GET route for /admin/listeDemandesDevenirRecruteur/notpending inspired by  /demande/demandeDevenirRecruteur/notpending
router.get('/notpending', function (req, res) {
    try {
        requestModel.readallDemandeDevenirRecruteurNotPending(function (
            result
        ) {
            if (result) {
                console.log(
                    'Lecture des demandes de devenir recruteur non en attente effectuee. ' +
                        result +
                        ' - (GET /admin/listeDemandesDevenirRecruteur/notpending)'
                );

                res.render('demande', {
                    // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log(
                    'Erreur lors de la lecture des demandes de devenir recruteur non en attente. - (GET /admin/listeDemandesDevenirRecruteur/notpending)'
                );

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log(
            'Echec de la lecture des demandes de devenir recruteur non en attente: ' +
                error +
                '. - (GET /admin/listeDemandesDevenirRecruteur/notpending)'
        );

        res.status(500).json({
            error: 'Echec de la lecture des demandes de devenir recruteur non en attente.',
            status: 'error'
        });
    }
});

module.exports = router;
