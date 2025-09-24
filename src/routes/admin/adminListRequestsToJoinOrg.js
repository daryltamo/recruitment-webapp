const express = require('express');
const router = express.Router();
const requestModel = require('../../model/requestJoinOrg');
const userModel = require('../../model/user');
// const organizationModel = require('../../model/organization');

// GET route for /admin/listeDemandesRejoindreOrg inspired by GET /demande/demandeRejoindreOrg
router.get('/', function (req, res) {
    try {
        requestModel.readallDemandeJoindreOrg(function (result) {
            if (result) {
                console.log(
                    "Lecture des demandes d'attribution d'organisation effectuee. " +
                        result +
                        ' - (GET /admin/listeDemandesRejoindreOrg)'
                );

                res.render('../views/admin/listeDemandesRejoindreOrg', {
                    title: "MT Rec - Liste des demandes d'attribution d'organisations",
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log(
                    "Demandes d'attribution d'organisations non trouvees ou liste vide. - (GET /admin/listeDemandesRejoindreOrg)"
                );

                res.render('../views/admin/listeDemandesRejoindreOrg', {
                    title: "MT Rec - Liste des demandes d'attribution d'organisations",
                    demandes: [],
                    status: 'success'
                });
            }
        });
    } catch (error) {
        console.log(
            "Echec de la lecture des demandes d'attribution d'organisation: " +
                error +
                ' - (GET /admin/listeDemandesRejoindreOrg)'
        );

        res.render('../views/admin/listeDemandesRejoindreOrg', {
            title: "MT Rec - Liste des demandes d'attribution d'organisations",
            demandes: [], // renvoyer une liste vide
            error: "Echec de la lecture des demandes d'attribution d'organisation.",
            status: 'error'
        });
    }
});

// Accepter une demande de rejoindre une organisation
router.post('/accept/:id', function (req, res) {
    try {
        const idRequest = req.params.id;
        // const idRequest = req.body.idRequest;
        const idUser = req.body.idUser;

        const sirenOrg = req.body.sirenOrg;
        // const nameOrg = req.body.nameOrg;
        // const raison = req.body.raison;

        userModel.updateUserOrgUsingId(idUser, sirenOrg, function (success) {
            if (success) {
                console.log(
                    "Changement d'organisation de l'utilisateur (idUser: " +
                        idUser +
                        ') effectue. - (POST /admin/listeDemandesRejoindreOrg/accept/:id)'
                );

                requestModel.acceptDemandeJoindreOrg(
                    idRequest,
                    function (success) {
                        if (success) {
                            console.log(
                                'Acceptation de la demande de rejoindre une organisation effectuee. - (POST /admin/listeDemandesRejoindreOrg/accept/:id)'
                            );

                            res.status(200).json({
                                message: 'Demande acceptee avec succes.',
                                status: 'success'
                            });
                        } else {
                            console.log(
                                "Echec de l'acceptation de la demande de rejoindre une organisation. - (POST /admin/listeDemandesRejoindreOrg/accept/:id)"
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
                    "Echec du changement d'organisation de l'utilisateur (idUser: " +
                        idUser +
                        '). - (POST /admin/listeDemandesRejoindreOrg/accept/:id)'
                );

                res.status(500).json({
                    error: "Echec du changement d'organisation de l'utilisateur.",
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log(
            "Echec de l'acceptation de la demande de rejoindre une organisation: " +
                error +
                '. - (POST /admin/listeDemandesRejoindreOrg/accept/:id)'
        );

        res.status(500).json({
            error: "Echec de l'acceptation de la demande.",
            status: 'error'
        });
    }
});

// Refuser une demande de rejoindre une organisation
router.post('/refuse/:id', function (req, res) {
    try {
        const idRequest = req.params.id;

        requestModel.refuseDemandeJoindreOrg(idRequest, function (success) {
            if (success) {
                console.log(
                    'Refus de la demande de rejoindre une organisation effectuee. - (POST /admin/listeDemandesRejoindreOrg/refuse/:id)'
                );

                res.status(200).json({
                    message: 'Demande refusee avec succes.',
                    status: 'success'
                });
            } else {
                console.log(
                    'Echec du refus de la demande de rejoindre une organisation. - (POST /admin/listeDemandesRejoindreOrg/refuse/:id)'
                );

                res.status(500).json({
                    error: 'Echec du refus de la demande.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log(
            'Echec du refus de la demande de rejoindre une organisation: ' +
                error +
                '. - (POST /admin/listeDemandesRejoindreOrg/refuse/:id)'
        );

        res.status(500).json({
            error: 'Echec du refus de la demande.',
            status: 'error'
        });
    }
});

// GET route for /admin/listeDemandeRejoindreOrg/pending inspired by GET /demande/demandeRejoindreOrg/pending
router.get('/demandeRejoindreOrg/pending', function (req, res) {
    try {
        requestModel.readallDemandeJoindreOrgPending(function (result) {
            if (result) {
                console.log(
                    'Lecture des demandes de rejoindre une organisation en attente effectuee. ' +
                        result +
                        ' - (GET /admin/listeDemandesRejoindreOrg/pending)'
                );

                res.render('demande', {
                    // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log(
                    'Erreur lors de la lecture des demandes de rejoindre une organisation en attente. - (GET /admin/listeDemandesRejoindreOrg/pending)'
                );

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log(
            'Echec de la lecture des demandes de rejoindre une organisation en attente: ' +
                error +
                '. - (GET /admin/listeDemandesRejoindreOrg/pending)'
        );

        res.status(500).json({
            error: 'Echec de la lecture des demandes de rejoindre une organisation en attente.',
            status: 'error'
        });
    }
});

// GET route for /admin/listeDemandeRejoindreOrg/notpending inspired by GET /demande/demandeRejoindreOrg/notpending
router.get('/notpending', function (req, res) {
    try {
        requestModel.readallDemandeJoindreOrgNotPending(function (result) {
            if (result) {
                console.log(
                    'Lecture des demandes de rejoindre une organisation non en attente effectuee. ' +
                        result +
                        ' - (GET /admin/listesDemandeRejoindreOrg/notpending)'
                );

                res.render('demande', {
                    // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log(
                    'Erreur lors de la lecture des demandes de rejoindre une organisation non en attente. - (GET /admin/listeDemandesRejoindreOrg/notpending)'
                );

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log(
            'Echec de la lecture des demandes de rejoindre une organisation non en attente: ' +
                error +
                '. - (GET /admin/listeDemandesRejoindreOrg/notpending)'
        );

        res.status(500).json({
            error: 'Echec de la lecture des demandes de rejoindre une organisation non en attente.',
            status: 'error'
        });
    }
});

module.exports = router;
