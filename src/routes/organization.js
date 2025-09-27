var express = require('express');
var router = express.Router();
var organisationModel =require("../model/organisation");

// GET route for /organisation
router.get('/', function(req, res, next) {
    try {
        organisationModel.readall(function(result) {
            if (result) {
                console.log("organisation.js - GET route for /organisation:\n" + result);
                
                res.render('organisation', {
                    title: 'Liste des organisations',
                    organisations: result,
                    status: 'success',
                    message: 'Liste des organisations',
                });
            } else {
                console.log('Aucune organisation trouvee. - organisation.js - GET route for /organisation');

                res.status(404).json({
                    error: 'Aucune organisation trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log('Echec de la lecture des organisations: ' + error + ' - organisation.js - GET route for /organisation');

        res.status(500).json({
            error: 'Echec de la lecture des organisations.',
            status: 'error',
        });
    }
});

// GET route for /organisation/:id
router.get('/:siren_org', function(req, res, next) {
    try {
        const siren_org = req.params.siren_org;

        organisationModel.read(siren_org, function(result) {
            if (result) {
                console.log("organisation.js - GET route for /organisation/:siren_org  :\n" + result);
                
                res.status(200).json({
                    title: 'Details de l\'organisation',
                    organisation: result,
                    status: 'success',
                    message: 'Details de l\'organisation',
                });
            } else {
                console.log('Organisation non trouvee. - organisation.js - GET route for /organisation/:siren_org');

                res.status(404).json({
                    error: "Organisation non trouvee.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture (read) de l'organisation (id_organisation= " + id + "): " + error + " - organisation.js - GET route for /organisation/:siren_org");

        res.status(500).json({
            error: "Echec de la lecture de l'organisation.",
            status: 'error',
        });
    }
});

// POST route for /organisation
router.post('/addOrganisation', function (req, res, next){
    try {
        const {siren_org, nom_org, siege_social, type_assos} = req.body;

        organisationModel.create(siren_org, nom_org, siege_social, type_assos, function (success) {
            if (success) {
                res.json({
                    message: "Organisation ajoutee avec succes.",
                    status: 'success'
                });
                console.log("Organisation ajoutee avec succes.");
            } else {
                res.status(500).json({
                    error: "Echec d'ajout de l'organisation.",
                    status: 'error'
                });
                console.log("Echec d'ajout de l'organisation.");
            }
        });
    } catch (error) {
        res.status(500).json({
            error: "Echec d'ajout de l'organisation.",
            status: 'error'
        });
        console.log("Echec d'ajout de l'organisation: " + error);
    }
});


// PUT route for /organisation/:id
router.put('/:siren_org', function(req, res, next) {
    try {
        // const siren_org = req.params.siren_org;
        // const {siren_org, nom_org, siege_social, type_assos} = req.body;
    
        const siren_org  = req.params.siren_org;
    
        //const siren_org = req.body.siren_org;
        const nom_org = req.body.nom;
        const siege_social = req.body.siege_social;
        const type_assos = req.body.type_assos;

        organisationModel.update(siren_org, nom_org, siege_social, type_assos, function(success) {
            if (success) {
                console.log("Organisation mise a jour avec succes. - organisation.js - PUT route for /organisation/:siren_org");

                res.json({
                    message: "Organisation mise a jour avec succes.",
                    status: 'success'
                });
            } else {
                console.log("Echec de la mise a jour de l'organisation. - organisation.js - PUT route for /organisation/:siren_org");

                res.status(500).json({
                    error: "Echec de la mise a jour de l'organisation.",
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log("Echec de la mise a jour de l'organisation (id_organisation= " + id + "): " + error + " - organisation.js - PUT route for /organisation/:siren_org");

        res.status(500).json({
            error: "Echec de la mise a jour de l'organisation.",
            status: 'error'
        });
    }
});

// DELETE route for /organisation/:id
router.delete('/:siren_org', function(req, res, next) {
    try {
        const siren_org = req.params.siren_org;
        
        organisationModel.delete(siren_org, function(success) {
            if (success) {
                console.log("Organisation supprimee avec succes. - organisation.js - DELETE route for /organisation/:siren_org");

                res.json({
                    message: "Organisation supprimee avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Echec de la suppression de l'organisation. - organisation.js - DELETE route for /organisation/:siren_org");

                res.status(500).json({
                    error: "Echec de la suppression de l'organisation.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de la suppression de l'organisation (id_organisation= " + id + "): " + error + " - organisation.js - DELETE route for /organisation/:siren_org");

        res.status(500).json({
            error: "Echec de la suppression de l'organisation.",
            status: 'error',
        });
        
    }  
});



module.exports = router;
