var express = require('express');
var router = express.Router();
var utilisateurModel = require("../../model/utilisateur");

router.get('/', function(req, res) {
    utilisateurModel.readall(function(result) {
        if (result) {
            res.render('../views/admin/gestionUtilisateurs', {
                title: 'MT Rec - Gestion des utilisateurs',
                users: result,
            });
        } else {
            res.status(404).json({
                error: 'Aucun utilisateur trouve.',
            });
        }
    });

});



module.exports = router;

