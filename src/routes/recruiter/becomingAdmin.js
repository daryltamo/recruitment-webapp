var express = require('express');
var router = express.Router();
const demandeModel = require("../../model/demande");

router.get('/', function(req, res) {
    res.render('../views/recruteur/devenirAdminForm', {
        title: 'MT Rec - Formulaire Devenir Admin',
    });
});

// POST route for /recruteur/devenirAdmin inspired by POST route for /demande/demandeDevenirAdmin
router.post('/', function(req, res) {
    try {
        const id_utilisateur = req.session.id_utilisateur;
        const raison = req.body.raison;
    
        demandeModel.createDemandeDevenirAdmin(id_utilisateur, raison, function(success) {
            if (success) {
                console.log("Demande de devenir admin ajoutee avec succes. - (POST /recruteur/devenirAdmin)");

                res.status(201).json({
                    message: "Demande ajoutee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de l'ajout de la demande de devenir admin. - (POST /recruteur/devenirAdmin)");

                res.status(500).json({
                    error: "Echec de l'ajout de la demande de devenir admin.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de l'ajout de la demande de devenir admin: " + error + ". - (POST /recruteur/devenirAdmin)");

        res.status(500).json({
            error: "Echec de l'ajout de la demande de devenir admin.",
            status: 'error',
        });
    }
});



module.exports = router;
