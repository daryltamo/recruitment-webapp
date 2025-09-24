const express = require('express');
const router = express.Router();
const organizationModel = require('../../model/organization');
const requestModel = require('../../model/request');

router.get('/', function (req, res) {
    try {
        organizationModel.readall(function (result) {
            if (result) {
                console.log(
                    'Lecture des organisations effectuee avec succes. - (GET /recruteur/demandeRejoindreOrg/)'
                );

                res.render('../views/recruteur/demandeRejoindreOrgForm', {
                    title: 'MT Rec - Demande de rejoindre une organisation',
                    organisations: result,
                    status: 'success'
                });
            } else {
                console.log(
                    'Organisations non trouvees. - (GET /recruteur/demandeRejoindreOrg/)'
                );

                res.render('../views/recruteur/demandeRejoindreOrgForm', {
                    title: 'MT Rec - Demande de rejoindre une organisation',
                    organisations: [],
                    error: 'Aucune organisation trouvée. Vous pouvez demander à en creer une !',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log('Error occurred: ' + error);

        res.render('../views/recruteur/demandeRejoindreOrgForm', {
            title: 'MT Rec - Demande de rejoindre une organisation',
            organisations: [],
            error: 'Une erreur est survenue !',
            status: 'error'
        });
    }
});

// POST route for /recruteur/demandeRejoindreorg/ inspired from /demande/demandeRejoindreOrg
router.post('/', function (req, res) {
    try {
        const idUser = req.session.idUser;
        const idOrganization = req.body.sirenOrg;
        const nameOrg = req.body.nameOrg;
        const raison = req.body.raison;

        requestModel.createDemandeJoindreOrg(
            idUser,
            idOrganization,
            nameOrg,
            raison,
            function (success) {
                if (success) {
                    console.log(
                        'Demande de rejoindre une organisation ajoutee avec succes. - (POST /recruteur/demandeRejoindreorg/)'
                    );

                    res.status(201).json({
                        message: 'Demande ajoutee avec succes.',
                        status: 'success'
                    });
                } else {
                    console.log(
                        "Echec de l`'ajout de la demande de rejoindre une organisation. - (POST /recruteur/demandeRejoindreorg/)"
                    );

                    res.status(500).json({
                        error: "Echec de l'ajout de la demande de rejoindre une organisation.",
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        console.log(
            "Echec de l'ajout de la demande de rejoindre une organisation: " +
                error +
                '. - (POST /recruteur/demandeRejoindreorg/)'
        );

        res.status(500).json({
            error: "Echec de l'ajout de la demande de rejoindre une organisation.",
            status: 'error'
        });
    }
});

// POST route for /recruteur/demandeRejoindreorg/addDemande inspired from /demande/demandeRejoindreOrg
router.post('/addDemande', function (req, res) {
    try {
        const idUser = req.session.idUser;
        const idOrganization = req.body.sirenOrg;
        const nameOrg = req.body.nameOrg;
        const raison = req.body.raison;

        requestModel.createDemandeJoindreOrg(
            idUser,
            idOrganization,
            nameOrg,
            raison,
            function (success) {
                if (success) {
                    console.log(
                        'Demande de rejoindre une organisation ajoutee avec succes. - (POST /recruteur/demandeRejoindreorg/)'
                    );

                    res.status(201).json({
                        message: 'Demande ajoutee avec succes.',
                        status: 'success'
                    });
                } else {
                    console.log(
                        "Echec de l'ajout de la demande de rejoindre une organisation. - (POST /recruteur/demandeRejoindreorg/)"
                    );

                    res.status(500).json({
                        error: "Echec de l'ajout de la demande de rejoindre une organisation.",
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        console.log(
            "Echec de l'ajout de la demande de rejoindre une organisation: " +
                error +
                '. - (POST /recruteur/demandeRejoindreorg/)'
        );

        res.status(500).json({
            error: "Echec de l'ajout de la demande de rejoindre une organisation.",
            status: 'error'
        });
    }
});

// PUT route for /demande/demandeRejoindreOrg/:id
router.put('/demandeRejoindreOrg/:id', function (req, res) {
    try {
        const idRequest = req.params.id;
        const idUser = req.session.idUser;
        const sirenTargetOrg = req.body.sirenOrg;
        const nameTargetOrg = req.body.nameOrg;
        const raison = req.body.raison;

        requestModel.updateDemandeJoindreOrg(
            idRequest,
            idUser,
            sirenTargetOrg,
            nameTargetOrg,
            raison,
            function (succes) {
                if (succes) {
                    console.log(
                        "Modification de la demande de rejoindre une organisation d'organisation effectuee. - (PUT /demande/demandeRejoindreOrg/:id)"
                    );

                    res.status(200).json({
                        message:
                            'Demande de rejoindre une organisation modifiée avec succès.',
                        status: 'success'
                    });
                } else {
                    console.log(
                        "Echec de la modification de la demande de rejoindre une organisation d'organisation effectuee: Aucune demande trouvee / Echec de la requete SQL. - (PUT /demande/demandeRejoindreOrg/:id)"
                    );

                    res.status(500).json({
                        error: 'Echec de la modification de la demande de rejoindre une organisation.',
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        console.log(
            'Echec de la modification de la demande de rejoindre une organisation: ' +
                error +
                '. - (PUT /demande/demandeRejoindreOrg/:id)'
        );

        res.status(500).json({
            error: 'Echec de la modification de la demande de rejoindre une organisation.',
            status: 'error'
        });
    }
});

// DELETE route for /recruteur/demandeRejoindreorg/:id inspired from /demande/demandeRejoindreOrg/:id
router.delete('/:id', function (req, res) {
    try {
        const idRequest = req.params.id;

        requestModel.deleteDemandeJoindreOrg(idRequest, function (success) {
            if (success) {
                console.log(
                    'Suppression de la demande de rejoindre une organisation effectuee. - (DELETE /recruteur/demandeRejoindreorg/:id)'
                );

                res.status(200).json({
                    message: 'Demande supprimee avec succes.',
                    status: 'success'
                });
            } else {
                console.log(
                    'Echec de la suppression de la demande de rejoindre une organisation. - (DELETE /recruteur/demandeRejoindreorg/:id)'
                );

                res.status(500).json({
                    error: 'Echec de la suppression de la demande de rejoindre une organisation.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log(
            'Echec de la suppression de la demande de rejoindre une organisation: ' +
                error +
                '. - (DELETE /recruteur/demandeRejoindreorg/:id)'
        );

        res.status(500).json({
            error: 'Echec de la suppression de la demande de rejoindre une organisation.',
            status: 'error'
        });
    }
});

module.exports = router;
