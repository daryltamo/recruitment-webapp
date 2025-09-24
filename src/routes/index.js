const express = require('express');
const router = express.Router();
const userModel = require('../model/user');
const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

/**router.get('/', function(req, res, next) {
  // @TODO Il faut récupérer le titre de l'offre depuis la BDD
  res.render('candidature', { titre_offre: 'Test_candidature'});
});

router.get('/', function(req, res, next) {
  result=userModel.readall(function(result){*/

router.get('/', function (req, res) {
    logDebug('GET / - Rendering homepage');
    res.render('index', {
        title: 'MT Rec - Homepage'
    });
});

router.get('/index', function (req, res) {
    logDebug('GET /index - Rendering homepage');
    res.render('index', {
        title: 'MT Rec - Homepage'
    });
});

router.get('/connexion', function (req, res) {
    logDebug('GET /connexion - Rendering login view');
    res.render('connexion');
});

router.get('/inscription', function (req, res) {
    logDebug('GET /inscription - Rendering registration view');
    res.render('inscription');
});

router.get('/users', function (req, res) {
    logDebug('GET /users - Fetching all users');
    let session;
    let candidateName = '';
    try {
        userModel.readall(function (result) {
            if (result) {
                session = req.session;
                if (session.idApplicant) {
                    candidateName = req.session.nom_candidat;
                } else {
                    logError('GET /users - Applicant ID not found', {
                        idApplicant: session.idApplicant
                    });
                }
                res.render('utilisateur', {
                    user_name: candidateName,
                    title: 'User List',
                    users: result
                });
            } else {
                logError('GET /users - Failed to retrieve users');
                res.status(404).json({
                    error: 'Failed to retrieve users.'
                });
            }
        });
    } catch (error) {
        logError('GET /users - Error retrieving users', error);
        res.status(500).json({
            error: 'Failed to retrieve users.'
        });
    }
});

module.exports = router;
