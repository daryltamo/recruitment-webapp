// TODO: VÉRIFIER LA SYNTAXE DE LA CLE PRIMAIRE DE LA TABLE piecesJointes

var db = require("./db.js");
module.exports = {
    create: function (id_candidat, id_offre_demploi, uploadedFiles, callback) {
        console.log(id_candidat)
        for (const field in uploadedFiles) {
            console.log(`Processing files for field: ${field}`);
            uploadedFiles[field].forEach(chemin => {
                sql_query = "INSERT INTO piecesJointes (id_candidature_candidat, id_candidature_offre_demploi, chemin) VALUES (?, ?, ?)";
        
                db.query(sql_query, [id_candidat, id_offre_demploi, chemin], async function (err, result) {
                    if (err) {
                        console.log("Erreur lors de la creation de la pieceJointe(chemin = " + chemin + "): " + err);
                        callback(false); // create pieceJointe failed
                    } else {
                        if (result.affectedRows === 1) {
                            console.log("pieceJointe(id=" + result.insertId + ") creee avec succes. - (create)");
                            callback(true); // create pieceJointe successed
                        } else {
                            console.log("Erreur lors de la creation de la pieceJointe(chemin = " + chemin + "): aucne piece jointe creee / echec de la requete SQL. - (create)");
                            callback(false); // create pieceJointe failed
                        }
                    }
                });
            });
        }
    },

    read: function (id_piece_jointe, callback) {
        // récupérer une pièce jointe depuis la BD
        let sql_query = "SELECT * FROM piecesJointes WHERE id-piece_jointe= ?";
        
        db.query(sql_query, [id_piece_jointe], function (err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (read) de pieceJointe(id_piece_jointe=" + id_piece_jointe + "): " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("pieceJointe(id_piece_jointe=" + id_piece_jointe + ") trouvee. - (read)");
                    callback(result[0]);
                } else {
                    console.log("Erreur lors de la lecture (read) de pieceJointe(id_piece_jointe=" + id_piece_jointe + "): aucune piece jointe trouvee / echec de la requete SQL. - (read)");
                    callback(null);
                }
            }
        });
    },

    readall: function (id_candidat, num_offre, callback) {
        // récupérer toutes les pièces jointes d"une candidature depuis la BD
        let sql_query = "SELECT * FROM piecesJointes WHERE candidature_candidat= ? AND candidature_offre_demploi= ?";

        db.query(sql_query, [id_candidat, num_offre], function (err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readall) de pieceJointe for candidature(id_candidat=" + id_candidat + ", num_offre=" + num_offre + "). " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("pieceJointes trouvees pour candidature(id_candidat=" + id_candidat + ", num_offre=" + num_offre + "). - (readall)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture (readall) de pieceJointe for candidature(id_candidat=" + id_candidat + ", num_offre=" + num_offre + "). aucune piece jointe trouvee / echec de la requete SQL. - (readall)");
                    callback(null);
                }
            }
        });
    },

    update: function (id_piece_jointe, id_candidat, num_offre, chemin_fichier, callback) {
        //mettre à jour une pièce jointe dans la base de données
        let sql_query = "UPDATE piecesJointes  SET candidature_candidat= ?, candidature_offre_demploi = ?, chemin= ? WHERE id-piece_jointe = ?";
        
        db.query(sql_query, [id_candidat, num_offre, chemin_fichier, id_piece_jointe], function (err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour de pieceJointe(id_picejointe=" + id_piece_jointe + "): " + err);
                callback(false); // update pieceJointe failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("pieceJointe(id_picejointe=" + id_piece_jointe + ") mise a jour avec succes. - (update)");
                    callback(true); // update pieceJointe succeeded
                } else {
                    console.log("Erreur lors de la mise a jour de pieceJointe(id_picejointe=" + id_piece_jointe + "): aucune piece jointe trouvee / echec de la requete SQL. - (update)");
                    callback(false); // update pieceJointe failed
                }
            }
        });
    },

    delete: function (id_piece_jointe, callback) {
        //supprimer une pièce jointe de la BD
        let sql_query = "DELETE FROM piecesJointes WHERE id-piece_jointe= ?";
        
        db.query(sql_query, [id_piece_jointe], function (err, result) {
            if (err) {
                console.log("Erreur lors de la suppression de pieceJointe(id_picejointe=" + id_piece_jointe + "): " + err);
                callback(false); // delete pieceJointe failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("pieceJointe(id_picejointe=" + id_piece_jointe + ") supprimee avec succes. - (delete)");
                    callback(true); // delete pieceJointe succeeded
                } else {
                    console.log("Erreur lors de la suppression de pieceJointe(id_picejointe=" + id_piece_jointe + "): aucune piece jointe trouvee / echec de la requete SQL. - (delete)");
                    callback(false); // delete pieceJointe failed
                }
            }
        });
    },
    
    download: function (id_piece_jointe, callback) {
        // récupérer le chemin de la pièce jointe depuis la BD
        let sql_query = "SELECT chemin FROM piecesJointes WHERE id-piece_jointe= ?";
        
        db.query(sql_query, [id_piece_jointe], function (err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (download) de pieceJointe(id_piece_jointe=" + id_piece_jointe + "): " + err);
                callback(null); // download pieceJointe failed
            } else {
                if (result.length > 0) {
                    console.log("pieceJointe(id_piece_jointe=" + id_piece_jointe + ") trouvee. - (download)");
                    callback(result[0]); // download pieceJointe succeeded
                } else {
                    console.log("Erreur lors de la lecture (download) de pieceJointe(id_piece_jointe=" + id_piece_jointe + "): aucune piece jointe trouvee / echec de la requete SQL. - (download)");
                    callback(null); // download pieceJointe failed
                }
            }
        });
    },
    // Upload file (add a row in piecesJointes table and put file in uploads folder)
    upload: function (id_piece_jointe, chemin_fichier, callback) {
        // mettre à jour le chemin de la pièce jointe dans la BD
        let sql_query = "UPDATE piecesJointes SET chemin= ? WHERE id-piece_jointe= ?";
        
        db.query(sql_query, [chemin_fichier, id_piece_jointe], function (err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour de pieceJointe(id_piece_jointe=" + id_piece_jointe + "): " + err);
                callback(false); // upload pieceJointe failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("pieceJointe(id_piece_jointe=" + id_piece_jointe + ") trouvee. - (upload)");
                    callback(true); // upload pieceJointe succeeded
                } else {
                    console.log("Erreur lors de la mise a jour de pieceJointe(id_piece_jointe=" + id_piece_jointe + "): aucune piece jointe trouvee / echec de la requete SQL. - (upload)");
                    callback(false); // upload pieceJointe failed
                }
            }
        });
    },
}

