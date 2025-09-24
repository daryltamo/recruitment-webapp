var express = require('express');
var router = express.Router();
var candidatureModel = require("../../model/candidature");

router.get('/:id_candidat/:id_offre_demploi', function(req, res) {
    try {
        
        const id_candidat = req.params.id_candidat;
        const id_offre_demploi = req.params.id_offre_demploi;

        candidatureModel.read(id_candidat, id_offre_demploi, function(result) {
            if (result) {
                res.render('../views/recruteur/detailCandidatureRecruteur', {
                    title: 'MT Rec - Detail de la candidature',
                    candidature: result,
                    message: 'Candidature trouvee',
                });
            } else {
                res.status(404).json({
                    error: 'Candidature non trouvee.',
                });
            }
        });

    } catch (error) {
        console.log("Erreur lors de la récupération de la candidature. - (GET /recruteur/detailCandidatureRecruteur/:id_candidat/:id_offre_demploi)");

        res.status(500).json({
            error: "Erreur lors de la récupération de la candidature",
            status: "error"

        });
    }

});



module.exports = router;