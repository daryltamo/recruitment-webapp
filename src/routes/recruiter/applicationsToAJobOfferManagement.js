const express = require('express');
const router = express.Router();
var candidatureModel = require("../../model/candidature");
const { stat } = require('fs');

router.get ('/', function(req, res) {
    // rediriger vers la des offres  (coté recruteur : /recruteur/gestionOffresRecruteur) parce qu'il faut utiliser la routes /recruteur/gestionCandAUneOffre/:id_offre_demploi qui précise sur quelle offre on veut candidater
    // on pourrait faire mieux: si le numéro de l'offre est dans la session, on le récupère et on affiche la vue ../views/recruteur/gestionCandAUneOffre
    
    const id_offre_demploi = req.params.num_offre;

    if(id_offre_demploi == null) {
        console.log("Erreur: id_offre_demploi est null. - (/recruteur/gestionCandAUneoffre/)");

        res.redirect("/recruteur/gestionOffresRecruteur");
    } else {
        candidatureModel.readallforOffer(id_offre_demploi, function(results) {
            if (results) {
                console.log("Lecture des candidatures pour offreDemploi(id_offredemploi= " + num_offre + ") reussie. - (/recrruteur/gestionCandAUneoffre/)");
                
                res.render('../views/recrruteur/gestionCandAUneoffre/', {
                    title: 'Liste des candidatures pour offreDemploi' + num_offre,
                    message: 'Candidature lues avec succes',
                    candidatures: results,
                });
            } else {
                console.log("Echec de la lecture des candidatures pour offreDemploi(id_offredemploi= " + num_offre + "). - (/recrruteur/gestionCandAUneoffre/)");
                
                res.status(404).json({
                    error: 'Echec de la suppression de la candidature',
                    status: 'error',
                });
            }
        });
    }
});

router.get('/:num_offre', function(req, res) {
    const id_offre_demploi = req.params.num_offre;

    candidatureModel.readallforOffer(id_offre_demploi, function(results) {
        if (results) {
            console.log("Lecture des candidatures pour offreDemploi(id_offredemploi= " + num_offre + ") reussie. - (/recrruteur/gestionCandAUneoffre/:num_offre)");
            
            res.render('../views/recrruteur/gestionCandAUneoffre/', {
                title: 'Liste des candidatures pour offreDemploi' + num_offre,
                message: 'Candidature lues avec succes',
                candidatures: results,
            });
        } else {
            console.log("Echec de la lecture des candidatures pour offreDemploi(id_offredemploi= " + num_offre + "). - (/recrruteur/gestionCandAUneoffre/:num_offre)");
            
            res.status(404).json({
                error: 'Echec de la suppression de la candidature',
                status: 'error',
            });
        }
    });
});


router.delete('/:num_offre', function(req, res) {

    const id_candidat = req.session.id_utilisateur;
    const num_offre = req.params.num_offre;

    candidatureModel.delete(id_candidat, num_offre, function(result) {
        if (result) {
            res.status(200).json({
                message: 'Candidature supprimee',
                status: 'success',
            });
        } else {
            res.status(404).json({
                error: 'Echec de la suppression de la candidature',
                status: 'error',
            });
        }
    });
});



module.exports = router;
