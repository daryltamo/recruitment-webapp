const express = require('express');
const router = express.Router();
const requestModel = require('../../model/request');
// const userModel = require('../../model/user');

// router.get('/', function(req, res) {
//     userModel.readallRecruteur(function(result) {
//         if (result) {
//             res.render('../views/admin/gestionRecruteurs', {
//
//                 title: 'MT Rec - Gestion des recruteurs',
//                 recruteurs: result,
//             });
//         } else {
//             res.status(404).json({
//                 error: 'Aucun recruteur trouve.',
//             });
//         }
//     });

// });

router.get('/', function (req, res) {
    requestModel.readalldDemandeDevenirRecruteur(function (result) {
        if (result) {
            res.render('../views/admin/gestionRecruteurs', {
                title: 'MT Rec - Gestion des demandes de devenir recruteur',
                demandes: result
            });
        } else {
            res.status(404).json({
                error: 'Aucune demande trouve.'
            });
        }
    });
});

router.get('/demandeDevenirRecruteur', function (req, res) {
    requestModel.readalldDemandeDevenirRecruteur(function (result) {
        if (result) {
            res.render('../views/admin/gestionRecruteurs', {
                title: 'MT Rec - Gestion des demandes de devenir recruteur',
                demandes: result
            });
        } else {
            res.status(404).json({
                error: 'Aucune demande trouve.'
            });
        }
    });
});

module.exports = router;
