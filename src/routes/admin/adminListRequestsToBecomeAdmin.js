const express = require('express');
const router = express.Router();
const requestModel = require('../../model/request');
const userModel = require('../../model/user');

// GET route for /demande/demandeDevenirAdmin
router.get('/', function (req, res) {
    try {
        requestModel.readallDemandeDevenirAdmin(function (result) {
            if (result) {
                console.log(
                    'Lecture des demandes de devenir admin effectuee. ' +
                        result +
                        ' - (GET /demande/demandeDevenirAdmin)'
                );

                res.render('../views/admin/listeDemandesDevenirAdmin', {
                    title: 'MT Rec - Liste des demandes Devenir Admin',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log(
                    "Demandes 'Devenir Admin' non trouvees ou liste vide. - (GET /demande/demandeDevenirAdmin)"
                );

                res.render('../views/admin/listeDemandesDevenirAdmin', {
                    title: 'MT Rec - Liste des demandes Devenir Admin',
                    demandes: [], // renvoyer une liste vide
                    status: 'success'
                });
            }
        });
    } catch (error) {
        console.log(
            'Echec de la lecture des demandes de devenir admin: ' +
                error +
                ' - (GET /demande/demandeDevenirAdmin)'
        );

        res.render('../views/admin/listeDemandesDevenirAdmin', {
            title: 'MT Rec - Liste des demandes Devenir Admin',
            demandes: [], // renvoyer une liste vide
            error: 'Echec de la lecture des demandes de devenir admin.',
            status: 'error'
        });
    }
});

// Accepter une demande de devenir admin
router.post('/accept/:id', function (req, res) {
    try {
        const idRequest = req.params.id;
        // const idRequest = req.body.idRequest;
        // const idUser = req.body.idUser;
        const email = req.session.mail;
        const NEEDED_USER_TYPE = 'Administrateur';

        userModel.updateUserType(email, NEEDED_USER_TYPE, function (success) {
            if (success) {
                console.log(
                    "Mise a jour du type de l'utilisateur(" +
                        email +
                        ") en 'Administrateur' effectuee. - (POST /admin/listeDemandesDevenirAdmin/accept/:id)"
                );

                requestModel.acceptDemandeDevenirAdmin(
                    idRequest,
                    function (success) {
                        if (success) {
                            console.log(
                                'Acceptation de la demande de devenir admin effectuee. - (POST /admin/listeDemandesDevenirAdmin/accept/:id)'
                            );

                            res.status(200).json({
                                message: 'Demande acceptee avec succes.',
                                status: 'success'
                            });
                        } else {
                            console.log(
                                "Echec de l'acceptation de la demande de devenir admin. - (POST /admin/listeDemandesDevenirAdmin/accept/:id)"
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
                    "Echec de la mise a jour du type de l'utilisateur(" +
                        email +
                        ") en 'Administrateur'. - (POST /admin/listeDemandesDevenirAdmin/accept/:id)"
                );

                res.status(500).json({
                    error: "Echec de l'acceptation de la demande.",
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log(
            "Echec de l'acceptation de la demande de devenir admin: " +
                error +
                '. - (POST /admin/listeDemandesDevenirAdmin/accept/:id)'
        );

        res.status(500).json({
            error: "Echec de l'acceptation de la demande.",
            status: 'error'
        });
    }
});

// Refuser une demande de devenir admin
router.post('/refuse/:id', function (req, res) {
    try {
        const idRequest = req.params.id;

        requestModel.refuseDemandeDevenirAdmin(idRequest, function (success) {
            if (success) {
                console.log(
                    'Refus de la demande de devenir admin effectuee. - (POST /admin/listeDemandesDevenirAdmin/refuse/:id)'
                );

                res.status(200).json({
                    message: 'Demande refusee avec succes.',
                    status: 'success'
                });
            } else {
                console.log(
                    'Echec du refus de la demande de devenir admin. - (POST /admin/listeDemandesDevenirAdmin/refuse/:id)'
                );

                res.status(500).json({
                    error: 'Echec du refus de la demande.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log(
            'Echec du refus de la demande de devenir admin: ' +
                error +
                '. - (POST /admin/listeDemandesDevenirAdmin/refuse/:id)'
        );

        res.status(500).json({
            error: 'Echec du refus de la demande.',
            status: 'error'
        });
    }
});

// GET route for /admin/listeDemandesDevenirAdmin/pending inspired by /demande/demandeDevenirAdmin/pending
router.get('/pending', function (req, res) {
    try {
        requestModel.readallDemandeDevenirAdminPending(function (result) {
            if (result) {
                console.log(
                    'Lecture des demandes de devenir admin en attente effectuee. ' +
                        result +
                        ' - (GET /admin/listeDemandesDevenirAdmin/pending)'
                );

                res.render('demande', {
                    // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log(
                    'Erreur lors de la lecture des demandes de devenir admin en attente. - (GET /admin/listeDemandesDevenirAdmin/pending)'
                );

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log(
            'Echec de la lecture des demandes de devenir admin en attente: ' +
                error +
                '. - (GET /admin/listeDemandesDevenirAdmin/pending)'
        );

        res.status(500).json({
            error: 'Echec de la lecture des demandes de devenir admin en attente.',
            status: 'error'
        });
    }
});

// GET route for /admin/listeDemandesDevenirAdmin/notpending inspired by /demande/demandeDevenirAdmin/notpending
router.get('/notpending', function (req, res) {
    try {
        requestModel.readallDemandeDevenirAdminNotPending(function (result) {
            if (result) {
                console.log(
                    'Lecture des demandes de devenir admin non en attente effectuee. ' +
                        result +
                        ' - (GET /admin/listeDemandesDevenirAdmin/notpending)'
                );

                res.render('demande', {
                    // TODO: setup the right view
                    title: 'Liste des demandes',
                    demandes: result,
                    status: 'success'
                });
            } else {
                console.log(
                    'Erreur lors de la lecture des demandes de devenir admin non en attente. - (GET /admin/listeDemandesDevenirAdmin/notpending)'
                );

                res.status(404).json({
                    error: 'Aucune demande trouvee.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log(
            'Echec de la lecture des demandes de devenir admin non en attente: ' +
                error +
                '. - (GET /admin/listeDemandesDevenirAdmin/notpending)'
        );

        res.status(500).json({
            error: 'Echec de la lecture des demandes de devenir admin non en attente.',
            status: 'error'
        });
    }
});

module.exports = router;
