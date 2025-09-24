var express = require('express');
var router = express.Router();
var offreDemploiModel = require("../../model/offreDemploi");
var candidatureModel = require("../../model/candidature");

router.get('/:num_offre', function(req, res) {
    const num_offre = req.params.num_offre;
    offreDemploiModel.readOfferWithLinkedDatas(num_offre, function(result) {
        if (result) {
            res.render('../views/candidat/detailOffreCandidat', {
                title: 'MT Rec - Detail Offre Candidat',
                offres: result,
            });
        } else {
            res.status(404).json({
                error: 'Aucune offre trouve.',
            });
        }
    });
});

router.post('/:num_offre', function(req, res) {
    const num_offre = req.params.num_offre;
    id_applicant = req.session.user.id;

    candidatureModel.create(id_applicant, num_offre, function(result) {
        if (result) {
            res.render('../views/candidat/candidatureAUneOffre', {
                title: 'MT Rec - Candidature a une offre',
                message: 'Candidature envoyee'
            });
        } else {
            res.render('../views/candidat/candidatureAUneOffre', {
                title: 'MT Rec - Candidature a une offre',
                message: 'Echec de la candidature'
            });
        }
    });
});

module.exports = router;