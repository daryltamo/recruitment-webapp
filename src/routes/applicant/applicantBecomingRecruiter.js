const express = require('express');
const router = express.Router();
const organizationModel = require('../../model/organization');
const requestModel = require('../../model/request');

router.get('/', function (req, res) {
    try {
        organizationModel.readall(function (organisations) {
            if (organisations) {
                console.log(
                    'Lecture des organisations effectuee avec succes. - (GET /candidat/devenirRecruteur)'
                );

                res.render('../views/candidat/devenirRecruteurForm', {
                    title: 'MT Rec - Formulaire Devenir Recruteur',
                    organisations: organisations,
                    status: 'success'
                });
            } else {
                console.log(
                    'Erreur lors de la lecture des organisations. - (GET /candidat/devenirRecruteur)'
                );

                res.render('../views/candidat/devenirRecruteurForm', {
                    title: 'MT Rec - Formulaire Devenir Recruteur',
                    organisations: [],
                    error: 'Aucune organisation trouvee. Vous pouvez demander a devenir recruteur pour en créer une !',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log(
            "Erreur lors de l'affichage du formulaire de demande de devenir recruteur: " +
                error +
                '. - (GET /candidat/devenirRecruteur)'
        );

        res.render('../views/candidat/devenirRecruteurForm', {
            title: 'MT Rec - Formulaire Devenir Recruteur',
            organisations: [],
            error: 'Une erreur est survenue !',
            status: 'error'
        });
    }
});

// POST route for /candidat/devenirRecruteur inspired by /demande/demandeDevenirRecruteur
router.post('/', function (req, res) {
    try {
        const idUser = req.session.idUser;
        const idOrganization = req.body.sirenOrg;
        const nameOrg = req.body.nameOrg;
        const raison = req.body.raison;

        requestModel.createDemandeDevenirRecruteur(
            idUser,
            idOrganization,
            nameOrg,
            raison,
            function (success) {
                if (success) {
                    console.log(
                        'Demande de devenir recruteur ajoutee avec succes. - (POST /candidat/devenirRecruteur)'
                    );

                    res.status(201).json({
                        message: 'Demande ajoutee avec succes.',
                        status: 'success'
                    });
                } else {
                    console.log(
                        "Echec de l'ajout de la demande de devenir recruteur. - (POST /candidat/devenirRecruteur)"
                    );

                    res.status(500).json({
                        error: "Echec de l'ajout de la demande de devenir recruteur.",
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        console.log(
            "Echec de l'ajout de la demande de devenir recruteur: " +
                error +
                '. - (POST /candidat/devenirRecruteur)'
        );

        res.status(500).json({
            error: "Echec de l'ajout de la demande de devenir recruteur.",
            status: 'error'
        });
    }
});

module.exports = router;
