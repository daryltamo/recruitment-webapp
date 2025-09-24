const express = require('express');
const router = express.Router();
const requestModel = require('../../model/request');

router.get('/', function (req, res) {
    res.render('../views/recruteur/devenirAdminForm', {
        title: 'MT Rec - Formulaire Devenir Admin'
    });
});

// POST route for /recruteur/devenirAdmin inspired by POST route for /demande/demandeDevenirAdmin
router.post('/', function (req, res) {
    try {
        const idUser = req.session.idUser;
        const raison = req.body.raison;

        requestModel.createDemandeDevenirAdmin(
            idUser,
            raison,
            function (success) {
                if (success) {
                    console.log(
                        'Demande de devenir admin ajoutee avec succes. - (POST /recruteur/devenirAdmin)'
                    );

                    res.status(201).json({
                        message: 'Demande ajoutee avec succes.',
                        status: 'success'
                    });
                } else {
                    console.log(
                        "Echec de l'ajout de la demande de devenir admin. - (POST /recruteur/devenirAdmin)"
                    );

                    res.status(500).json({
                        error: "Echec de l'ajout de la demande de devenir admin.",
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        console.log(
            "Echec de l'ajout de la demande de devenir admin: " +
                error +
                '. - (POST /recruteur/devenirAdmin)'
        );

        res.status(500).json({
            error: "Echec de l'ajout de la demande de devenir admin.",
            status: 'error'
        });
    }
});

module.exports = router;
