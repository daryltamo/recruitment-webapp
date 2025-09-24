const express = require('express');
const router = express.Router();
const jobDescriptionModel = require('../../model/jobDescription');

// GET route for /ficheDePoste, affiche un formulaire pour la création d'une fiche de poste
router.get('/', function (req, res) {
    res.render('../views/recruteur/creationFicheDePoste');
});

// POST route for /ficheDePoste, ajoute une fiche de poste
router.post('/', function (req, res) {
    try {
        const jobTitle = req.body.jobTitle;

        // const idOrganization = req.body.idOrganization;
        const idOrganization = req.session.idOrganization;
        const statut_poste = req.body.statut_poste;
        const resp_hierarch = req.body.resp_hierarch;
        const jobType = req.body.jobType;
        const jobLocation = req.body.jobLocation;
        const rythme = req.body.rythme;
        const salary = req.body.salary;
        const description = req.body.description;

        jobDescriptionModel.create(
            jobTitle,
            idOrganization,
            statut_poste,
            resp_hierarch,
            jobType,
            jobLocation,
            rythme,
            salary,
            description,
            function (success) {
                if (success) {
                    res.redirect('/recruteur/gestionFichesDePoste');
                } else {
                    res.status(500).json({
                        error: "Echec de l'ajout de la fiche de poste",
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        res.status(500).json({
            error: "Erreur lors de l'ajout de la ficheDePoste",
            status: 'error'
        });
    }
});

router.post('/addFicheDePoste', function (req, res) {
    try {
        const jobTitle = req.body.jobTitle;

        // const idOrganization = req.body.idOrganization;
        const idOrganization = req.session.idOrganization;
        const statut_poste = req.body.statut_poste;
        const resp_hierarch = req.body.resp_hierarch;
        const jobType = req.body.jobType;
        const jobLocation = req.body.jobLocation;
        const rythme = req.body.rythme;
        const salary = req.body.salary;
        const description = req.body.description;

        jobDescriptionModel.create(
            jobTitle,
            idOrganization,
            statut_poste,
            resp_hierarch,
            jobType,
            jobLocation,
            rythme,
            salary,
            description,
            function (success) {
                if (success) {
                    console.log(
                        'Fiche de poste ajoutée avec succès. - (POST /recruteur/creationFicheDePoste/addFicheDePoste)'
                    );

                    res.status(200).json({
                        message: 'Fiche de poste ajoutée avec succès',
                        status: 'success'
                    });
                } else {
                    console.log(
                        "Echec de l'ajout de la fiche de poste. - (POST /recruteur/creationFicheDePoste/addFicheDePoste)"
                    );

                    res.status(500).json({
                        error: "Echec de l'ajout de la fiche de poste",
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        console.log(
            "Erreur lors de l'ajout de la ficheDePoste: " +
                error +
                '. - (POST /recruteur/creationFicheDePoste/addFicheDePoste)'
        );

        res.status(500).json({
            error: "Erreur lors de l'ajout de la ficheDePoste",
            status: 'error'
        });
    }
});

module.exports = router;
