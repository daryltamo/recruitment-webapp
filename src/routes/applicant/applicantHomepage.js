const express = require('express');
const router = express.Router();
const jobOfferModel = require('../../model/jobOffer');

router.get('/', function (req, res) {
    try {
        console.log('Accueil candidat');
        jobOfferModel.readOffersWithLinkedDatas(function (result) {
            res.render('../views/candidat/accueilCandidat', {
                title: 'MT Rec - Accueil Candidat',
                offres: result
            });
        });
    } catch (error) {
        console.log(error);
        res.render('/connexion');
    }
});

router.get('/filterOffers', function (req, res) {
    try {
        console.log('Accueil candidat');
        const salary = req.query.minimum_salary;
        const jobType = req.query.recherche_type;
        const nameOrganization = req.query.recherche_orga;
        const jobLocation = req.query.recherche_lieu;
        const jobTitle = req.query.recherche_offre;

        jobOfferModel.readFilteredOffersWithLinkedDatas(
            salary,
            jobType,
            nameOrganization,
            jobLocation,
            jobTitle,
            function (result) {
                console.log(result);
                res.render('../views/candidat/accueilCandidat', {
                    title: 'MT Rec - Accueil Candidat',
                    offres: result
                });
            }
        );
    } catch (error) {
        console.log(error);
        res.render('/connexion');
    }
});

module.exports = router;
