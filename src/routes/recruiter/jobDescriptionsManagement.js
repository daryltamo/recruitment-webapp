var express = require('express');
var router = express.Router();
var ficheDePosteModel = require("../../model/ficheDePoste");

router.get('/', function(req, res) {
    try {
        const siren_org = req.session.id_organisation;
        ficheDePosteModel.readallInOrganisation(siren_org, function(results) {
            if (results) {
                console.log("Lecture des fiches de poste de l'organisation " + siren_org + " REUSSIE par l'utilisateur" + req.session.id_utilisateur + ". - (GET /recruteur/gestionFichesDePoste)");

                res.render('../views/recruteur/gestionFichesDePoste', {
                    title: 'MT Rec - Liste des fiches de poste de l\'organisation ' + siren_org,
                    fichesDePoste: results,
                    message: 'Fiches de poste trouvees',
                });
            } else {
                console.log("Lecture des fiches de poste de l'organisation " + siren_org + " ECHOUEE par l'utilisateur" + req.session.id_utilisateur + ": aucune fiche de poste trouvee. - (GET /recruteur/gestionFichesDePoste)");

                res.render('../views/recruteur/gestionFichesDePoste', {
                    title: 'MT Rec - Liste des fiches de poste de l\'organisation ' + siren_org,
                    fichesDePoste: [],
                    message: 'Aucune fiche de poste',
                });
            }
        });
    } catch (error) {
        console.log("Erreur lors de la lecture des fiches de poste de l'organisation " + siren_org + " : " + error + ". - (GET /recruteur/gestionFichesDePoste)");

        res.status(500).json({
            title: 'MT Rec - Liste des fiches de poste de l\'organisation ' + siren_org,
            fichesDePoste: [],
            error: "Erreur lors de la lecture des fiches de poste",
            status: "error",
        });
    }
});

router.get('/:siren_org', function(req, res) {
    const siren_org = req.params.siren_org;
    ficheDePosteModel.readallInOrganisation(siren_org, function(results) {
        if (results) {
            res.render('../views/recruteur/gestionFichesDePoste', {
                title: 'MT Rec - Liste des fiches de poste de l\'organisation ' + siren_org,
                fichesDePoste: results,
                message: 'Fiches de poste trouvees',
            });
        } else {
            res.render('../views/recruteur/gestionFichesDePoste', {
                title: 'MT Rec - Liste des fiches de poste de l\'organisation ' + siren_org,
                fichesDePoste: [],
                message: 'Aucune fiche de poste',
            });
        }
    });
});

router.post('/ficheDePoste', function(req, res) {
    try {
        const id_fichedeposte = req.body.id_fichedeposte
        const intitule = req.body.intitule;
        const id_organisation = req.body.id_organisation;

        // const id_fichedeposte = req.query.id_fichedeposte;
        // const intitule = req.query.intitule;
        // const id_organisation = req.query.id_organisation;


        ficheDePosteModel.readUsingId(id_fichedeposte, function(result) {
            if (result) {
                console.log("Lecture de la fiche de poste (id_fichedeposte= " + id_fichedeposte + ") pour modification REUSSIE par l'utilisateur" + req.session.id_utilisateur + ". - (GET /recruteur/gestionFichesDePoste//ficheDePoste/:id_fichedeposte/intitule=?&id_organisation=?)");

                res.status(200).json({
                    ficheDePoste: result,
                    message: "Fiche de poste trouvee",
                    status: "success",
                });
            } else {
                console.log("Lecture de la fiche de poste (id_fichedeposte= " + id_fichedeposte + ") pour modification ECHOUEE par l'utilisateur" + req.session.id_utilisateur + ": fiche de poste non trouvee. - (GET /recruteur/gestionFichesDePoste//ficheDePoste/:id_fichedeposte/intitule=?&id_organisation=?)");

                res.status(404).json({
                    ficheDePoste: [],
                    message: "Fiche de poste non trouvee",
                    status: "error",
                });
            }
        });
    } catch (error) {
        console.log("Lecture de la fiche de poste (id_fichedeposte= " + id_fichedeposte + ") pour modification ECHOUEE par l'utilisateur" + req.session.id_utilisateur + ": ERREUR: " + error + ". - (GET /recruteur/gestionFichesDePoste//ficheDePoste/:id_fichedeposte/intitule=?&id_organisation=?)");
    
        res.status(500).json({
            title: 'MT Rec - Liste des fiches de poste de l\'organisation ' + siren_org,
            ficheDePoste: [],
            error: "Erreur survenue lors de la lecture de la fiche de poste",
            status: "error",
        });
    }
});


router.put('/', function (req, res) {
    const intitule = req.body.intitule;
    const id_organisation = req.body.id_organisation;
    const statut_poste = req.body.statut_poste;
    const resp_hierarch = req.body.resp_hierarch;
    const type_metier = req.body.type_metier;
    const lieu_mission = req.body.lieu_mission;
    const rythme = req.body.rythme;
    const salaire = req.body.rythme;
    const description = req.body.description;

    ficheDePosteModel.update(intitule, id_organisation, statut_poste, resp_hierarch, type_metier, lieu_mission, rythme, salaire, description, function(success) {
        if (success) {
            res.json({
                message: "ficheDePoste modifiee avec succes",
                redirect: "/recruteur/listeFichesDePoste",
            });
        } else {
            res.status(500).json({
                message: "Erreur lors de la modification de la ficheDePoste",
            });
        }
    });
});

router.put('/updateFicheDePoste', function (req, res) {
    try {
        const id_fichedeposte = req.body.id_fichedeposte;
        const intitule = req.body.intitule;
        const id_organisation = req.body.id_organisation;
        const statut_poste = req.body.statut_poste;
        const resp_hierarch = req.body.resp_hierarch;
        const type_metier = req.body.type_metier;
        const lieu_mission = req.body.lieu_mission;
        const rythme = req.body.rythme;
        const salaire = req.body.salaire;
        const description = req.body.description;

        ficheDePosteModel.updateUsingId(id_fichedeposte, intitule, id_organisation, statut_poste, resp_hierarch, type_metier, lieu_mission, rythme, salaire, description, function(success) {
            if (success) {
                console.log("fiche de poste (id_fichedeposte= " + id_fichedeposte +") mise a jour avec succes. (PUT /recruteur/gestionFichesDePoste/updateFicheDePoste");

                res.status(200).json({
                    message: "Fiche de poste modifiee avec succes",
                    status: "success"
                });
            } else {
                console.log("Echec de la mise a jour de fiche de poste (id_fichedeposte= " + id_fichedeposte +") : fiche de poste non trouvee. (PUT /recruteur/gestionFichesDePoste/updateFicheDePoste");

                res.status(404).json({
                    error: "Erreur lors de la modification de la ficheDePoste",
                    status: "error"
                });
            }
        });
    } catch (error) {
        console.log("Erreur lors de la mise a jour de fiche de poste (id_fichedeposte= " + id_fichedeposte +") : " + error + ". (PUT /recruteur/gestionFichesDePoste/updateFicheDePoste");

        res.status(500).json({
            error: "Erreur lors de la modification de la ficheDePoste",
            status: "error"
        });
    }
});

router.put('/:id_fichedeposte', function (req, res) {
    try {
        const id_fichedeposte = req.params.id_fichedeposte;
        const intitule = req.body.intitule;
        const id_organisation = req.body.id_organisation;
        const statut_poste = req.body.statut_poste;
        const resp_hierarch = req.body.resp_hierarch;
        const type_metier = req.body.type_metier;
        const lieu_mission = req.body.lieu_mission;
        const rythme = req.body.rythme;
        const salaire = req.body.rythme;
        const description = req.body.description;

        ficheDePosteModel.update(intitule, id_organisation, statut_poste, resp_hierarch, type_metier, lieu_mission, rythme, salaire, description, function(success) {
            if (success) {
                console.log("fiche de poste (" + id_fichedeposte + ") mise a jour avec succes. - (PUT /recruteur/gestionFichesDePoste/:id_fichedeposte)");

                res.status(200).json({
                    message: "ficheDePoste supprimee avec succes",
                    status: "success"
                });
            } else {
                console.log("Echec de la mise a jour de fiche de poste (" + id_fichedeposte + ") : fiche de poste non trouvee. - (PUT /recruteur/gestionFichesDePoste/:id_fichedeposte)");
                
                res.status(500).json({
                    error: "Erreur lors de la mise a jour de la ficheDePoste: fiche de poste non trouvee",
                    status: "error"
                });
            }
        });
    } catch (error) {
        console.log("Erreur survenue lors de la mise a jour de fiche de poste (" + id_fichedeposte + ") : " + error + ". - (PUT /recruteur/gestionFichesDePoste/:id_fichedeposte)");
                
        res.status(500).json({
            error: "Erreur survenue lors de la mise a jour de la ficheDePoste",
            status: "error"
        });
    }
});



router.delete('/', function(req, res) {
    const intitule = req.body.intitule;
    const id_organisation = req.body.id_organisation;

    ficheDePosteModel.delete(intitule, id_organisation, function(success) {
        if (success) {
            res.json({
                message: "ficheDePoste supprimee avec succes",
                redirect: "/recruteur/listeFichesDePoste/",
            });
        } else {
            res.status(500).json({
                message: "Erreur lors de la suppression de la ficheDePoste",
            });
        }
    });

});

router.delete('/:id_fichedeposte', function(req, res) {
    try {
        const id_fichedeposte = req.params.id_fichedeposte;
        const intitule = req.body.intitule;
        const id_organisation = req.body.id_organisation;

        ficheDePosteModel.delete(intitule, id_organisation, function(success) {
            if (success) {
                console.log("fiche de poste (" + id_fichedeposte + ") supprimee avec succes. - (DELETE /recruteur/gestionFichesDePoste/:id_fichedeposte)");

                res.status(200).json({
                    message: "ficheDePoste supprimee avec succes",
                    status: "success"
                });
            } else {
                console.log("Echec de la suppression de fiche de poste (" + id_fichedeposte + ") : fiche de poste non trouvee. - (DELETE /recruteur/gestionFichesDePoste/:id_fichedeposte)");
                
                res.status(500).json({
                    error: "Erreur lors de la suppression de la ficheDePoste: fiche de poste non trouvee",
                    status: "error"
                });
            }
        });
    } catch(error) {
        console.log("Erreur survenue lors de la suppression de fiche de poste (" + id_fichedeposte + ") : " + error + ". - (DELETE /recruteur/gestionFichesDePoste/:id_fichedeposte)");
                
        res.status(500).json({
            error: "Erreur survenue lors de la suppression de la ficheDePoste",
            status: "error"
        });
    }
});



module.exports = router;
