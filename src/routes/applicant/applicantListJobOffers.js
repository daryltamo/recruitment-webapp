const express = require('express');
const router = express.Router();
const jobOfferModel = require('../../model/jobOffer');

router.get('/', function (req, res) {
    jobOfferModel.readallPublished(function (results) {
        if (results) {
            res.render('../views/candidat/listeOffres', {
                title: 'MT Rec - Liste des offres',
                offers: results,
                message: 'Offres trouvées'
            });
        } else {
            res.render('../views/candidat/listeOffres', {
                title: 'MT Rec - Liste des offres',
                offers: [],
                message: 'Aucune offre'
            });
        }
    });
});

module.exports = router;
