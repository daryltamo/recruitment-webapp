const express = require('express');
const router = express.Router();
const jobOfferModel = require('../../model/jobOffer');
const applicationModel = require('../../model/application');

router.get('/:offerNumber', function (req, res) {
    const offerNumber = req.params.offerNumber;
    jobOfferModel.readOfferWithLinkedDatas(offerNumber, function (result) {
        if (result) {
            res.render('../views/candidat/detailOffreCandidat', {
                title: 'MT Rec - Detail Offre Candidat',
                offres: result
            });
        } else {
            res.status(404).json({
                error: 'Aucune offre trouve.'
            });
        }
    });
});

router.post('/:offerNumber', function (req, res) {
    const offerNumber = req.params.offerNumber;
    const idApplicant = req.session.user.id;

    applicationModel.create(idApplicant, offerNumber, function (result) {
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
