var express = require('express');
var router = express.Router();
var candidatureModel =require("../model/candidature");

// GET route for /candidature
router.get('/', function(req, res) {
    try {
        candidatureModel.readall(function(result) {
            if (result) {
                res.render('candidature', {
                    title: 'Liste des candidatures',
                    candidatures: result
                });
            } else {
                res.status(404).json({
                    error: 'Aucune candidature trouvee.',
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            error: 'Echec de la lecture des candidatures.',
        });
        console.log('Echec de la lecture des candidatures: ' + error);
    }
});

// GET route for /candidature/:id_candidat
router.get('/candidat/:id_candidat', function(req, res, next) {
    try {
        const id_candidat = req.params.id_candidat;

        candidatureModel.readallforCandidat(id_candidat, function(result) {
            if (result) {
                res.render('candidature-details', {
                    title: 'Détails de la candidature du canidat' + id_candidat,
                    candidature: result 
                });
            } else {
                res.status(404).json({
                    error: "Candidature non trouvee.",
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            error: "Echec de la lecture de la candidature.",
        });
        console.log("Echec de la lecture (read) de la candidature (id= " + id + "): " + error);
    }
});

// GET route for /candidature/:id_offre_demploi
router.get('/offre/:id_offre_demploi', function(req, res) {
    try {
        const id_offre_demploi = req.params.id_offre_demploi;

        candidatureModel.readallforOffer(id_offre_demploi, function(result) {
            if (result) {
                res.render('candidature', {
                    title: "Liste des candidatures pour l'offre d'emploi" + id_offre_demploi,
                    candidatures: result
                });
                console.log("Candidatures trouvees pour l'offre d'emploi " + id_offre_demploi + ".");
            } else {
                res.status(404).json({
                    error: "Aucune candidature trouvee pour l'offre d'emploi.",
                });
                console.log("Aucune candidature trouvee pour l'offre d'emploi " + id_offre_demploi + ".");
            }
        });
    } catch (error) {
        res.status(500).json({
            error: "Echec de la lecture des candidatures pour l'offre d'emploi.",
        });
        console.log("Echec de la lecture des candidatures pour l'offre d'emploi "+ id_offre_demploi + ": " + error);
    }
});


// POST route for /candidature
router.post('/addCandidature',  function (req, res) {
    try {
        const id_candidat = req.body.id_candidat;
        const id_offre_demploi = req.body.id_offre_demploi;
        const date_application = new Date();
        // const { id_applicant, id_jobOffer, date_application} = req.body;

        candidatureModel.create(id_applicant, id_jobOffer, function(success) {
            if (success) {
                res.status(201).json({
                    message: "Candidature ajoutee avec succes.",
                });
                console.log("Candidature(id_applicant=" + id_applicant + ", id_jobOffer=" + id_jobOffer + ", date_application" + date_application + ") ajoutee avec succes.");
            } else {
                res.status(500).json({
                    error: "Echec de l'ajout de la candidature.",
                });
                console.log("Echec de l'ajout de la candidature(id_applicant=" + id_applicant + ", id_jobOffer=" + id_jobOffer + ", date_application" + date_application + "): " + error);
            }
        });
    } catch (error) {
        res.status(500).json({
            error: "Echec de l'ajout de la candidature.",
        });
        console.log("Echec de l'ajout de la candidature(id_applicant=" + id_applicant + ", id_jobOffer=" + id_jobOffer + ", date_application" + date_application + "): " + error);
    }
});

// PUT route for /candidature/:id
router.put('/', function (req, res) {
    try {
        const id_candidat = req.body.id_candidat;
        const id_offre_demploi = req.body.id_offre_demploi;
        // const date_application = req.body.date_application;
        const date_application = new Date();

        candidatureModel.isApplicationValid(id_candidat, id_offre_demploi, function(isValid) {
            if(isValid === true) {
                candidatureModel.update(id_candidat, id_offre_demploi, date_application, function(success) {
                    if (success) {
                        res.json({
                            message: "Candidature modifiee avec succes.",
                        });
                        console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") modifiee avec succes.");
                    } else {
                        res.status(500).json({
                            error: "Echec de la modification de la candidature.",
                        });
                        console.log("Echec de la modification de la candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + "): " + error);
                    }
                });
            } else {
                res.status(404).json({
                    error: "Candidature non trouvee.",
                });
                console.log("Candidature (id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") non trouvee.");
            }
        });
    } catch (error) {
        res.status(500).json({
            error: "Echec de la modification de la candidature.",
        });
        console.log("Echec de la modification de la candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + "): " + error);
    }
});

// DELETE route for /candidature/:id
router.delete('/', function (req, res) {
    try {
        const id_candidat = req.body.id_candidat;
        const id_offre_demploi = req.body.id_offre_demploi;

        candidatureModel.isApplicationValid(id_candidat, id_offre_demploi, function(isValid) {
            if(isValid === true) {
                candidatureModel.delete(id_candidat, id_offre_demploi, function(success) {
                    if (success) {
                        res.json({
                            message: "Candidature supprimee avec succes.",
                        });
                        console.log("Candidature (id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") supprimee avec succes.");
                    } else {
                        res.status(500).json({
                            error: "Echec de la suppression de la candidature.",
                        });
                        console.log("Echec de la suppression de la candidature (id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + "): " + error);
                    }
                });
            } else {
                res.status(404).json({
                    error: "Candidature non trouvee.",
                });
                console.log("Candidature (id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") non trouvee.");
            }
        });
    } catch (error) {
        res.status(500).json({
            error: "Echec de la suppression de la candidature.",
        });
        console.log("Echec de la suppression de la candidature (id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + "): " + error);
    }
});

module.exports = router;
