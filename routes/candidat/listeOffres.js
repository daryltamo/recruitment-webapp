var express = require("express");
var router = express.Router();
var offreDemploiModel = require("../../model/offreDemploi");

router.get('/', function(req, res) {
    offreDemploiModel.readallPublished(function(results) {
        if (results) {
            res.render('../views/candidat/listeOffres', {
                title: 'MT Rec - Liste des offres',
                offers: results,
                message: 'Offres trouvées',
            });
        } else {
            res.render('../views/candidat/listeOffres', {
                title: 'MT Rec - Liste des offres',
                offers: [],
                message: 'Aucune offre',
            });
        }
    });
});



module.exports = router;

