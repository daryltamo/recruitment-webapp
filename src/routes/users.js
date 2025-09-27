var express = require('express');
var userModel = require("../model/utilisateur.js");

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('utilisateur', {
        title: 'Gestion des utilisateurs',
    });
});

router.get('/users', function(req, res, next) {
    try {
        userModel.readall(function(result) {
            if (result) {
                res.render('usersList', {
                    title: 'Liste des utilisateurs (userList)',
                    users: result,
                    message: "Utilisateurs lus avec succes",
                });
            } else {
                console.log('Echec de la lecture des utilisateurs.');

                res.status(404).json({
                    error: 'Echec de la lecture des utilisateurs.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log('Echec de la lecture des utilisateurs: ' + error);

        res.status(500).json({
            error: 'Echec de la lecture des utilisateurs.',
            status: 'error',
        });
    }
});

router.get('/usersList', function(req, res, next) {
    try {
        userModel.readall(function(result) {
            if (result) {
                console.log("Utilisateurs lus avec succes");

                res.render('utilisateur', {
                    title: 'Liste des utilisateurs',
                    users: result,
                    message: "Utilisateurs lus avec succes",
                });
            } else {
                console.log('Echec de la lecture des utilisateurs.');

                res.status(404).json({
                    error: 'Echec de la lecture des utilisateurs.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log('Echec de la lecture des utilisateurs: ' + error);

        res.status(500).json({
            error: 'Echec de la lecture des utilisateurs.',
            status: 'error',
        });
    }
});

router.post('/addUser', function(req, res, next) {
	try {
        const email = req.body.email; // body pour les posts et params pour le get
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const num_telephone = req.body.telephone;
        const mot_de_passe = req.body.mdp;
        const statut = 1; // 1 renseigne sur le fait que l'utilisateur soit actif par defaut
        const type_utilisateur = "Candidat"; // Candidat par défaut
        const id_organisation = 0; //par defaut
        const date_creation_compte = new Date();
    
        console.log('*** Ajout utilisateur  (/users/adduser) **********************');
    
        if(mot_de_passe !== req.body.mdp_repete){
            console.log("Les mots de passe ne correspondent pas");
            console.log("Echec d'ajout de l'utilisateur");
    
            res.status(401).json({
                error: "Les mots de passe ne correspondent pas",
                status: 'mdp',
            });
        }

        userModel.create(email, mot_de_passe, nom, prenom, num_telephone, date_creation_compte, statut, id_organisation, type_utilisateur, function(success) {
            if (success) {
                console.log("Utilisateur ajoute correctement. - (/users/addUser)");

                res.status(200).json({
                    message: "Utilisateur ajoute correctement",
                    status: 'success',
                });
            } else {
                console.log("Echec d'ajout de l'utilisateur");

                res.status(401).json({
                    error: "Echec d'ajout de l'utilisateur",
                    status: 'email',
                });
            }
        });
	} catch (error) {
		console.log("Echec d'ajout de l'utilisateur: " + error+  ". - (/users/addUser)");

        res.status(500).json({
            error: "Echec d'ajout de l'utilisateur",
			status: 'error',
		});
	}

});

router.put('/', function(req, res, next) {
    try {
        console.log(req.body); // DEBUG
        const email = req.body.email; console.log(email);
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const num_telephone = req.body.telephone;
        const type_utilisateur = req.body.type_utilisateur;
        const mot_de_passe = req.body.mdp;

        console.log("Test de modification d'un utilisateur. - (PUT /users/)");

        userModel.update(email, nom, prenom, num_telephone, type_utilisateur, mot_de_passe, function(success) {
            if (success) {
                console.log("Utilisateur modifie avec succes. - (PUT /users/)");

                res.status(200).json({
                    message: "Utilisateur modifie avec succes.",
                    status: 'success',
                });
            } else {
                console.log("Utilisateur non modifie. - (PUT /users/)");

                res.status(500).json({
                    error: "Echec de modification de l'utilisateur",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de modification de l'utilisateur: " + error + ". - (PUT /users/)");

        res.status(500).json({
            error: "Echec de modification de l'utilisateur",
            status: 'error',
        });
    }
});

router.put('/updateUser', function(req, res, next) {
    try {
        console.log(req.body); // DEBUG

        const email = req.body.email;
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const num_telephone = req.body.telephone;
        const type_utilisateur = req.body.type_utilisateur;
        const mot_de_passe = req.body.mdp;

        
        console.log('Test de modification d\'un utilisateur');

        userModel.update(email, nom, prenom, num_telephone, type_utilisateur, mot_de_passe, function(success) {
            if (success) {
                console.log("Utilisateur modifie avec succes");

                res.status(200).json({
                    message: "Utilisateur modifie avec succes",
                    status: 'success',
                });
            } else {
                console.log("Utilisateur non modifie");

                res.status(500).json({
                    error: "Echec de modification de l'utilisateur",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de modification de l'utilisateur: " + error);

        res.status(500).json({
            error: "Echec de modification de l'utilisateur",
            status: 'error',
        });
    }
});

// Route to make a user a recruiter
router.put('/rendreRecruteur/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const NEEDED_USER_TYPE = "Recruteur";
        
        userModel.updateUserType(email, NEEDED_USER_TYPE, function(success) {
            if (success) {
                res.status(200).send({
                    message: "Utilisateur promu recruteur avec succès.",
                    status: 'success'
                });
            } else {
                res.status(500).send({
                    error: "Echec de la promotion de l'utilisateur.",
                    status: 'error'
                });
            }
        });
    } catch (error) {
        res.status(500).send({
            error: "Echec de la promotion de l'utilisateur: " + error,
            status: 'error', 
         });
    }
});

// Route to make a user an admin
router.put('/rendreAdmin/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const NEEDED_USER_TYPE = "Administrateur";

        userModel.updateUserType(email, NEEDED_USER_TYPE, function(success) {
            if (success) {
                res.status(200).send({
                    message: "Utilisateur promu admin avec succès.",
                    status: 'success'
                });
            } else {
                res.status(500).send({
                    error: "Echec de la promotion de l'utilisateur.",
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log("Echec de la promotion de l'utilisateur: " + error);

        res.status(500).send({
            error: "Echec de la promotion de l'utilisateur: " + error,
            status: 'error', 
         });
    }
});

// Route to remove admin status from a user
router.put('/enleverAdmin/:email', async (req, res) => {
    try {
        const email = req.params.email;
        const NEEDED_USER_TYPE = "Candidat";
    
        userModel.updateUserType(email, NEEDED_USER_TYPE, function(success) {
            if (success) {
                res.status(200).send({
                    message: "Privilege admin enleve avec succes.",
                    status: 'success'
                });
            } else {
                res.status(500).send({
                    error: "Echec de la promotion de l'utilisateur.",
                    status: 'error'
                });
            }
        });
    } catch (error) {
        console.log("Echec de la promotion de l'utilisateur: " + error);

        res.status(500).send({
            error: "Echec de la promotion de l'utilisateur",
            status: 'error', 
         });
    }
});


router.delete('/', function(req, res, next) {
    try {
        const email = req.body.email;

        console.log('Test de suppression d\'un utilisateur');
    
        userModel.deleteUser(email, function(success) {
            if (success) {
                console.log("Utilisateur supprime avec succes");

                res.status(200).json({
                    message: "Utilisateur supprime avec succes",
                    status: 'success',
                });
            } else {
                console.log("Utilisateur non supprime");

                res.status(500).json({
                    error: "Echec de suppression de l'utilisateur",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de suppression de l'utilisateur: " + error);

        res.status(500).json({
            error: "Echec de suppression de l'utilisateur",
            status: 'error',
        });
    }

});

router.delete('/:email', function(req, res, next) {
    try {
        const email = req.params.email;
        // const nom = ;
        // const prenom = ;
    
        console.log('Test de suppression d\'un utilisateur');
    
        userModel.deleteUser(email, function(success) {
            if (success) {
                console.log("Utilisateur supprime avec succes");

                res.status(200).json({
                    message: "Utilisateur supprime avec succes",
                    status: 'success',
                });
            } else {
                console.log("Utilisateur non supprime");

                res.status(500).json({
                    error: "Echec de suppression de l'utilisateur",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de suppression de l'utilisateur: " + error);

        res.status(500).json({
            error: "Echec de suppression de l'utilisateur",
            status: 'error',
        });
    }
});

router.get('/:email', function(req, res, next) {
    try {

        const email = req.params.email;

        console.log('Test de lecture d\'un utilisateur');

        userModel.read(email, function(result) {
            if (result) {
                console.log("Utilisateur trouve");

                res.status(200).json({
                    user: result,
                    status: 'success',
                    message: "Utilisateur trouve",
                });
            } else {
                console.log("Utilisateur non trouve");

                res.status(404).json({
                    error: "Utilisateur non trouve",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de lecture de l'utilisateur: " + error);

        res.status(500).json({
            error: "Echec de lecture de l'utilisateur",
            status: 'error',
        });
    }

});

router.post('/:email', function(req, res, next) {
    try {
        const email = req.params.email;

        console.log('Test de lecture d\'un utilisateur');
    
        userModel.read(email, function(result) {
            if (result) {

                console.log("Utilisateur trouve");

                res.status(200).json({
                    user: result,
                    status: 'success',
                    message: "Utilisateur trouve",
                });
            } else {
                console.log("Utilisateur trouve");

                res.status(404).json({
                    error: "Utilisateur non trouve",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        console.log("Echec de lecture de l'utilisateur: " + error);

        res.status(500).json({
            error: "Echec de lecture de l'utilisateur",
            status: 'error',
        });
    }

});



module.exports = router;
