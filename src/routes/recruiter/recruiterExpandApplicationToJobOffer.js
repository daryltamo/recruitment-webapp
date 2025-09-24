const express = require('express');
const router = express.Router();
const applicationModel = require('../../model/application');

router.get('/:idApplicant/:idJobOffer', function (req, res) {
    try {
        const idApplicant = req.params.idApplicant;
        const idJobOffer = req.params.idJobOffer;

        applicationModel.read(idApplicant, idJobOffer, function (result) {
            if (result) {
                res.render('../views/recruteur/detailCandidatureRecruteur', {
                    title: 'MT Rec - Detail de la candidature',
                    candidature: result,
                    message: 'Candidature trouvee'
                });
            } else {
                res.status(404).json({
                    error: 'Candidature non trouvee.'
                });
            }
        });
    } catch (error) {
        console.log(
            'Erreur lors de la récupération de la candidature. - (GET /recruteur/detailCandidatureRecruteur/:idApplicant/:idJobOffer)'
        );

        res.status(500).json({
            error: 'Erreur lors de la récupération de la candidature',
            status: 'error'
        });
    }
});

module.exports = router;
