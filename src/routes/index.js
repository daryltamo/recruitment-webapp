var express = require('express');
var router = express.Router();
var userModel = require("../model/utilisateur");

/**router.get('/', function(req, res, next) {
  // @TODO Il faut récupérer le titre de l'offre depuis la BDD
  res.render('candidature', { titre_offre: 'Test_candidature'});
});

router.get('/', function(req, res, next) {
  result=userModel.readall(function(result){*/

router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'MT Rec - Homepage'
  });
});

router.get('/index', function(req, res, next) {
  res.render('index', {
    title: 'MT Rec - Homepage'
  });
});

router.get('/connexion', function(req, res, next) {
  res.render('connexion');
  // res.render('connexion', {
  //   title: 'MT Rec - Connexion'
  // });
});

router.get('/inscription', function(req, res, next) {
  res.render('inscription');
  // res.render('inscription', {
  //   title: 'MT Rec - Inscription'
  // });
});

router.get('/users', function(req, res, next) {
    try {
        userModel.readall(function(result){
            if (result) {
                
                session=req.session;
        
                if(session.id_candidat){
                    nom_candidat = req.session.nom_candidat;
                }
                else{
                    console.log('Erreur, Id introuvable : ', session.id_candidat);
                }
        
                res.render('utilisateur', {
                    user_name: nom_candidat,
                    title: 'Liste des utilisateurs',
                    users: result,
                });
              } else {
                res.status(404).json({
                    error: 'Echec de la lecture des utilisateurs.',
                });
                console.log('Echec de la lecture des utilisateurs.');
            }
        });
    } catch (error) {
        res.status(500).json({
            error: 'Echec de la lecture des utilisateurs.',
        });
        console.log('Echec de la lecture des utilisateurs: ' + error);
    }
});

module.exports = router;
