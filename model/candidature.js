const { DES } = require("crypto-js");
var db = require("./db.js");

module.exports = {
    create: function (id_candidat, id_offre_demploi) {
		return new Promise((resolve, reject) => {
			let sql_query = "INSERT INTO candidature (id_candidat, id_offre_demploi, date_candidature) VALUES (?,?,CURRENT_DATE())";
			db.query(sql_query, [id_candidat, id_offre_demploi], function(err, result) {
				if (err) {
					console.log("Erreur lors de la creation de candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + "): " + err);
					reject(false);
				}
				else {
					if (result.affectedRows === 1) {
						console.log("Candidature(id=" + result.insertId + ") creee avec succes. - (create)");
						resolve(true);
					}else {
						console.log("Erreur lors de la creation de candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + "): Echec de la requete SQL - (create)");
						reject(false);
					}
				}
			});
		});
    },

    
    read: function (id_candidat, id_offre_demploi, callback) {
        let sql_query = "SELECT * FROM candidature WHERE id_candidat = ? AND id_offre_demploi = ?";
        
        db.query(sql_query, [id_candidat, id_offre_demploi], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (read) de candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + "): " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") trouvee. - (read)");
                    callback(result[0]);
                } else {
                    console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") non trouvee / echec de la requete SQL. - (read)");
                    callback(null);
                }
            }
        });
    },

    readall: function (callback) {
        // recuper toutes les candidatures à une offre d"emploi
        let sql_query = "SELECT * FROM candidature";
        
        db.query(sql_query, function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readall) des candidatures  pour jobOffer(idjobOffer=" + id_offre_demploi + "): " +  err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("Candidatures trouvees pour jobOffer(idjobOffer=" + id_offre_demploi + "). - (readall)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture (readall) des candidatures  pour jobOffer(idjobOffer=" + id_offre_demploi + "): aucune candidature trouvee / echec de la requete SQL. - (readall)");
                    callback(null);
                }
            }
        });
    },

    readallforOffer: function (id_offre_demploi, callback) {
        // recuper toutes les candidatures à une offre d"emploi
        let sql_query = "SELECT id_candidat, date_candidature FROM candidature WHERE id_offre_demploi = ?";
        
        db.query(sql_query, [id_offre_demploi], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readall) des candidatures  pour jobOffer(idjobOffer=" + id_offre_demploi + "): " +  err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("Candidatures trouvees pour jobOffer(idjobOffer=" + id_offre_demploi + "). - (readall)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture (readall) des candidatures  pour jobOffer(idjobOffer=" + id_offre_demploi + "): aucune candidature trouvee / echec de la requete SQL. - (readall)");
                    callback(null);
                }
            }
        });
    },

    readallforCandidat: function (id_candidat, callback) {
        // recuper toutes les candidatures d'un candidat
        let sql_query = "SELECT * FROM candidature JOIN offreDemploi ON candidature.id_offre_demploi=offreDemploi.num NATURAL JOIN ficheDePoste WHERE id_candidat = ?";
        
        db.query(sql_query, [id_candidat], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallCandidat) des candidatures pour candidat(id_candidat=" + id_candidat + "): " +  err);
                callback(null);
            } else {
                if (result.length >= 0) {
                    console.log("Candidatures trouvees pour candidat(id_candidat=" + id_candidat + "). - (readallCandidat)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture (readall) des candidatures pour candidat(id_candidat=" + id_candidat + "): aucune candidature trouvee / echec de la requete SQL. - (readallCandidat)");
                    callback(null);
                }
            }
        });  
    },

    update: function (id_candidat, id_offre_demploi, date_candidature, callback) {
        // mettre à jour une candidature
        let sql_query = "UPDATE candidature SET date_candidature = ? WHERE id_candidat = ? AND id_offre_demploi = ?";
        
        db.query(sql_query, [date_candidature, id_candidat, id_offre_demploi], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour (update) de candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + "): " + err);
                callback(false); // update failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") mise a jour avec succes. - (update)");
                    callback(true); // update succeeded
                } else {
                    console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") non trouvee/ echec de la requete SQL. - (update)");
                    callback(false); // update failed
                }
            }
        });
    },

    updateDateCandidature: function(id_candidat, id_offre_demploi, callback) {
        const date_candidature = new Date();

        let sql_query = "UPDATE candidature SET date_candidature = ? WHERE id_candidat = ? AND id_offre_demploi = ?";
        
        db.query(sql_query, [date_candidature, id_candidat, id_offre_demploi], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour (updateDateCandidature) de candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + "): " + err);
                callback(false); // update failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") mise a jour avec succes. - (updateDateCandidature)");
                    callback(true); // update succeeded
                } else {
                    console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") non trouvee/ echec de la requete SQL. - (updateDateCandidature)");
                    callback(false); // update failed
                }
            }
        });

    },

    updateStatutCandidature: function(id_candidat, id_offre_demploi, desired_status, callback) {
        // TODO:
        let sql_query = "UPDATE candidature SET statut_candidature = ? WHERE id_candidat = ? AND id_offre_demploi = ?";

        db.query(sql_query, [desired_status, id_candidat, id_offre_demploi], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour (updateStatutCandidature) de candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + "): " + err);
                callback(false); // update failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") mise a jour avec succes. - (updateStatutCandidature)");
                    callback(true); // update succeeded
                } else {
                    console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") non trouvee/ echec de la requete SQL. - (updateStatutCandidature)");
                    callback(false); // update failed
                }
            }
        });

    },

    acceptCandidature: function(id_candidat, id_offre_demploi, callback) {
        const DESIRED_STATUS = 'Acceptée';
        let sql_query = "UPDATE candidature SET statut_candidature = ? WHERE id_candidat = ? AND id_offre_demploi = ?";

        db.query(sql_query, [DESIRED_STATUS, id_candidat, id_offre_demploi], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour (acceptCandidature) de candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + "): " + err);
                callback(false); // update failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") mise a jour avec succes. - (acceptCandidature)");
                    callback(true); // update succeeded
                } else {
                    console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") non trouvee/ echec de la requete SQL. - (acceptCandidature)");
                    callback(false); // update failed
                }
            }
        });
    },

    refuseCandidature: function(id_candidat, id_offre_demploi, callback) {
        const DESIRED_STATUS = 'Refusée';
        let sql_query = "UPDATE candidature SET statut_candidature = ? WHERE id_candidat = ? AND id_offre_demploi = ?";

        db.query(sql_query, [DESIRED_STATUS, id_candidat, id_offre_demploi], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour (refuseCandidature) de candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + "): " + err);
                callback(false); // update failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") mise a jour avec succes. - (refuseCandidature)");
                    callback(true); // update succeeded
                } else {
                    console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") non trouvee/ echec de la requete SQL. - (refuseCandidature)");
                    callback(false); // update failed
                }
            }
        });

    },

    updateCommentOnCandidature: function(id_candidat, id_offre_demploi, recruiter_comment, callback) {
        let sql_query = "UPDATE candidature SET commentaire_recruteur = ? WHERE id_candidat = ? AND id_offre_demploi = ?";

        db.query(sql_query, [recruiter_comment, id_candidat, id_offre_demploi], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour (updateCommentOnCandidature) de candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + "): " + err);
                callback(false); // update failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") mise a jour avec succes. - (updateCommentOnCandidature)");
                    callback(true); // update succeeded
                } else {
                    console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") non trouvee/ echec de la requete SQL. - (updateCommentOnCandidature)");
                    callback(false); // update failed
                }
            }
        });
    },

    delete: function (id_candidat, id_offre_demploi, callback) {
        let sql_query = "DELETE FROM candidature WHERE id_candidat = ? AND id_offre_demploi = ?";
        
        db.query(sql_query, [id_candidat, id_offre_demploi], function(err, result) {
            if (err) {
                console.log("Erreur lors de la suppression de candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + "): " + err);
                callback(false); // delete failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") supprimee avec succes. - (delete)");
                    callback(true); // delete succeeded
                } else {
                    console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ") non trouvee / echec de la requete SQL. - (delete)");
                    callback(false); // delete failed
                }
            }
        });
    },

    isApplicationValid: function (id_candidat, id_offre_demploi, callback) {
        // verifier si le candidat a postule à cette offre
        let sql_query = "SELECT * FROM candidature WHERE id_candidat = ? AND id_offre_demploi = ?";
        
        db.query(sql_query, [id_candidat, id_offre_demploi], function(err, result) {
            if (err) {
                console.log("Erreur lors de la verification de la validite (isApplicationValid) de candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ", date_candidature=" + date_candidature + "): " + err);
                callback(false); // application is not valid
            } else {
                if (result.length === 1) {
                    console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ", date_candidature=" + date_candidature + ") trouvee est valide. - (isApplicationValid)");
                    callback(true); // application is valid
                } else {
                    console.log("Candidature(id_candidat=" + id_candidat + ", id_offre_demploi=" + id_offre_demploi + ", date_candidature=" + date_candidature + ") non trouvee / echec de la requete SQL. - (isApplicationValid)" );
                    callback(false); // application is not valid
                }
            }
        });
    },
}
