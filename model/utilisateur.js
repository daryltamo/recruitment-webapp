const { readall } = require('./candidature.js');
var db = require('./db.js');

module.exports = {
    create: function (email, mot_de_passe, nom, prenom, num_telephone, date_creation_compte, statut, id_organisation, type_utilisateur, callback) {
        // ajout d'un nouvel utilisateur dans la BD
        const DEFAULT_ID_ORG = 0;
        let sql_query = "INSERT INTO utilisateur (email, mot_de_passe, nom, prenom, num_telephone, date_creation_compte, statut, id_organisation, type_utilisateur) VALUES (?,?,?,?,?,?,?,?,?)";
        
        db.query(sql_query, [email, mot_de_passe, nom, prenom, num_telephone, date_creation_compte, statut, id_organisation, type_utilisateur], function(err, result){
            if (err) {
                console.log("Erreur lors de la creation de l'utilisateur (email= " + email + "): " + err);
                callback(false);
            } else {
                if(result.affectedRows === 1) {
                    console.log("Utilisateur(email= " + result.insertId + ") cree avec succes. - (create)");
                    callback(true); // create utilisateur succeeded
                } else {
                    console.log("Erreur lors de la creation de l'utilisateur (email= " + email + "): aucun utilisateur cree / echec de la requete SQL. - (create)");
                    callback(false);
                }
            }
        });
    },

    read: function (email, callback) {
        // recuperer un utilisateur depuis la BD
        let sql_query = "SELECT * FROM utilisateur WHERE email = ?";
        
        db.query(sql_query, [email], function(err, result) { 
            if (err) {
                console.log("Erreur lors de la lecture (read) de l'utilisateur (email= " + email + "): " + err);
                callback(null);
            } else {
                if(result.length > 0) {
                    console.log("Utilisateur(email= " + email + ") lu avec succes. - (read)");
                    callback(result[0]);
                } else {
                    console.log("Erreur lors de la lecture (read) de l'utilisateur (email= " + email + "): aucun utilisateur trouve / echec de la requete SQL. - (read)");
                    callback(-1);
                }
            }
        });
    },

    readall: function (callback) { 
        // recuperer tous les utilisateurs depuis la BD
        let sql_query = "SELECT * FROM utilisateur";
        
        db.query(sql_query, function (err, results) { 
            if (err) {
                console.log("Erreur lors de la lecture (readall) de tous les utilisateurs: " + err);
                callback(null);
            } else {
                if(results.length > 0) {
                    console.log("Utilisateurs trouves avec succes. - (readall)");
                    callback(results);
                } else {
                    console.log("Erreur lors de la lecture (readall) utilisateur: aucun utilisateur trouve / echec de la requete SQL. - (readall)");
                    callback(null);
                }
            }
        });
    },


    readallRecruteur: function (callback) {
        const USER_TYPE_RECRUTEUR = "Recruteur";
        let sql_query = "SELECT * FROM utilisateur WHERE type_utilisateur = ?";
        
        db.query(sql_query, [USER_TYPE_RECRUTEUR], function (err, results) { 
            if (err) {
                console.log("Erreur lors de la lecture (readallRecruteur) de tous les utilisateurs recruteurs: " + err);
                callback(null);
            } else {
                if(results.length > 0) {
                    console.log("Recruteurs trouves avec succes. - (readallRecruteur)");
                    callback(results);
                } else {
                    console.log("Erreur lors de la lecture (readallRecruteur) de utilisateur: aucun utilisateur trouve / echec de la requete SQL. - (readallRecruteur)");
                    callback(null);
                }
            }
        });
    },

    readallRecruteursOfOrganisation: function (siren_org, callback) {
        // le nom devrait être getRecruitersInOrganisation
        const USER_TYPE_RECRUTEUR = "Recruteur"
        let sql_query = "SELECT * FROM utilisateur WHERE type_utilisateur= ? AND organisation= ?";
        
        db.query(sql_query, [USER_TYPE_RECRUTEUR, siren_org] , function(err, results) {
            if (err) {
                console.log("Erreur lors de la lecture des recruteurs de l'organisation (siren= " + siren_org + "): " + err);
                callback(null);
            } else {
                if (results.length > 0) {
                    console.log("Recruteurs de l'organisation(siren= " + siren_org + ") trouves avec succes. - (readallRecruteursOfOrganisation)");
                    callback(results);
                } else {
                    console.log("Erreur lors de la lecture des recruteurs de l'organisation (siren= " + siren_org + "): aucun recruteur trouve / echec de la requete SQL. - (readallRecruteursOfOrganisation)");
                    callback(null);
                }
            }
        });
        // could also be implemented by filtering the results of users/readall()
    },


    readallCandidat: function (callback) {
        const USER_TYPE_CANDIDAT = "Candidat";
        let sql_query = "SELECT * FROM utilisateur WHERE type_utilisateur = ?";
        
        db.query(sql_query, [USER_TYPE_CANDIDAT], function (err, results) { 
            if (err) {
                console.log("Erreur lors de la lecture (readallCandidat) de tous les utilisateurs: " + err);
                callback(null);
            } else {
                if(results.length >= 0) {
                    console.log("Candidats trouves avec succes. - (readallCandidat)");
                    callback(results);
                } else {
                    console.log("Erreur lors de la lecture (readallCandidat) de utilisateur: aucun utilisateur trouve / echec de la requete SQL. - (readallCandidat)");
                    callback(null);
                }
            }
        });
    },

    readallAdmin: function (callback) {
        const USER_TYPE_ADMIN = "Administrateur";
        let sql_query = "SELECT * FROM utilisateur WHERE type_utilisateur = ?";
        
        db.query(sql_query, [USER_TYPE_ADMIN], function (err, results) { 
            if (err) {
                console.log("Erreur lors de la lecture (readallAdmin) de tous les utilisateurs: " + err);
                callback(null);
            } else {
                if(results.length > 0) {
                    console.log("Utilisateurs trouves avec succes. - (readallAdmin)");
                    callback(results);
                } else {
                    console.log("Erreur lors de la lecture (readallAdmin) de tous les utilisateurs: aucun utilisateur trouve / echec de la requete SQL. - (readallAdmin)");
                    callback(null);
                }
            }
        });
    },

    update: function (email, nom, prenom, num_telephone, type_utilisateur, mot_de_passe, callback) {
        // mettre a jour un utilisateur dans la BD
        let sql_query = "UPDATE utilisateur SET nom = ?, prenom = ?, num_telephone = ?, type_utilisateur = ?, mot_de_passe = ? WHERE email = ?";
        
        db.query(sql_query, [nom, prenom, num_telephone, type_utilisateur, mot_de_passe, email], function(err, result){
            if (err) {
                console.log("Erreur lors de la mise a jour (update) de l'utilisateur (email= " + email + "): " + err);
                callback(false);
            } else {
                if(result.affectedRows === 1) {
                    console.log("Utilisateur(email= " + email + ") mis a jour avec succes. - (update)");
                    callback(true); // update utilisateur succeeded
                } else {
                    console.log("Erreur lors de la mise a jour de l'utilisateur (email= " + email + "): aucun utilisateur trouve / echec de la requete SQL. - (update)");
                    callback(false);
                }
            }
        });
    },

    updateUserType: function(email, type_utilisateur, callback) {
        let sql_query = "UPDATE utilisateur SET type_utilisateur= ? WHERE email = ?";

        db.query(sql_query, [type_utilisateur, email], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour (updateUserType) de l'utilisateur (email= " + email + "): " + err);
                callback(false);
            } else {
                if(result.affectedRows === 1) {
                    console.log("Utilisateur(email= " + email + ") mis a jour avec succes. - (updateUserType)");
                    callback(true); // update utilisateur succeeded
                } else {
                    console.log("Erreur lors de la mise a jour de l'utilisateur (email= " + email + "): aucun utilisateur trouve / echec de la requete SQL. - (updateUserType)");
                    callback(false);
                }
            }
        });
    },

    updateUserOrg: function(email, id_organisation, callback) {
        let sql_query = "UPDATE utilisateur SET id_organisation= ? WHERE email = ?";

        db.query(sql_query, [id_organisation, email], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour (updateUserOrg) de l'utilisateur (email= " + email + "): " + err);
                callback(false);
            } else {
                if(result.affectedRows === 1) {
                    console.log("Utilisateur(email= " + email + ") mis a jour avec succes. - (updateUserOrg)");
                    callback(true); // update utilisateur succeeded
                } else {
                    console.log("Erreur lors de la mise a jour de l'utilisateur (email= " + email + "): aucun utilisateur trouve / echec de la requete SQL. - (updateUserOrg)");
                    callback(false);
                }
            }
        });
    },
    
    updateUserOrgUsingId: function(id_utilisateur, id_organisation, callback) {
        let sql_query = "UPDATE utilisateur SET id_organisation= ? WHERE id_utilisateur = ?";

        db.query(sql_query, [id_organisation, id_utilisateur], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour (updateUserOrg) de l'utilisateur (email= " + email + "): " + err);
                callback(false);
            } else {
                if(result.affectedRows === 1) {
                    console.log("Utilisateur(id_utilisateur= " + id_utilisateur + ") mis a jour avec succes. - (updateUserOrg)");
                    callback(true); // update utilisateur succeeded
                } else {
                    console.log("Erreur lors de la mise a jour de l'utilisateur (id_utilisateur= " + id_utilisateur + "): aucun utilisateur trouve / echec de la requete SQL. - (updateUserOrg)");
                    callback(false);
                }
            }
        });
    },

    deleteUser: function (email, callback) {
        // supprimer un utilisateur de la BD
        let sql_query = "DELETE FROM utilisateur WHERE email = ?";
        
        db.query(sql_query, [email], function(err, results){
            if (err) {
                console.log("Erreur lors de la suppression de l'utilisateur (email= " + email + "): " + err);
                callback(false);
            } else  {
                if(results.affectedRows === 1) {
                    console.log("Utilisateur(email= " + email + ") supprime avec succes (deleteUser).");
                    callback(true); // delete utilisateur succeeded
                } else {
                    console.log("Erreur lors de la suppression de l'utilisateur (email= " + email + "): aucun utilisateur trouve / echec de la requete SQL. - (deleteUser)");
                    callback(false);
                }
            }
        });
    },

    areValid: function (email, password, callback) {
        // verifier les parametres (email, mdp) d'un utilisateur
        let sql_query = "SELECT mot_de_passe FROM utilisateur WHERE email = ?"; 
        try {
            db.query(sql_query, [email], function (err, result) { 
                if (err) {
                    console.log("Erreur dans areValid avec la query SQL")
                    throw err;
                } else {
                    if (result.length >= 1 && result[0].mot_de_passe === password) { 
                        console.log("Les parametres fournis par l'utilisateur(email: " + email + ", mdp=" + password + ") lors de la connexion sont corrects. - (areValid)");
                        callback(true); // utilisateur valide
                    } else { 
                        console.log("Les parametres fournis par l'utilisateur(email: " + email + ", mdp=" + password + ") lors de la connexion sont incorrects. - (areValid)");
                        callback(false); // utilisateur invalide
                    }
                }
            });
        }
        catch (err) {
            console.log("Erreur lors de la lecture de l'utilisateur (email= " + email + "): " + err);
        }
    },
    
    deactivateUser: function(email, callback) {
        // desactiver un utilisateur
        const INACTIVE_USER_STATUS = 0;
        let sql_query = "UPDATE utilisateur SET statut= ? WHERE email= ?";
        
        db.query(sql_query, [INACTIVE_USER_STATUS, email], function(err, results){
            if (err) {
                console.log("Erreur lors de la desactivation de l'utilisateur(email= " + email + "): " + err);
                callback(false); // desactivation utilisateur echouee
            } else {
                if(results.affectedRows === 1) {
                    console.log("Utilisateur(email= " + email + ") desactive avec succes. - (deactivateUser)");
                    callback(true); // desactivation utilisateur reussie
                } else {
                    console.log("Erreur lors de la desactivation de l'utilisateur(email= " + email + "): aucun utilisateur trouve / echec de la requete SQL. - (deactivateUser)");
                    callback(false); // desactivation utilisateur echouee
                }
            }
        });
    },

    isUserActive: function (email, callback) {
        // verifier si un utilisateur est actif (statut = 1)
        const ACTIVE_USER_STATUS = 1;
        let sql_query = "SELECT statut FROM utilisateur WHERE email = ?";
        
        db.query(sql_query, [email], function (err, result) {
            if (err) {
                console.log("Erreur lors de la verification du statut(actif/non) de l'utilisateur(email=" + email + "): " + err);
                callback(false);
            } else {
                if (result.length == 1 && result[0].statut === ACTIVE_USER_STATUS) {
                    console.log("Utilisateur(email= " + email + ") est actif. - (isUserActive)");
                    callback(true); // utilisateur actif
                } else {
                    console.log("Utilisateur(email= " + email + ") est inactif. - (isUserActive)");
                    callback(false);
                }
            }
        });
    },

    isUserAnAdmin: function (email, callback) {
        // verifier si un utilisateur est admin (type_utilisateur = 'Administrateur')
        const USER_TYPE_ADMIN = "Administrateur";
        let sql_query = "SELECT type_utilisateur FROM utilisateur WHERE email = ?";
        
        db.query(sql_query, [email], function (err, result) {
            if (err) {
                console.log("Erreur lors de la verification (isUserAnAdmin) du type ADMIN de l'utilisateur(email=" + email + "): " + err);
                callback(false);
            } else {
                if (result.length == 1 && result[0].type_utilisateur === USER_TYPE_ADMIN) {
                    console.log("Utilisateur(email= " + email + ") est un admin. - (isUserAnAdmin)");
                    callback(true); // utilisateur est admin
                } else {
                    console.log("Utilisateur(email= " + email + ") n'est pas un admin. - (isUserAnAdmin)");
                    callback(false);
                }
            }
        });
    },

    isUserARecruiter: function (email, callback) {
        // verifier si un utilisateur est recruteur (type_utilisateur = 'Recuteur')
        const USER_TYPE_RECRUTEUR = "Recruteur";
        let sql_query = "SELECT type_utilisateur FROM utilisateur WHERE email = ?";
        
        db.query(sql_query, [email], function (err, result) {
            if (err) {
                console.log("Erreur lors de la verification (isUserARecruiter) du type RECRUTEUR de l'utilisateur(email=" + email + "): " + err);
                callback(false);
            } else {
                if (result.length == 1 && result[0].type_utilisateur === USER_TYPE_RECRUTEUR) {
                    console.log("Utilisateur(email= " + email + ") est un recruteur. - (isUserARecruiter)");
                    callback(true); // utilisateur est recruteur
                } else {
                    console.log("Utilisateur(email= " + email + ") n'est pas un recruteur. - (isUserARecruiter)");
                    callback(false);
                }
            }
        });
    },
    
    isUserACandidate: function (email, callback) {
        // verifier si un utilisateur est candidat (type_utilisateur = 'Candidat')
        const USER_TYPE_CANDIDATE = "Candidat";
        let sql_query = "SELECT type_utilisateur FROM utilisateur WHERE email = ?";
        
        db.query(sql_query, [email], function (err, result) {
            if (err) {
                console.log("Erreur lors de la verification (isUserACandidate) du type CANDIDAT de l'utilisateur(email=" + email + "): " + err);
                callback(false);
            } else {
                if (result.length == 1 && result[0].type_utilisateur === USER_TYPE_CANDIDATE) {
                    console.log("Utilisateur(email= " + email + ") est un candidat. - (isUserACandidate)");
                    callback(true); // utilisateur est candidat
                } else {
                    console.log("Utilisateur(email= " + email + ") n'est pas un candidat. - (isUserACandidate)");
                    callback(false);
                }
            }
        });
    },
}

