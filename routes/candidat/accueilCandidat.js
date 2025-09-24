var express = require('express');
var router = express.Router();
var offre = require('../../model/offreDemploi.js');

router.get('/', function(req, res) {

    try{
        console.log("Accueil candidat");
        offre.readOffersWithLinkedDatas(function(result){
            res.render('../views/candidat/accueilCandidat', {
                title: 'MT Rec - Accueil Candidat',
                offres: result
            });
        });

    }catch(error){
        console.log(error);
        res.render('/connexion');
    }
});

router.get('/filterOffers', function(req, res) {

    try{
        console.log("Accueil candidat");
        const salaire = req.query.minimum_salary;
        const type_metier = req.query.recherche_type;
        const nom_organisation = req.query.recherche_orga;
        const lieu_mission = req.query.recherche_lieu;
        const intitule = req.query.recherche_offre;

        offre.readFilteredOffersWithLinkedDatas(salaire, type_metier, nom_organisation, lieu_mission, intitule, function(result){
            console.log(result);
            res.render('../views/candidat/accueilCandidat', {
                title: 'MT Rec - Accueil Candidat',
                offres: result
            });
        });

    }catch(error){
        console.log(error);
        res.render('/connexion');
    }
});

module.exports = router;
