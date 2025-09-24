var db = require("./db.js");
module.exports = {
    create: function (intitule, id_organisation, statut_poste, resp_hierarch, type_metier, lieu_mission, rythme, salaire, description, callback) {
        console.log(intitule, " ",id_organisation, " ",statut_poste, " ",resp_hierarch, " ",type_metier, " ",lieu_mission, " ",rythme, " ",salaire, " ",description)
        let sql_query = "INSERT INTO ficheDePoste (intitule, id_organisation, statut_poste, resp_hierarch, type_metier, lieu_mission, rythme, salaire, description) VALUES (?,?,?,?,?,?,?,?,?)";
        
        db.query(sql_query, [intitule, id_organisation, statut_poste, resp_hierarch, type_metier, lieu_mission, rythme, salaire, description], function(err, result) {
            if (err) {
                console.log("Erreur lors de la creation de ficheDePoste(intitule=" + intitule + ", organisation=" + id_organisation + "): " + err);
                callback(false);
            } else {
                if(result.affectedRows === 1) {
                    console.log("ficheDePoste(intitule=" + intitule + ", organisation=" + id_organisation + ") creee avec succes. - (create)");
                    callback(true);
                } else {
                    console.log("Erreur lors de la creation de ficheDePoste(intitule=" + intitule + ", organisation=" + id_organisation + "): aucune fiche de poste creee / echec de la requete SQL. - (create)");
                    callback(false);
                }
            }
        });
    },

    read: async function (intitule, id_organisation, callback) {
        let sql_query = "SELECT * FROM ficheDePoste WHERE intitule = ? and organisation = ?";
        
        db.query(sql_query, [intitule, id_organisation], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (read) de ficheDePoste(intitule=" + intitule + ", organisation=" + id_organisation + "): " + err);
                callback(null);
            } else {
                if(result.length > 0) {
                    console.log("ficheDePoste(intitule=" + intitule + ", organisation=" + id_organisation + ") trouvee. - (read)");
                    callback(result[0]);
                } else {
                    console.log("Erreur lors de la lecture (read) de ficheDePoste(intitule=" + intitule + ", organisation=" + id_organisation + "): aucune fiche de poste trouvee / echec de la requete SQL. - (read)");
                    callback(null);
                }
            }
        });
    },

    readall: function (callback) {
        let sql_query = "SELECT * FROM ficheDePoste";
        
        db.query(sql_query, function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readall) des fiches de poste: " + err);
                callback(null);
            } else {
                if(result.length > 0) {
                    console.log("Fiches de postes trouvees avec succes. - (readall)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture (readall) des fiches de poste: aucune fiche de poste trouvee / echec de la requete SQL. - (readall)");
                    callback(null);
                }
            }
        });
    },
    
    readUsingId(id_fichedeposte, callback) {
        let sql_query = "SELECT * FROM ficheDePoste WHERE id_fichedeposte = ?";
        
        db.query(sql_query, [id_fichedeposte], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readUsingId) de ficheDePoste(id_fichedeposte=" + id_fichedeposte + "): " + err);
                callback(null);
            } else {
                if(result.length > 0) {
                    console.log("ficheDePoste(id_fichedeposte=" + id_fichedeposte + ") trouvee. - (readUsingId)");
                    callback(result[0]);
                } else {
                    console.log("Erreur lors de la lecture (readUsingId) de ficheDePoste(id_fichedeposte=" + id_fichedeposte + "): aucune fiche de poste trouvee / echec de la requete SQL. - (readUsingId)");
                    callback(null);
                }
            }
        });
    },

    readallInOrganisation: function (siren_org, callback) {
        let sql_query = "SELECT * FROM ficheDePoste WHERE id_organisation = ?";
        
        db.query(sql_query, [siren_org], function(err, results) {
            if (err) {
                console.log("Erreur lors de la lecture (readallInOrganisation) des fiches de poste de l'organisation " + siren_org + ": " + err);
                callback(null);
            } else {
                if(results.length > 0) {
                    console.log("Fiches de postes de l'organisation " + siren_org + " trouvees avec succes. - (readallInOrganisation)");
                    callback(results);
                } else {
                    console.log("Erreur lors de la lecture (readallInOrganisation) des fiches de poste de l'organisation (siren_org= " + siren_org + ") : aucune fiche de poste trouvee / echec de la requete SQL. - (readallInOrganisation)");
                    callback(null);
                }
            }
        });
    },

    update: function (intitule, id_organisation, statut_poste, resp_hierarch, type_metier, lieu_mission, rythme, salaire, description, callback) {
        let sql_query = "UPDATE ficheDePoste SET statut_poste= ?, resp_hierarch= ?, type_metier= ?, lieu_mission= ?, rythme= ?, salaire= ?, description= ? WHERE intitule= ? AND organisation= ?";
        
        db.query(sql_query, [statut_poste, resp_hierarch, type_metier, lieu_mission, rythme, salaire, description, intitule, id_organisation], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour de ficheDePoste(intitule=" + intitule + ", organisation=" + id_organisation + "): " + err);
                callback(false); // update failed
            } else {
                if(result.affectedRows === 1) {
                    console.log("ficheDePoste(intitule=" + intitule + ", organisation=" + id_organisation + ") mise a jour avec succes. - (update)");
                    callback(true);
                } else {
                    console.log("Erreur lors de la mise a jour de ficheDePoste(intitule=" + intitule + ", organisation=" + id_organisation + "): aucune fiche de poste mise  jour / echec de la requete SQL. - (update)");
                    callback(false); // update failed
                }
            }
        });
    },
    
    updateUsingId: function(id_fichedeposte, intitule, id_organisation, statut_poste, resp_hierarch, type_metier, lieu_mission, rythme, salaire, description, callback) {
        let sql_query = "UPDATE ficheDePoste SET intitule = ?, id_organisation = ?, statut_poste = ?, resp_hierarch = ?, type_metier = ?, lieu_mission = ?, rythme = ?, salaire = ?, description = ? WHERE id_fichedeposte = ?";
                
        db.query(sql_query, [intitule, id_organisation, statut_poste, resp_hierarch, type_metier, lieu_mission, rythme, salaire, description, id_fichedeposte], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour de ficheDePoste(id_fichedeposte=" + id_fichedeposte + "): " + err + ". - (updateUsingId)");
                callback(false); // update failed
            } else {
                if(result.affectedRows === 1) {
                    console.log("ficheDePoste(id_fichedeposte=" + id_fichedeposte + ") mise a jour avec succes. - (updateUsingId)");
                    callback(true);
                } else {
                    console.log("Erreur lors de la mise a jour de ficheDePoste(id_fichedeposte=" + id_fichedeposte + "): aucune fiche de poste mise a jour / echec de la requete SQL. - (updateUsingId)");
                    callback(false); // update failed
                }
            }
        });
    },

    delete: function (intitule, id_organisation, callback) {
        let sql_query = "DELETE FROM ficheDePoste WHERE intitule = ? and organisation = ?";
        
        db.query(sql_query, [intitule, id_organisation], function(err, result) {
            if (err) {
                console.log("Erreur lors de la suppression de ficheDePoste (intitule=" + intitule + ", organisation=" + id_organisation + "): " + err);
                callback(false); // delete failed
            } else {
                if(result.affectedRows === 1) {
                    console.log("ficheDePoste (intitule=" + intitule + ", organisation=" + id_organisation + ") supprimee avec succes. - (delete)");
                    callback(true); // delete succeeded
                } else {
                    console.log("Erreur lors de la suppression de ficheDePoste (intitule=" + intitule + ", organisation=" + id_organisation + "): aucune fiche de poste supprimee / echec de la requete SQL. - (delete)");
                    callback(false); // delete failed
                }
            }
        });
    },

    deleteUsingId : function(id_fichedeposte, callback) {
        let sql_query = "DELETE FROM ficheDePoste WHERE id_fichedeposte = ?";
                
        db.query(sql_query, [id_fichedeposte], function(err, result) {
            if (err) {
                console.log("Erreur lors de la suppression de ficheDePoste (id_fichedeposte=" + id_fichedeposte + "): " + err);
                callback(false); // delete failed
            } else {
                if(result.affectedRows === 1) {
                    console.log("ficheDePoste (id_fichedeposte=" + id_fichedeposte + ") supprimee avec succes. - (deleteUsingId)");
                    callback(true); // delete succeeded
                } else {
                    console.log("Erreur lors de la suppression de ficheDePoste (id_fichedeposte=" + id_fichedeposte + "): aucune fiche de poste supprimee / echec de la requete SQL. - (deleteUsingId)");
                    callback(false); // delete failed
                }
            }
        });
    },

    doesFicheDePosteExist: function (intitule, id_organisation, callback) {
        let sql_query = "SELECT * FROM ficheDePoste WHERE intitule = ? and organisation = ?";
        
        db.query(sql_query, [intitule, id_organisation], function(err, result) {
            if (err) {
                console.log("Erreur lors de la verification de l'existence de ficheDePoste (intitule=" + intitule + ", organisation=" + id_organisation + "): " + err);
                callback(false);
            } else {
                if(result.length > 0) {
                    console.log("ficheDePoste (intitule=" + intitule + ", organisation=" + id_organisation + ") existe. - (doesFicheDePosteExist)");
                    callback(true);
                } else {
                    console.log("ficheDePoste (intitule=" + intitule + ", organisation=" + id_organisation + ") non trouvee / echec de la requete SQL. - (doesFicheDePosteExist)");
                    callback(false);
                }
            }
        });
    },
}

