var express = require('express');
var router = express.Router();
var userModel = require('../model/utilisateur');
let session = require ('../sessions');


router.get('/', function(req, res, next) {
    res.render('../views/connexion');
});


router.post('/connectUser', async function(req, res) {
    try {
        const email = req.body.email;
        const mot_de_passe = req.body.mdp;
        
        userModel.areValid(email, mot_de_passe, function(isValid) {
            console.log("/connexion/connectuser says: isValid = " + isValid);
            if (isValid) {
                // console.log("Les paramètres fournis par l'utilisateur(email: " + email + ") lors de la connexion sont corrects.");
                userModel.isUserActive(email, async function(isActive) {
                    if (isActive) {
                        userModel.isUserACandidate(email, async function(isCandidate) {
                            if (isCandidate) {
                                const results = await session.createSession(req.session, email,'Candidat');
                                // res.status(200).json({
                                //     redirect: '/candidat/accueilCandidat',
                                //     message: 'Connecte en tant que candidat',
                                //     status: 'success',
                                // });
                                console.log("Utilisateur(email: " + email + ") est connecté en tant que Candidat");
                                if(results)
                                    res.redirect("/candidat/accueilCandidat");
                            } else {
                                userModel.isUserARecruiter(email, async function(isRecruiter) {
                                    if (isRecruiter) {
                                        const results = await session.createSession(req.session, email,'Recruteur');
                                        // res.status(200).json({
                                        //     redirect: '/recruteur/accueilRecruteur',
                                        //     message: 'Connecte en tant que recruteur',
                                        //     status: 'success',
                                            
                                        // });
                                        console.log("Utilisateur(email: " + email + ") est connecté en tant que Recruteur");
                                        if(results)
                                            res.redirect("/recruteur/accueilRecruteur");
                                    } else {
                                        userModel.isUserAnAdmin(email, async function(isAdmin) {
                                            if (isAdmin) {
                                                const results = await session.createSession(req.session, email,'Administrateur');
                                                // res.status(200).json({
                                                //     redirect: '/admin/accueilAdmin',
                                                //     message: 'Connecte en tant qu\'admin',
                                                //     status: 'success',
                                                // });
                                                console.log("Utilisateur(email: " + email + ") est connecté en tant qu'Admin");
                                                if(results)
                                                    res.redirect("/admin/accueilAdmin");
                                            } else {
                                                res.status(401).json({
                                                    error: "Role inconnu",
                                                    // message: 'Role inconnu',
                                                    status: 'error',
                                                });
                                                console.log("Role inconnu");
                                            }
                                        });
                                    }
                                });
                            }
                        } );
                        
                    } else {
                        res.status(401).json({
                            error: "Compte inactif",
                            // message: 'Compte inactif',
                            status: 'error',
                        });
                        console.log("Compte inactif");
                    }
                });
            } else {
                res.redirect("/connexion");
                // res.status(401).json({
                //     error: "Email ou mot de passe incorrect",
                //     message: 'Email ou mot de passe incorrect',
                //     status: 'error',
                // });
                console.log("Email ou mot de passe incorrect");
            }
            
        });
    } catch (error) {
        res.status(500).json({
            error: "Echec de la verification de l'utilisateur",
            // message: "Echec de la verification de l'utilisateur",
            status: 'error',
        });
        console.log("Echec de la verification de l'utilisateur: " + error);
    }
});

router.get('/disconnectUser', function(req, res) {
    try {
        console.log("Deconnexion de l'utilisateur(id_utilisateur: " + req.session.id_utilisateur + ", email: " + req.session.mail + ")");
        session.deleteSession(req.session);
        res.redirect("/connexion");
    } catch (error) {
        console.log("Erreur lors de la deconnexion de l'utilisateur" + error + ". - (POST /connexion/disconnectUser)");
    }
});

module.exports = router;
