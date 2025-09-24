const express = require('express');
const router = express.Router();
var offreDemploiModel =require("../../model/offreDemploi");
var ficheDePosteModel = require("../../model/ficheDePoste");


router.get('/', function(req, res) {
    try {
        ficheDePosteModel.readall(function(fiches) {
            if(fiches) {
                console.log(fiches.length + " fiches de poste recuperees lors de la lecture des offre d'emploi par l'utilisteur " + req.session.id_utilisateur + ". - (GET /recruteur/gestionOffresRecruteur/)");
                
                offreDemploiModel.readall(function(result) {
                    if (result) {
                        result = result.filter(element => element.id_recruteur === req.session.id_utilisateur);

                        console.log(result.length + "offres d'emploi recuperees pour le recruteur " + req.session.id_utilisateur + ". - (GET /recruteur/gestionOffresRecruteur)");

                        res.render('../views/recruteur/gestionOffresRecruteur', {
                            title: "MT Rec - Gestion des offres",
                            offres: result,
                            fichesDePoste: fiches,
                            status: "success"
                        });
                    } else {
                        console.log("Aucune offre trouvee pour le recruteur " + req.session.id_utilisateur + ". - (GET /recruteur/gestionOffresRecruteur)");

                        res.render('../views/recruteur/gestionOffresRecruteur', {
                            title: "MT Rec - Gestion des offres",
                            offres: [],
                            fichesDePoste: fiches,
                            error: "Aucune offre trouvee.",
                            status: "error"
                        });
                    }
                });
            } else {
                console.log("Aucune fiche de poste recuperee lors de la lecture des offre d'emploi par l'utilisteur " + req.session.id_utilisateur + ". - (GET /recruteur/gestionOffresRecruteur/:num_offre)");
                
                res.render('../views/recruteur/gestionOffresRecruteur', {
                    title: "MT Rec - Gestion des offres",
                    offres: [],
                    fichesDePoste: [],
                    error: "Aucune fiche de poste trouvee.",
                    status: "error"
                });
            }
        });
    } catch (error) {
        console.log("Echec de la lecture des offres pour le recruteur : " + error + " - (GET /recruteur/gestionOffresRecruteur)");

        res.render('../views/recruteur/gestionOffresRecruteur', {
            title: "MT Rec - Gestion des offres",
            offres: [],
            fichesDePoste: [],
            error: "Echec de la lecture des offres/fiches de poste.",
            status: "error"
        });
    }
});


router.get('/:num_offre', function(req, res) {
    try {
        const num_offre = req.params.num_offre;

        ficheDePosteModel.readall(function(fiches) {
            if(fiches) {
                console.log(fiches.length + " fiches de poste recuperees pour modification de l'offre d'emploi (num_offre" + num_offre + ") par l'utilisteur " + req.session.id_utilisateur + ". - (GET /recruteur/gestionOffresRecruteur/:num_offre)");
                
                offreDemploiModel.read(num_offre, function(result) {
                    if (result) { 
                        console.log("offre d'emploi (num_offre" + num_offre + ") recuperee pour le recruteur " + req.session.id_utilisateur + " pour modification. - (GET /recruteur/gestionOffresRecruteur/:num_offre)");
        
                        res.status(200).json({
                            title: "MT Rec - Gestion des offres",
                            offre: result,
                            fichesDePoste: fiches,
                            status: "success"
                        });
                    } else {
                        console.log("offre d'emploi (num_offre" + num_offre + ") non trouvee pour le recruteur " + req.session.id_utilisateur + ". - (GET /recruteur/gestionOffresRecruteur/:num_offre)");
        
                        res.status(200).json({
                            title: "MT Rec - Gestion des offres",
                            offre: [],
                            fichesDePoste: fiches,
                            error: "offre (num_offre " + num_offre + ") non trouvee !",
                            status: "error"
                        });
                    }
                });
            } else {
                console.log("Aucune fiche de poste recuperee pour modification de l'offre d'emploi (num_offre" + num_offre + ") par l'utilisteur " + req.session.id_utilisateur + ". - (GET /recruteur/gestionOffresRecruteur/:num_offre)");
                
                res.status(200).json({
                    title: "MT Rec - Gestion des offres",
                    offre: [],
                    fichesDePoste: [],
                    error: "Aucune fiche de poste trouvee!",
                    status: "error"
                });
            }
        });
        
    } catch (error) {
        console.log("Echec de la lecture de offre d'emploi (num_offre" + num_offre + ") pour le recruteur : " + error + ". - (GET /recruteur/gestionOffresRecruteur/:num_offre)");

        res.status(200).json({
            title: "MT Rec - Gestion des offres",
            offre: [],
            fichesDePoste: [],
            error: "Echec de la lectur de l\'offre ou des fiches de poste !",
            status: "error"
        });
    }
});


// PUT route for /offreDemploi, modifie une offre d'emploi
router.put('/:num_offre', function(req, res) {
    try {
        const num_offre = req.params.num_offre;

        const date_validite = req.body.date_validite;
        const indication = req.body.indication;
        const num_docs_req = req.body.num_docs_req;
        const etat = req.body.etat;
        const id_recruteur = req.session.id_utilisateur;

        offreDemploiModel.update(num_offre, date_validite, indication, num_docs_req, etat, id_recruteur, function(success) {
            if (success) {
                console.log("offreDemploi modifiee avec succes. - (PUT /recruteur/gesionOffresRecruteur/:num_offre)");

                res.status(200).json({
                    message: "offreDemploi modifiee avec succes",
                    status: "success",
                })
            } else {
                console.log("Erreur lors de la modification de l'offreDemploi. - (PUT /recruteur/gesionOffresRecruteur/:num_offre)");

                res.status(500).json({
                    error: "Erreur lors de la modification de l'offreDemploi",
                    status: "error",
                });
            }
        });
    } catch (error) {
        console.log("Erreur lors de la modification de l'offreDemploi: " + error + ". - (PUT /recruteur/gesionOffresRecruteur/:num_offre)");

        res.status(500).json({
            error: "Erreur lors de la modification de l'offreDemploi",
            status: "error",
        });
    }
});


// DELETE route for /offreDemploi/:num, supprime une offre d'emploi
router.delete('/:num', function(req, res) {
    try {
        const num_offre = req.params.num;

        console.log(num_offre)

        offreDemploiModel.delete(num_offre, function(result) {
            if (result) {
                console.log("Offre supprimee. - (DELETE /recruteur/gestionOffresRecruteur)");

                res.status(200).json({
                    message: 'Offre supprimee',
                    redirect: "/recruteur/gestionOffresRecruteur",
                    status:"success"
                });
            } else {
                console.log("Echec de la suppression de l'offre. - (DELETE /recruteur/gestionOffresRecruteur)");

                res.status(404).json({
                    error: "Offre non trouvee",
                    status: "error",
                });
            }
        });
    } catch(error) {
        console.log("Echec de la suppression de l'offre: " + error + ". - (DELETE /recruteur/gestionOffresRecruteur)");

        res.status(500).json({
            error: "Echec de la suppression de l\'offre",
            status: "error",
        });
    }
});





module.exports = router;

