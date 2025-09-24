var db = require("./db.js");

module.exports = {
    create: function (siren_org, nom_org, siege_social_org, type_assos_org, callback){
        let sql_query = "INSERT INTO organisation (siren, nom, siege_social, type_assos) VALUES (?, ?, ?, ?)";
        
        db.query(sql_query, [siren_org, nom_org, siege_social_org, type_assos_org], function(err, result) {
            if (err) {
                console.log("Erreur lors de la creation de l'organisation (siren= " + siren_org + "): " + err);
                callback(false);
            } else {
                if (result.affectedRows === 1) {
                    console.log("Organisation(siren= " + siren_org + ") creee avec succes. - (create)");
                    callback(true); // create organisation succeeded
                } else {
                    console.log("Erreur lors de la creation de l'organisation (siren= " + siren_org + "): aucune organisation creee / echec de la requête SQL. - (create)");
                    callback(false);
                }
            }
        });
    },

    read: function (siren_org, callback) {
        let sql_query = "SELECT * FROM organisation WHERE siren= ?";
    
        db.query(sql_query, [siren_org], function (err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (read) de l'organisation (siren= " + siren_org + "): " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("Organisation(siren= " + siren_org + ") lue avec succes. - (read)");
                    callback(result[0]);
                } else {
                    console.log("Erreur lors de la lecture (read) de l'organisation (siren= " + siren_org + "): aucune organisation trouvee / echec de la requête SQL. - (read)");
                    callback(null);
                }
            }
        });
    },

    readall: function (callback) {
        let sql_query = "SELECT * FROM organisation";

        db.query(sql_query, function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readall) de organisation: " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("Organisations trouvees avec succes. - (readall)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture (readall) de organisation: aucune organisation trouvee / echec de la requête SQL. - (readall)");
                    callback(null);
                }
            }
        });
    },

    update: function (siren_org, nom_org, siege_social_org, type_assos_org, callback) {
        let sql_query = "UPDATE organisation SET nom= ?, siege_social= ?, type_assos= ? WHERE siren= ?";
        
        db.query(sql_query, [nom_org, siege_social_org, type_assos_org, siren_org], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour de l'organisation (siren= " + siren_org + "): " + err);
                callback(false); // update organisation failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("Organisation(siren= " + siren_org + ") mise a jour avec succes. - (update)");
                    callback(true); // update organisation succeeded
                } else {
                    console.log("Erreur lors de la mise a jour de l'organisation (siren= " + siren_org + "): aucune organisation trouvee / echec de la requête SQL. - (update)");
                    callback(false); // update organisation failed
                }
            }
        });
    },

    delete: function (siren_org, callback) {
        let sql_query = "DELETE FROM organisation WHERE siren= ?";
        
        db.query(sql_query, [siren_org], function(err, result) {
            if (err) {
                console.log("Erreur lors de la suppression de l'organisation (siren= " + siren_org + "): " + err);
                callback(false); // delete organisation failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("Organisation(siren= " + siren_org + ") supprimee avec succes. - (delete)");
                    callback(true); // delete organisation succeeded
                } else {
                    console.log("Erreur lors de la suppression de l'organisation (siren= " + siren_org + "): aucune organisation trouvee / echec de la requête SQL. - (delete)");
                    callback(false); // delete organisation failed
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
                console.log("Erreur lors de la lecture (readallRecruteursOfOrganisation) des recruteurs de l'organisation (siren= " + siren_org + "): " + err);
                callback(null);
            } else {
                if (results.length > 0) {
                    console.log("Recruteurs de l'organisation(siren= " + siren_org + ") trouves avec succes. - (readallRecruteursOfOrganisation)");
                    callback(results);
                } else {
                    console.log("Erreur lors de la lecture (readallRecruteursOfOrganisation) des recruteurs de l'organisation (siren= " + siren_org + "): aucun recruteur trouve / echec de la requete SQL. - (readallRecruteursOfOrganisation)");
                    callback(null);
                }
            }
        });
        // could also be implemented by filtering the results of users/readall()
    },

    // other functions are to be implemented here
}

