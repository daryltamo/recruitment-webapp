var db = require("./db.js");

module.exports = {
    // ajouter une nouvelle gestionOffreDemploi dans la BD
    create: function (id_recruteur, num_offre, callback){
        let sql_query = "INSERT INTO gestionOffreDemploi (recruteur, num_offre_demploi) VALUES (?, ?)";
        
        db.query(sql_query, [id_recruteur, num_offre], function(err, result) {
            if (err) {
                console.log("Erreur lors de la creation de gestionOffreDemploi(recruteur=" + id_recruteur + ", num_offre_demploi=" + num_offre + "): " + err);
                callback(false); //create failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("gestionOffreDemploi(recruteur=" + id_recruteur + ", num_offre_demploi=" + num_offre + ") creee avec succes. - (create)");
                    callback(true); //create gestionOffreDemploi succeeded
                } else {
                    console.log("Erreur lors de la creation de gestionOffreDemploi(recruteur=" + id_recruteur + ", num_offre_demploi=" + num_offre + "): aucune gestionOffreDemploi creee / echec de la requete SQL. - (create)");
                    callback(false); //create failed
                }
            }
        });
    },

    read: function (id_recruteur, num_offre, callback) {
        // recuperer une gestionOffreDemploi depuis la BD
        let sql_query = "SELECT * FROM gestionOffreDemploi WHERE recruteur= ? AND  num_offre_demploi= ?";
        
        db.query(sql_query, [id_recruteur, num_offre], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (read) de gestionOffreDemploi(recruteur=" + id_recruteur + ", num_offre_demploi=" + num_offre + "): " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("gestionOffreDemploi(recruteur=" + id_recruteur + ", num_offre_demploi=" + num_offre + ") trouvee. - (read)");
                    callback(result[0]);
                } else {
                    console.log("Erreur lors de la lecture (read) de gestionOffreDemploi(recruteur=" + id_recruteur + ", num_offre_demploi=" + num_offre + "): aucune gestionOffreDemploi trouvee / echec de la requete SQL. - (read)");
                    callback(null);
                }
            }
        });
    },

    readall: function (callback) {
        // recuperer toutes les gestionOffreDemploi depuis la BD
        let sql_query = "SELECT * FROM gestionOffreDemploi";
        
        db.query(sql_query, function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readall) gestionOffreDemploi: " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("gestionOffreDemploi trouvees. - (readall)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture (readall) gestionOffreDemploi: aucune gestionOffreDemploi trouvee / echec de la requete SQL. - (readall)");
                    callback(null);
                }
            }
        });
    },

    update: function (id_recruteur, num_offre, callback) {
        // mettre a jour une gestionOffreDemploi dans la BD
        let sql_query = "UPDATE gestionOffreDemploi SET recruteur= ? WHERE num_offre_demploi= ?";
        
        db.query(sql_query, [id_recruteur, num_offre], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour de gestionOffreDemploi(recruteur=" + id_recruteur + ", num_offre_demploi=" + num_offre + "): " + err);
                callback(false); //update failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("gestionOffreDemploi(recruteur=" + id_recruteur + ", num_offre_demploi=" + num_offre + ") mise a jour avec succes. - (update)");
                    callback(true); //update gestionOffreDemploi succeeded
                } else {
                    console.log("Erreur lors de la mise a jour de gestionOffreDemploi(recruteur=" + id_recruteur + ", num_offre_demploi=" + num_offre + "): aucune gestionOffreDemploi trouvee / echec de la requete SQL. - (update)");
                    callback(false); //update failed
                }
            }
        });
    },

    delete: function (id_recruteur, num_offre, callback) {
        // supprimer une gestionOffreDemploi de la BD
        let sql_query = "DELETE FROM gestionOffreDemploi WHERE recruteur= ? AND  num_offre_demploi= ?";
        
        db.query(sql_query, [id_recruteur, num_offre], function(err, result) {
            if (err) {
                console.log("Erreur lors de la suppression de gestionOffreDemploi(recruteur=" + id_recruteur + ", num_offre_demploi=" + num_offre + "): " + err);
                callback(false); //delete failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("gestionOffreDemploi(recruteur=" + id_recruteur + ", num_offre_demploi=" + num_offre + ") supprimee avec succes. - (delete)");
                    callback(true); //delete gestionOffreDemploi succeeded
                } else {
                    console.log("Erreur lors de la suppression de gestionOffreDemploi(recruteur=" + id_recruteur + ", num_offre_demploi=" + num_offre + "): aucune gestionOffreDemploi supprimee / echec de la requete SQL. - (delete)");
                    callback(false); //delete failed
                }
            }
        });
    },    
    // other functions are to be implemented here
}

