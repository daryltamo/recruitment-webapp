const express = require('express');
const router = express.Router();
const userModel = require('../../model/user');

router.get('/', function (req, res) {
    userModel.readall(function (result) {
        if (result) {
            res.render('../views/admin/gestionUtilisateurs', {
                title: 'MT Rec - Gestion des utilisateurs',
                users: result
            });
        } else {
            res.status(404).json({
                error: 'Aucun utilisateur trouve.'
            });
        }
    });
});

module.exports = router;
