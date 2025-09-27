var express = require('express');
var router = express.Router();
utilisateurModel = require("../../model/utilisateur");
demandeModel = require("../../model/demande");



// router.get('/', function(req, res) {
//     utilisateurModel.readallRecruteur(function(result) {
//         if (result) {
//             res.render('../views/admin/gestionRecruteurs', {
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

router.get('/', function(req, res) {
    demandeModel.readalldDemandeDevenirRecruteur(function(result) {
        if (result) {
            res.render('../views/admin/gestionRecruteurs', {
                title: 'MT Rec - Gestion des demandes de devenir recruteur',
                demandes: result,
            });
        } else {
            res.status(404).json({
                error: 'Aucune demande trouve.',
            });
        }
    });

});



router.get('/demandeDevenirRecruteur', function(req, res) {
    demandeModel.readalldDemandeDevenirRecruteur(function(result) {
        if (result) {
            res.render('../views/admin/gestionRecruteurs', {
                title: 'MT Rec - Gestion des demandes de devenir recruteur',
                demandes: result,
            });
        } else {
            res.status(404).json({
                error: 'Aucune demande trouve.',
            });
        }
    });

});

module.exports = router;
