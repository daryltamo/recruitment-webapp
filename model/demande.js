var db = require("./db.js");

module.exports = {
    create: function (id_organisation, id_utilisateur, type_demande, callback) {
        // ajouter une nouvelle demande dans la BD
        let sql_query = "INSERT INTO demande (id_organisation, id_utilisateur, type_demande) VALUES (?,?,?)";
        
        db.query(sql_query, [id_organisation, id_utilisateur, type_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la creation de demande(id_organisation=" + id_organisation + ", id_utilisateur=" + id_utilisateur + "): " + err);
                callback(false);
            } else {
                if (result.affectedRows === 1) {
                    console.log("demande(id=", result.insertId, ") creee avec succes. - (create)");
                    callback(true); // create demande succeeded
                } else {
                    console.log("Erreur lors de la creation de demande(id_organisation=" + id_organisation + ", id_utilisateur=" + id_utilisateur + "): aucune demande cree /echec de la requete SQL. - (create)");
                    callback(false);
                }
            }
        });
    },

    read: function (id_demande, callback) {
        // recuperer une demande depuis la BD
        let sql_query = "SELECT * FROM demande WHERE id_demande= ?";
        
        db.query(sql_query, [id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (read) de demande(id_demande=" + id_demande + "): " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demande(id_demande=" + id_demande + ") trouvee. - (read)");
                    callback(result[0]);
                } else {
                    console.log("Erreur lors de la lecture de demande(id_demande=" + id_demande + "): aucune demande trouvee / echec de la requete SQL. - (read)");
                    callback(null);
                }
            }
        });
    },

    readall: function (callback) {
        // recuperer toutes les demandes depuis la BD
        let sql_query = "SELECT * FROM demande";

        db.query(sql_query, function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readall) de demande." + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demandes trouvees. - (readall)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande: aucune demande trouvee / echec de la requete SQL. - (readall)");
                    callback(null);
                }
            }
        });
    },

    readallDemandesRejoindreOrg: function (callback) {
        // recuperer toutes les demandes d'attribution d'organisations depuis la BD
        const TYPE_DEMANDE_ATTRIBUTION_ORGANISATION = "demande_joindre_organisation";
        let sql_query = "SELECT * FROM demande WHERE type_demande= ?";

        db.query(sql_query, [TYPE_DEMANDE_ATTRIBUTION_ORGANISATION], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandesRejoindreOrg) de demande." + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("Demandes d'attribution d'organisations trouvees. - (readallDemandesRejoindreOrg)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande: aucune organisation trouvee / echec de la requete SQL. - (readallDemandesRejoindreOrg)");
                    callback(null);
                }
            }
        });
    },

    readallDemandesAjoutOrg: function (callback) {
        // recuperer toutes les demandes de rejoindre une organisation depuis la BD
        const TYPE_DEMANDE_AJOUT_ORGANISATION = "demande_ajout_organisation";
        let sql_query = "SELECT * FROM demande WHERE type_demande= ?";

        db.query(sql_query, [TYPE_DEMANDE_AJOUT_ORGANISATION], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandesAjoutOrg) de demande." + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("Demandes de rejoindre une organisation trouvees. - (readallDemandesAjoutOrg)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande: aucune organisation trouvee / echec de la requete SQL. - (readallDemandesAjoutOrg)");
                    callback(null);
                }
            }
        });
    },

    readallDemandesDevenirRecruteur: function (callback) {
        // recuperer toutes les demandes de devenir recruteur depuis la BD
        const TYPE_DEMANDE_DEVENIR_RECRUTEUR = "demande_devenir_recruteur";
        let sql_query = "SELECT * FROM demande WHERE type_demande= ?";

        db.query(sql_query, [TYPE_DEMANDE_DEVENIR_RECRUTEUR], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandesDevenirRecruteur) de demande." + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("Demandes de devenir recruteur trouvees. - (readallDemandesDevenirRecruteur)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande: aucune organisation trouvee / echec de la requete SQL. - (readallDemandesDevenirRecruteur)");
                    callback(null);
                }
            }
        });
    },

    update: function (id_demande, id_organisation, id_utilisateur, type_demande, callback) {
        // mettre a jour une demande dans la BD
        let sql_query = "UPDATE demande SET id_organisation= ?, id_utilisateur= ?, type_demande= ? WHERE id_demande= ?";
        
        db.query(sql_query, [id_organisation, id_utilisateur, type_demande, id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour de demande(id_demande=" + id_demande + "): " + err);
                callback(false); // update failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("demande(id_demande=" + id_demande + ") mise a jour avec succes. - (update)");
                    callback(true); // update demande succeeded
                } else {
                    console.log("Erreur lors de la mise a jour de demande(id_demande=" + id_demande + "): aucune demande trouvee/ echec de la requete SQL. - (update)");
                    callback(false); // update failed
                }
            }
        });
    },
    
    delete: function (id_demande, callback) {
        // supprimer une demande de la BD
        let sql_query = "DELETE FROM demande WHERE id_demande= ?";
        
        db.query(sql_query, [id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la suppression de demande(id_demande=" + id_demande + "): " + err);
                callback(false); // delete faile
            } else {
                if(result.affectedRows === 1) {
                    console.log("demande(id_demande=" + id_demande + ") supprimee avec succes. - (delete)");
                    callback(true); // delete demande succeeded
                } else {
                    console.log("Erreur lirs de la suppression de demande(id_demande=" + id_demande + "): aucune demande trouvee / echec de la requete SQL. - (delete)");
                    callback(false); // delete failed
                }
            }
        });
    },

    isDemandValid: function (id_demande, callback) {
        // verifier si une demande est valide
        let sql_query = "SELECT * FROM demande WHERE id_demande= ?";
        
        db.query(sql_query, [id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la verification de validite (isDemandValid) de demande(id_demande=" + id_demande + "): " + err);
                callback(false);
            } else {
                if (result.length === 1) {
                    console.log("demande(id_demande=" + id_demande + ") est valide. - (isDemandValid)");
                    callback(true);
                } else {
                    console.log("demande(id_demande=" + id_demande + ") est invalide / echec de la requete SQL. - (isDemandValid)");
                    callback(false);
                }
            }
        });
    },




    

    // TABLE DEMANDE_AJOUT_ORG : DemandeAjoutOrg

    createDemandeAjoutOrg: function (id_utilisateur, siren_org, nom_org, siege_social, type_assos, callback) {
        // ajouter une nouvelle demande d'ajout d'organisation dans la BD
        const DEFAULT_STATUT_DEMANDE = "En attente";
        const date_creation_demande = new Date();
        let sql_query = "INSERT INTO demande_ajout_org (id_utilisateur, siren_org, nom_org, siege_social, type_assos, statut_demande, date_creation_demande) VALUES (?,?,?,?,?,?,?)";
        
        db.query(sql_query, [id_utilisateur, siren_org, nom_org, siege_social, type_assos, DEFAULT_STATUT_DEMANDE, date_creation_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la creation de demande d'ajout d'organisation(id_utilisateur=" + id_utilisateur + ", siren_org=" + siren_org + "): " + err);
                callback(false);
            } else {
                if (result.affectedRows === 1) {
                    console.log("demande d'ajout d'organisation(id=", result.insertId, ") creee avec succes. - (createDemandeAjoutOrg)");
                    callback(true); // create demande succeeded
                } else {
                    console.log("Erreur lors de la creation de demande d'ajout d'organisation(id_utilisateur=" + id_utilisateur + ", siren_org=" + siren_org + "): aucune demande cree /echec de la requete SQL. - (createDemandeAjoutOrg)");
                    callback(false);
                }
            }
        });
    },

    readDemandeAjoutOrg: function (id_demande, callback) {
        // recuperer une demande d'ajout d'organisation depuis la BD
        let sql_query = "SELECT * FROM demande_ajout_org WHERE id_demande= ?";

        db.query(sql_query, [id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readDemandeAjoutOrg) de demande d'ajout d'organisation(id_demande=" + id_demande + "): " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demande d'ajout d'organisation(id_demande=" + id_demande + ") trouvee. - (readDemandeAjoutOrg)");
                    callback(result[0]);
                } else {
                    console.log("Erreur lors de la lecture de demande d'ajout d'organisation(id_demande=" + id_demande + "): aucune demande trouvee / echec de la requete SQL. - (readDemandeAjoutOrg)");
                    callback(null);
                }
            }
        });
    },

    readallDemandeAjoutOrg: function (callback) {
        // recuperer toutes les demandes d'ajout d'organisations depuis la BD
        let sql_query = "SELECT * FROM demande_ajout_org";

        db.query(sql_query, function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandeAjoutOrg) de demande d'ajout d'organisation." + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demandes d'ajout d'organisations trouvees. - (readallDemandeAjoutOrg)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande d'ajout d'organisation: aucune demande trouvee / echec de la requete SQL. - (readallDemandeAjoutOrg)");
                    callback(null);
                }
            }
        });
    },

    readallDemandeAjoutOrgPending: function (callback) {
        // recuperer toutes les demandes d'ajout d'organisations en attente depuis la BD
        const DESIRED_STATUT_DEMANDE = "En attente";
        let sql_query = "SELECT * FROM demande_ajout_org WHERE statut_demande= ?";

        db.query(sql_query, [DESIRED_STATUT_DEMANDE], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandeAjoutOrgPending) de demande d'ajout d'organisation en attente." + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demandes d'ajout d'organisations en attente trouvees. - (readallDemandeAjoutOrgPending)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande d'ajout d'organisation en attente: aucune demande trouvee / echec de la requete SQL. - (readallDemandeAjoutOrgPending)");
                    callback(null);
                }
            }
        });
    },

    readallDemandeAjoutOrgNotPending: function (callback) {
        // recuperer toutes les demandes d'ajout d'organisations non en attente depuis la BD
        const NOT_DESIRED_STATUT_DEMANDE = "En attente";
        let sql_query = "SELECT * FROM demande_ajout_org WHERE statut_demande != ?";

        db.query(sql_query, [NOT_DESIRED_STATUT_DEMANDE], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandeAjoutOrgNotPending) de demande d'ajout d'organisation non en attente." + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demandes d'ajout d'organisations non en attente trouvees. - (readallDemandeAjoutOrgNotPending)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande d'ajout d'organisation non en attente: aucune demande trouvee / echec de la requete SQL. - (readallDemandeAjoutOrgNotPending)");
                    callback(null);
                }
            }
        });
    },

    readallDemandeAjoutOrgForUtilisateur: function(id_utilisateur, callback) {
        // recuperer toutes les demandes d'ajout d'organisations pour un utilisateur depuis la BD
        let sql_query = "SELECT * FROM demande_ajout_org WHERE id_utilisateur= ?";

        db.query(sql_query, [id_utilisateur], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandeAjoutOrgForUtilisateur) de demande d'ajout d'organisation pour un utilisateur(id_utilisateur=" + id_utilisateur + "): " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demandes d'ajout d'organisations pour un utilisateur(id_utilisateur=" + id_utilisateur + ") trouvees. - (readallDemandeAjoutOrgForUtilisateur)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande d'ajout d'organisation pour un utilisateur(id_utilisateur=" + id_utilisateur + "): aucune demande trouvee / echec de la requete SQL. - (readallDemandeAjoutOrgForUtilisateur)");
                    callback(null);
                }
            }
        });
    },

    updateDemandeAjoutOrg: function (id_demande, id_utilisateur, siren_org, nom_org, siege_social, type_assos, callback) {
        let sql_query = "UPDATE demande_ajout_org SET id_utilisateur= ?, siren_org= ?, nom_org= ?, siege_social= ?, type_assos= ? WHERE id_demande= ?";

        db.query(sql_query, [id_utilisateur, siren_org, nom_org, siege_social, type_assos, id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour de demande d'ajout d'organisation(id_demande=" + id_demande + "): " + err);
                callback(false); // update failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("demande d'ajout d'organisation(id_demande=" + id_demande + ") mise a jour avec succes. - (updateDemandeAjoutOrg)");
                    callback(true); // update demande succeeded
                } else {
                    console.log("Erreur lors de la mise a jour de demande d'ajout d'organisation(id_demande=" + id_demande + "): aucune demande trouvee/ echec de la requete SQL. - (updateDemandeAjoutOrg)");
                    callback(false); // update failed
                }
            }
        });
    },

    updateStatutDemandeAjoutOrg: function (id_demande, statut_demande, callback) {
        // mettre a jour le statut d'une demande d'ajout d'organisation
        let sql_query = "UPDATE demande_ajout_org SET statut_demande= ? WHERE id_demande= ?";

        db.query(sql_query, [statut_demande, id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour de statut de demande d'ajout d'organisation(id_demande=" + id_demande + "): " + err);
                callback(false); // update failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("statut de demande d'ajout d'organisation(id_demande=" + id_demande + ") mis a jour avec succes. - (updateStatutDemandeAjoutOrg)");
                    callback(true); // update demande succeeded
                } else {
                    console.log("Erreur lors de la mise a jour de statut de demande d'ajout d'organisation(id_demande=" + id_demande + "): aucune demande trouvee/ echec de la requete SQL. - (updateStatutDemandeAjoutOrg)");
                    callback(false); // update failed
                }
            }
        });
    },

    acceptDemandeAjoutOrg: function (id_demande, callback) {
        // accepter une demande d'ajout d'organisation
        const DESIRED_STATUT_DEMANDE = "Acceptée";
        const date_validation_demande = new Date();
        let sql_query = "UPDATE demande_ajout_org SET statut_demande= ?, date_validation_demande= ? WHERE id_demande= ?";

        db.query(sql_query, [DESIRED_STATUT_DEMANDE, date_validation_demande, id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de l'acceptation (acceptDemandeAjoutOrg) de demande d'ajout d'organisation(id_demande=" + id_demande + "): " + err);
                callback(false); // accept failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("demande d'ajout d'organisation(id_demande=" + id_demande + ") acceptee avec succes. - (acceptDemandeAjoutOrg)");
                    callback(true); // accept demande succeeded
                } else {
                    console.log("Erreur lors de l'acceptation de demande d'ajout d'organisation(id_demande=" + id_demande + "): aucune demande trouvee / echec de la requete SQL. - (acceptDemandeAjoutOrg)");
                    callback(false); // accept failed
                }
            }
        });
    },

    refuseDemandeAjoutOrg: function (id_demande, callback) {
        // refuser une demande d'ajout d'organisation
        const DESIRED_STATUT_DEMANDE = "Refusée";
        let sql_query = "UPDATE demande_ajout_org SET statut_demande= ? WHERE id_demande= ?";

        db.query(sql_query, [DESIRED_STATUT_DEMANDE, id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors du refus (refuseDemandeAjoutOrg) de demande d'ajout d'organisation(id_demande=" + id_demande + "): " + err);
                callback(false); // refuse failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("demande d'ajout d'organisation(id_demande=" + id_demande + ") refusee avec succes. - (refuseDemandeAjoutOrg)");
                    callback(true); // refuse demande succeeded
                } else {
                    console.log("Erreur lors du refus de demande d'ajout d'organisation(id_demande=" + id_demande + "): aucune demande trouvee / echec de la requete SQL. - (refuseDemandeAjoutOrg)");
                    callback(false); // refuse failed
                }
            }
        });
    },

    deleteDemandeAjoutOrg: function (id_demande, callback) {
        // supprimer une demande d'ajout d'organisation de la BD
        let sql_query = "DELETE FROM demande_ajout_org WHERE id_demande= ?";

        db.query(sql_query, [id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la suppression (deletDemandeAjoutOrg) de demande d'ajout d'organisation(id_demande=" + id_demande + "): " + err);
                callback(false); // delete faile
            } else {
                if(result.affectedRows === 1) {
                    console.log("demande d'ajout d'organisation(id_demande=" + id_demande + ") supprimee avec succes. - (deleteDemandeAjoutOrg)");
                    callback(true); // delete demande succeeded
                } else {
                    console.log("Erreur lirs de la suppression de demande d'ajout d'organisation(id_demande=" + id_demande + "): aucune demande trouvee / echec de la requete SQL. - (deleteDemandeAjoutOrg)");
                    callback(false); // delete failed
                }
            }
        });
    },

    isDemandeAjoutOrgValid: function (id_demande, callback) {
        // verifier si une demande d'ajout d'organisation est valide
        let sql_query = "SELECT * FROM demande_ajout_org WHERE id_demande= ?";
        
        db.query(sql_query, [id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la verification de validite (isDemandeAjoutOrgValid) de demande d'ajout d'organisation(id_demande=" + id_demande + "): " + err);
                callback(false);
            } else {
                if (result.length === 1) {
                    console.log("demande d'ajout d'organisation(id_demande=" + id_demande + ") est valide. - (isDemandeAjoutOrgValid)");
                    callback(true);
                } else {
                    console.log("demande d'ajout d'organisation(id_demande=" + id_demande + ") est invalide / echec de la requete SQL. - (isDemandeAjoutOrgValid)");
                    callback(false);
                }
            }
        });
    },



    // TABLE DEMANDE_JOINDRE_ORG : DemandeJoindreOrg

    createDemandeJoindreOrg: function (id_utilisateur, siren_organisation_cible, nom_organisation_cible, raison, callback) {
        // ajouter une nouvelle demande de joindre une organisation dans la BD
        const DEFAULT_STATUT_DEMANDE = "En attente";
        const date_creation_demande = new Date();
        let sql_query = "INSERT INTO demande_joindre_org (id_utilisateur, siren_organisation_cible, nom_organisation_cible, raison, statut_demande, date_creation_demande) VALUES (?,?,?,?,?,?)";

        db.query(sql_query, [id_utilisateur, siren_organisation_cible, nom_organisation_cible, raison, DEFAULT_STATUT_DEMANDE, date_creation_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la creation de demande de joindre une organisation(id_utilisateur=" + id_utilisateur + ", siren_organisation_cible=" + siren_organisation_cible + "): " + err);
                callback(false);
            } else {
                if (result.affectedRows === 1) {
                    console.log("demande de joindre une organisation(id=", result.insertId, ") creee avec succes. - (createDemandeJoindreOrg)");
                    callback(true); // create demande succeeded
                } else {
                    console.log("Erreur lors de la creation de demande de joindre une organisation(id_utilisateur=" + id_utilisateur + ", siren_organisation_cible=" + siren_organisation_cible + "): aucune demande cree /echec de la requete SQL. - (createDemandeJoindreOrg)");
                    callback(false);
                }
            }
        });
    },

    readDemandeJoindreOrg: function (id_demande, callback) {
        // recuperer une demande de joindre une organisation depuis la BD
        let sql_query = "SELECT * FROM demande_joindre_org WHERE id_demande= ?";

        db.query(sql_query, [id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readDemandeJoindreOrg) de demande de joindre une organisation(id_demande=" + id_demande + "): " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demande de joindre une organisation(id_demande=" + id_demande + ") trouvee. - (readDemandeJoindreOrg)");
                    callback(result[0]);
                } else {
                    console.log("Erreur lors de la lecture de demande de joindre une organisation(id_demande=" + id_demande + "): aucune demande trouvee / echec de la requete SQL. - (readDemandeJoindreOrg)");
                    callback(null);
                }
            }
        });
    },

    readallDemandeJoindreOrg: function (callback) {
        // recuperer toutes les demandes de joindre une organisation depuis la BD
        let sql_query = "SELECT * FROM demande_joindre_org";

        db.query(sql_query, function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandeJoindreOrg) de demande de joindre une organisation." + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demandes de joindre une organisation trouvees. - (readallDemandeJoindreOrg)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande de joindre une organisation: aucune demande trouvee / echec de la requete SQL. - (readallDemandeJoindreOrg)");
                    callback(null);
                }
            }
        });
    },

    readallDemandeJoindreOrgPending: function (callback) {
        // recuperer toutes les demandes de joindre une organisation en attente depuis la BD
        const DESIRED_STATUT_DEMANDE = "En attente";
        let sql_query = "SELECT * FROM demande_joindre_org WHERE statut_demande= ?";

        db.query(sql_query, [DESIRED_STATUT_DEMANDE], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandeJoindreOrgPending) de demande de joindre une organisation en attente." + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demandes de joindre une organisation en attente trouvees. - (readallDemandeJoindreOrgPending)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande de joindre une organisation en attente: aucune demande trouvee / echec de la requete SQL. - (readallDemandeJoindreOrgPending)");
                    callback(null);
                }
            }
        });
    },

    readallDemandeJoindreOrgNotPending: function (callback) {
        // recuperer toutes les demandes de joindre une organisation non en attente depuis la BD
        const NOT_DESIRED_STATUT_DEMANDE = "En attente";
        let sql_query = "SELECT * FROM demande_joindre_org WHERE statut_demande != ?";

        db.query(sql_query, [NOT_DESIRED_STATUT_DEMANDE], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandeJoindreOrgNotPending) de demande de joindre une organisation non en attente." + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demandes de joindre une organisation non en attente trouvees. - (readallDemandeJoindreOrgNotPending)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande de joindre une organisation non en attente: aucune demande trouvee / echec de la requete SQL. - (readallDemandeJoindreOrgNotPending)");
                    callback(null);
                }
            }
        });
    },

    readallDemandeJoindreOrgForUtilisateur: function(id_utilisateur, callback) {
        // recuperer toutes les demandes de joindre une organisation pour un utilisateur depuis la BD
        let sql_query = "SELECT * FROM demande_joindre_org WHERE id_utilisateur= ?";

        db.query(sql_query, [id_utilisateur], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandeJoindreOrgForUtilisateur) de demande de joindre une organisation pour un utilisateur(id_utilisateur=" + id_utilisateur + "): " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demandes de joindre une organisation pour un utilisateur(id_utilisateur=" + id_utilisateur + ") trouvees. - (readallDemandeJoindreOrgForUtilisateur)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande de joindre une organisation pour un utilisateur(id_utilisateur=" + id_utilisateur + "): aucune demande trouvee / echec de la requete SQL. - (readallDemandeJoindreOrgForUtilisateur)");
                    callback(null);
                }
            }
        });
    },

    updateDemandeJoindreOrg: function (id_demande, id_utilisateur, siren_organisation_cible, nom_organisation_cible, raison, callback) {
        // mettre a jour une demande de joindre une organisation dans la BD
        let sql_query = "UPDATE demande_joindre_org SET id_utilisateur= ?, siren_organisation_cible= ?, nom_organisation_cible= ?, raison= ? WHERE id_demande= ?";

        db.query(sql_query, [id_utilisateur, siren_organisation_cible, nom_organisation_cible, raison, id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour de demande de joindre une organisation(id_demande=" + id_demande + "): " + err);
                callback(false); // update failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("demande de joindre une organisation(id_demande=" + id_demande + ") mise a jour avec succes. - (updateDemandeJoindreOrg)");
                    callback(true); // update demande succeeded
                } else {
                    console.log("Erreur lors de la mise a jour de demande de joindre une organisation(id_demande=" + id_demande + "): aucune demande trouvee/ echec de la requete SQL. - (updateDemandeJoindreOrg)");
                    callback(false); // update failed
                }
            }
        });
    },

    updateStatutDemandeJoindreOrg: function (id_demande, statut_demande, callback) {
        // mettre a jour le statut d'une demande de joindre une organisation
        let sql_query = "UPDATE demande_joindre_org SET statut_demande= ? WHERE id_demande= ?";

        db.query(sql_query, [statut_demande, id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour de statut de demande de joindre une organisation(id_demande=" + id_demande + "): " + err);
                callback(false); // update failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("statut de demande de joindre une organisation(id_demande=" + id_demande + ") mis a jour avec succes. - (updateStatutDemandeJoindreOrg)");
                    callback(true); // update demande succeeded
                } else {
                    console.log("Erreur lors de la mise a jour de statut de demande de joindre une organisation(id_demande=" + id_demande + "): aucune demande trouvee/ echec de la requete SQL. - (updateStatutDemandeJoindreOrg)");
                    callback(false); // update failed
                }
            }
        });
    },

    acceptDemandeJoindreOrg: function (id_demande, callback) {
        // accepter une demande de joindre une organisation
        const DESIRED_STATUT_DEMANDE = "Acceptée";
        const date_validation_demande = new Date();
        let sql_query = "UPDATE demande_joindre_org SET statut_demande= ?, date_validation_demande= ? WHERE id_demande= ?";

        db.query(sql_query, [DESIRED_STATUT_DEMANDE, date_validation_demande, id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de l'acceptation (acceptDemandeJoindreOrg) de demande de joindre une organisation(id_demande=" + id_demande + "): " + err);
                callback(false); // accept failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("demande de joindre une organisation(id_demande=" + id_demande + ") acceptee avec succes. - (acceptDemandeJoindreOrg)");
                    callback(true); // accept demande succeeded
                } else {
                    console.log("Erreur lors de l'acceptation de demande de joindre une organisation(id_demande=" + id_demande + "): aucune demande trouvee / echec de la requete SQL. - (acceptDemandeJoindreOrg)");
                    callback(false); // accept failed
                }
            }
        });
    },

    refuseDemandeJoindreOrg: function (id_demande, callback) {
        // refuser une demande de joindre une organisation
        const DESIRED_STATUT_DEMANDE = "Refusée";
        let sql_query = "UPDATE demande_joindre_org SET statut_demande= ? WHERE id_demande= ?";

        db.query(sql_query, [DESIRED_STATUT_DEMANDE, id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors du refus (refuseDemandeJoindreOrg) de demande de joindre une organisation(id_demande=" + id_demande + "): " + err);
                callback(false); // refuse failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("demande de joindre une organisation(id_demande=" + id_demande + ") refusee avec succes. - (refuseDemandeJoindreOrg)");
                    callback(true); // refuse demande succeeded
                } else {
                    console.log("Erreur lors du refus de demande de joindre une organisation(id_demande=" + id_demande + "): aucune demande trouvee / echec de la requete SQL. - (refuseDemandeJoindreOrg)");
                    callback(false); // refuse failed
                }
            }
        });
    },

    deleteDemandeJoindreOrg: function (id_demande, callback) {
        // supprimer une demande de joindre une organisation de la BD
        let sql_query = "DELETE FROM demande_joindre_org WHERE id_demande= ?";

        db.query(sql_query, [id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la suppression (deletDemandeJoindreOrg) de demande de joindre une organisation(id_demande=" + id_demande + "): " + err);
                callback(false); // delete faile
            } else {
                if(result.affectedRows === 1) {
                    console.log("demande de joindre une organisation(id_demande=" + id_demande + ") supprimee avec succes. - (deleteDemandeJoindreOrg)");
                    callback(true); // delete demande succeeded
                } else {
                    console.log("Erreur lirs de la suppression de demande de joindre une organisation(id_demande=" + id_demande + "): aucune demande trouvee / echec de la requete SQL. - (deleteDemandeJoindreOrg)");
                    callback(false); // delete failed
                }
            }
        });
    },

    isDemandeJoindreOrgValid: function (id_demande, callback) {
        // verifier si une demande de joindre une organisation est valide
        let sql_query = "SELECT * FROM demande_joindre_org WHERE id_demande= ?";
        
        db.query(sql_query, [id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la verification de validite (isDemandeJoindreOrgValid) de demande de joindre une organisation(id_demande=" + id_demande + "): " + err);
                callback(false);
            } else {
                if (result.length === 1) {
                    console.log("demande de joindre une organisation(id_demande=" + id_demande + ") est valide. - (isDemandeJoindreOrgValid)");
                    callback(true);
                } else {
                    console.log("demande de joindre une organisation(id_demande=" + id_demande + ") est invalide / echec de la requete SQL. - (isDemandeJoindreOrgValid)");
                    callback(false);
                }
            }
        });
    },



    // TABLE DEMANDE_DEVENIR_ADMIN : DemandeDevenirAdmin

    createDemandeDevenirAdmin: function (id_utilisateur, raison, callback) {
        // ajouter une nouvelle demande de devenir admin dans la BD
        const DEFAULT_STATUT_DEMANDE = "En attente";
        const date_creation_demande = new Date();
        let sql_query = "INSERT INTO demande_devenir_admin (id_utilisateur, raison, statut_demande, date_creation_demande) VALUES (?,?,?,?)";

        db.query(sql_query, [id_utilisateur, raison, DEFAULT_STATUT_DEMANDE, date_creation_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la creation de demande de devenir admin(id_utilisateur=" + id_utilisateur + "): " + err);
                callback(false);
            } else {
                if (result.affectedRows === 1) {
                    console.log("demande de devenir admin(id=", result.insertId, ") creee avec succes. - (createDemandeDevenirAdmin)");
                    callback(true); // create demande succeeded
                } else {
                    console.log("Erreur lors de la creation de demande de devenir admin(id_utilisateur=" + id_utilisateur + "): aucune demande cree /echec de la requete SQL. - (createDemandeDevenirAdmin)");
                    callback(false);
                }
            }
        });
    },

    readDemandeDevenirAdmin: function (id_demande, callback) {
        // recuperer une demande de devenir admin depuis la BD
        let sql_query = "SELECT * FROM demande_devenir_admin WHERE id_demande= ?";

        db.query(sql_query, [id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readDemandeDevenirAdmin) de demande de devenir admin(id_demande=" + id_demande + "): " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demande de devenir admin(id_demande=" + id_demande + ") trouvee. - (readDemandeDevenirAdmin)");
                    callback(result[0]);
                } else {
                    console.log("Erreur lors de la lecture de demande de devenir admin(id_demande=" + id_demande + "): aucune demande trouvee / echec de la requete SQL. - (readDemandeDevenirAdmin)");
                    callback(null);
                }
            }
        });
    },


    readallDemandeDevenirAdmin: function (callback) {
        // recuperer toutes les demandes de devenir admin depuis la BD
        let sql_query = "SELECT * FROM demande_devenir_admin";

        db.query(sql_query, function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandeDevenirAdmin) de demande de devenir admin." + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demandes de devenir admin trouvees. - (readallDemandeDevenirAdmin)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande de devenir admin: aucune demande trouvee / echec de la requete SQL. - (readallDemandeDevenirAdmin)");
                    callback(null);
                }
            }
        });
    },

    readallDemandeDevenirAdminPending: function (callback) {
        // recuperer toutes les demandes de devenir admin en attente depuis la BD
        const DESIRED_STATUT_DEMANDE = "En attente";
        let sql_query = "SELECT * FROM demande_devenir_admin WHERE statut_demande= ?";

        db.query(sql_query, [DESIRED_STATUT_DEMANDE], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandeDevenirAdminPending) de demande de devenir admin en attente." + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demandes de devenir admin en attente trouvees. - (readallDemandeDevenirAdminPending)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande de devenir admin en attente: aucune demande trouvee / echec de la requete SQL. - (readallDemandeDevenirAdminPending)");
                    callback(null);
                }
            }
        });
    },

    readallDemandeDevenirAdminNotPending: function (callback) {
        // recuperer toutes les demandes de devenir admin non en attente depuis la BD
        const NOT_DESIRED_STATUT_DEMANDE = "En attente";
        let sql_query = "SELECT * FROM demande_devenir_admin WHERE statut_demande != ?";

        db.query(sql_query, [NOT_DESIRED_STATUT_DEMANDE], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandeDevenirAdminNotPending) de demande de devenir admin non en attente." + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demandes de devenir admin non en attente trouvees. - (readallDemandeDevenirAdminNotPending)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande de devenir admin non en attente: aucune demande trouvee / echec de la requete SQL. - (readallDemandeDevenirAdminNotPending)");
                    callback(null);
                }
            }
        });
    },

    readallDemandeDevenirAdminForUtilisateur: function(id_utilisateur, callback) {
        // recuperer toutes les demandes de devenir admin pour un utilisateur depuis la BD
        let sql_query = "SELECT * FROM demande_devenir_admin WHERE id_utilisateur= ?";

        db.query(sql_query, [id_utilisateur], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandeDevenirAdminForUtilisateur) de demande de devenir admin pour un utilisateur(id_utilisateur=" + id_utilisateur + "): " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demandes de devenir admin pour un utilisateur(id_utilisateur=" + id_utilisateur + ") trouvees. - (readallDemandeDevenirAdminForUtilisateur)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande de devenir admin pour un utilisateur(id_utilisateur=" + id_utilisateur + "): aucune demande trouvee / echec de la requete SQL. - (readallDemandeDevenirAdminForUtilisateur)");
                    callback(null);
                }
            }
        });
    },

    updateDemandeDevenirAdmin: function (id_demande, id_utilisateur, raison, callback) {
        // mettre a jour une demande de devenir admin dans la BD
        let sql_query = "UPDATE demande_devenir_admin SET id_utilisateur= ?, raison= ? WHERE id_demande= ?";

        db.query(sql_query, [id_utilisateur, raison, id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour de demande de devenir admin(id_demande=" + id_demande + "): " + err);
                callback(false); // update failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("demande de devenir admin(id_demande=" + id_demande + ") mise a jour avec succes. - (updateDemandeDevenirAdmin)");
                    callback(true); // update demande succeeded
                } else {
                    console.log("Erreur lors de la mise a jour de demande de devenir admin(id_demande=" + id_demande + "): aucune demande trouvee/ echec de la requete SQL. - (updateDemandeDevenirAdmin)");
                    callback(false); // update failed
                }
            }
        });
    },

    updateStatutDemandeDevenirAdmin: function (id_demande, statut_demande, callback) {
        // mettre a jour le statut d'une demande de devenir admin
        let sql_query = "UPDATE demande_devenir_admin SET statut_demande= ? WHERE id_demande= ?";

        db.query(sql_query, [statut_demande, id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour de statut de demande de devenir admin(id_demande=" + id_demande + "): " + err);
                callback(false); // update failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("statut de demande de devenir admin(id_demande=" + id_demande + ") mis a jour avec succes. - (updateStatutDemandeDevenirAdmin)");
                    callback(true); // update demande succeeded
                } else {
                    console.log("Erreur lors de la mise a jour de statut de demande de devenir admin(id_demande=" + id_demande + "): aucune demande trouvee/ echec de la requete SQL. - (updateStatutDemandeDevenirAdmin)");
                    callback(false); // update failed
                }
            }
        });
    },

    acceptDemandeDevenirAdmin: function (id_demande, callback) {
        // accepter une demande de devenir admin
        const DESIRED_STATUT_DEMANDE = "Acceptée";
        const date_validation_demande = new Date();
        let sql_query = "UPDATE demande_devenir_admin SET statut_demande= ?, date_validation_demande= ? WHERE id_demande= ?";

        db.query(sql_query, [DESIRED_STATUT_DEMANDE, date_validation_demande, id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de l'acceptation (acceptDemandeDevenirAdmin) de demande de devenir admin(id_demande=" + id_demande + "): " + err);
                callback(false); // accept failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("demande de devenir admin(id_demande=" + id_demande + ") acceptee avec succes. - (acceptDemandeDevenirAdmin)");
                    callback(true); // accept demande succeeded
                } else {
                    console.log("Erreur lors de l'acceptation de demande de devenir admin(id_demande=" + id_demande + "): aucune demande trouvee / echec de la requete SQL. - (acceptDemandeDevenirAdmin)");
                    callback(false); // accept failed
                }
            }
        });
    },

    refuseDemandeDevenirAdmin: function (id_demande, callback) {
        // refuser une demande de devenir admin
        const DESIRED_STATUT_DEMANDE = "Refusée";
        let sql_query = "UPDATE demande_devenir_admin SET statut_demande= ? WHERE id_demande= ?";

        db.query(sql_query, [DESIRED_STATUT_DEMANDE, id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors du refus (refuseDemandeDevenirAdmin) de demande de devenir admin(id_demande=" + id_demande + "): " + err);
                callback(false); // refuse failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("demande de devenir admin(id_demande=" + id_demande + ") refusee avec succes. - (refuseDemandeDevenirAdmin)");
                    callback(true); // refuse demande succeeded
                } else {
                    console.log("Erreur lors du refus de demande de devenir admin(id_demande=" + id_demande + "): aucune demande trouvee / echec de la requete SQL. - (refuseDemandeDevenirAdmin)");
                    callback(false); // refuse failed
                }
            }
        });
    },

    deleteDemandeDevenirAdmin: function (id_demande, callback) {
        // supprimer une demande de devenir admin de la BD
        let sql_query = "DELETE FROM demande_devenir_admin WHERE id_demande= ?";

        db.query(sql_query, [id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la suppression (deleteDemandeDevenirAdmin) de demande de devenir admin(id_demande=" + id_demande + "): " + err);
                callback(false); // delete faile
            } else {
                if(result.affectedRows === 1) {
                    console.log("demande de devenir admin(id_demande=" + id_demande + ") supprimee avec succes. - (deleteDemandeDevenirAdmin)");
                    callback(true); // delete demande succeeded
                } else {
                    console.log("Erreur lirs de la suppression de demande de devenir admin(id_demande=" + id_demande + "): aucune demande trouvee / echec de la requete SQL. - (deleteDemandeDevenirAdmin)");
                    callback(false); // delete failed
                }
            }
        });
    },

    isDemandeDevenirAdminValid: function (id_demande, callback) {
        // verifier si une demande de devenir admin est valide
        let sql_query = "SELECT * FROM demande_devenir_admin WHERE id_demande= ?";
        
        db.query(sql_query, [id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la verification de validite (isDemandeDevenirAdminValid) de demande de devenir admin(id_demande=" + id_demande + "): " + err);
                callback(false);
            } else {
                if (result.length === 1) {
                    console.log("demande de devenir admin(id_demande=" + id_demande + ") est valide. - (isDemandeDevenirAdminValid)");
                    callback(true);
                } else {
                    console.log("demande de devenir admin(id_demande=" + id_demande + ") est invalide / echec de la requete SQL. - (isDemandeDevenirAdminValid)");
                    callback(false);
                }
            }
        });
    },



    // TABLE DEMANDE_DEVENIR_RECRUTEUR : DemandeDevenirRecruteur

    createDemandeDevenirRecruteur: function (id_candidat, id_organisation_cible, nom_organisation_cible,  raison, callback) {
        // ajouter une nouvelle demande de devenir recruteur dans la BD
        const DEFAULT_STATUT_DEMANDE = "En attente";
        const date_creation_demande = new Date();
        let sql_query = "INSERT INTO demande_devenir_recruteur (id_candidat, id_organisation_cible, nom_organisation_cible, raison, statut_demande, date_creation_demande) VALUES (?,?,?,?,?,?)";

        db.query(sql_query, [id_candidat, id_organisation_cible, nom_organisation_cible, raison, DEFAULT_STATUT_DEMANDE, date_creation_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la creation (createDemandeDevenirRecruteur) de demande de devenir recruteur(id_candidat=" + id_candidat + ", id_organisation_cible=" + id_organisation_cible + "): " + err);
                callback(false);
            } else {
                if (result.affectedRows === 1) {
                    console.log("demande de devenir recruteur(id=", result.insertId, ") creee avec succes. - (createDemandeDevenirRecruteur)");
                    callback(true); // create demande succeeded
                } else {
                    console.log("Erreur lors de la creation de demande de devenir recruteur(id_candidat=" + id_candidat + ", id_organisation_cible=" + id_organisation_cible + "): aucune demande cree /echec de la requete SQL. - (createDemandeDevenirRecruteur)");
                    callback(false);
                }
            }
        });
    },


    readDemandeDevenirRecruteur: function (id_demande, callback) {
        // recuperer une demande de devenir recruteur depuis la BD
        let sql_query = "SELECT * FROM demande_devenir_recruteur WHERE id_demande= ?";

        db.query(sql_query, [id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readDemandeDevenirRecruteur) de demande de devenir recruteur(id_demande=" + id_demande + "): " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demande de devenir recruteur(id_demande=" + id_demande + ") trouvee. - (readDemandeDevenirRecruteur)");
                    callback(result[0]);
                } else {
                    console.log("Erreur lors de la lecture de demande de devenir recruteur(id_demande=" + id_demande + "): aucune demande trouvee / echec de la requete SQL. - (readDemandeDevenirRecruteur)");
                    callback(null);
                }
            }
        });
    },


    readallDemandeDevenirRecruteur: function (callback) {
        // recuperer toutes les demandes de devenir recruteur depuis la BD
        let sql_query = "SELECT * FROM demande_devenir_recruteur";

        db.query(sql_query, function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandeDevenirRecruteur) de demande de devenir recruteur." + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demandes de devenir recruteur trouvees. - (readallDemandeDevenirRecruteur)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande de devenir recruteur: aucune demande trouvee / echec de la requete SQL. - (readallDemandeDevenirRecruteur)");
                    callback(null);
                }
            }
        });
    },

    readallDemandeDevenirRecruteurPending: function (callback) {
        // recuperer toutes les demandes de devenir recruteur en attente depuis la BD
        const DESIRED_STATUT_DEMANDE = "En attente";
        let sql_query = "SELECT * FROM demande_devenir_recruteur WHERE statut_demande= ?";

        db.query(sql_query, [DESIRED_STATUT_DEMANDE], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandeDevenirRecruteurPending) de demande de devenir recruteur en attente." + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demandes de devenir recruteur en attente trouvees. - (readallDemandeDevenirRecruteurPending)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande de devenir recruteur en attente: aucune demande trouvee / echec de la requete SQL. - (readallDemandeDevenirRecruteurPending)");
                    callback(null);
                }
            }
        });
    },

    readallDemandeDevenirRecruteurNotPending: function (callback) {
        // recuperer toutes les demandes de devenir recruteur non en attente depuis la BD
        const NOT_DESIRED_STATUT_DEMANDE = "En attente";
        let sql_query = "SELECT * FROM demande_devenir_recruteur WHERE statut_demande != ?";

        db.query(sql_query, [NOT_DESIRED_STATUT_DEMANDE], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandeDevenirRecruteurNotPending) de demande de devenir recruteur non en attente." + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demandes de devenir recruteur non en attente trouvees. - (readallDemandeDevenirRecruteurNotPending)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande de devenir recruteur non en attente: aucune demande trouvee / echec de la requete SQL. - (readallDemandeDevenirRecruteurNotPending)");
                    callback(null);
                }
            }
        });
    },

    readallDemandeDevenirRecruteurForUtilisateur: function(id_candidat, callback) {
        // recuperer toutes les demandes de devenir recruteur pour un utilisateur depuis la BD
        let sql_query = "SELECT * FROM demande_devenir_recruteur WHERE id_candidat= ?";

        db.query(sql_query, [id_candidat], function(err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallDemandeDevenirRecruteurForUtilisateur) de demande de devenir recruteur pour un utilisateur(id_candidat=" + id_candidat + "): " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("demandes de devenir recruteur pour un utilisateur(id_candidat=" + id_candidat + ") trouvees. - (readallDemandeDevenirRecruteurForUtilisateur)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture de demande de devenir recruteur pour un utilisateur(id_candidat=" + id_candidat + "): aucune demande trouvee / echec de la requete SQL. - (readallDemandeDevenirRecruteurForUtilisateur)");
                    callback(null);
                }
            }
        });
    },


    updateDemandeDevenirRecruteur: function (id_demande, id_candidat, id_organisation_cible, nom_organisation_cible, raison, callback) {
        // mettre a jour une demande de devenir recruteur dans la BD
        let sql_query = "UPDATE demande_devenir_recruteur SET id_candidat= ?, id_organisation_cible= ?, nom_organisation_cible= ?, raison= ? WHERE id_demande= ?";

        db.query(sql_query, [id_candidat, id_organisation_cible, nom_organisation_cible, raison, id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour de demande de devenir recruteur(id_demande=" + id_demande + "): " + err);
                callback(false); // update failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("demande de devenir recruteur(id_demande=" + id_demande + ") mise a jour avec succes. - (updateDemandeDevenirRecruteur)");
                    callback(true); // update demande succeeded
                } else {
                    console.log("Erreur lors de la mise a jour de demande de devenir recruteur(id_demande=" + id_demande + "): aucune demande trouvee/ echec de la requete SQL. - (updateDemandeDevenirRecruteur)");
                    callback(false); // update failed
                }
            }
        });
    },

    updateStatutDemandeDevenirRecruteur: function (id_demande, statut_demande, callback) {
        // mettre a jour le statut d'une demande de devenir recruteur
        let sql_query = "UPDATE demande_devenir_recruteur SET statut_demande= ? WHERE id_demande= ?";

        db.query(sql_query, [statut_demande, id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour de statut de demande de devenir recruteur(id_demande=" + id_demande + "): " + err);
                callback(false); // update failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("statut de demande de devenir recruteur(id_demande=" + id_demande + ") mis a jour avec succes. - (updateStatutDemandeDevenirRecruteur)");
                    callback(true); // update demande succeeded
                } else {
                    console.log("Erreur lors de la mise a jour de statut de demande de devenir recruteur(id_demande=" + id_demande + "): aucune demande trouvee/ echec de la requete SQL. - (updateStatutDemandeDevenirRecruteur)");
                    callback(false); // update failed
                }
            }
        });
    },

    acceptDemandeDevenirRecruteur: function (id_demande, callback) {
        // accepter une demande de devenir recruteur
        const DESIRED_STATUT_DEMANDE = "Acceptée";
        const date_validation_demande = new Date();
        let sql_query = "UPDATE demande_devenir_recruteur SET statut_demande= ?, date_validation_demande= ? WHERE id_demande= ?";

        db.query(sql_query, [DESIRED_STATUT_DEMANDE, date_validation_demande, id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de l'acceptation (acceptDemandeDevenirRecruteur) de demande de devenir recruteur(id_demande=" + id_demande + "): " + err);
                callback(false); // accept failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("demande de devenir recruteur(id_demande=" + id_demande + ") acceptee avec succes. - (acceptDemandeDevenirRecruteur)");
                    callback(true); // accept demande succeeded
                } else {
                    console.log("Erreur lors de l'acceptation de demande de devenir recruteur(id_demande=" + id_demande + "): aucune demande trouvee / echec de la requete SQL. - (acceptDemandeDevenirRecruteur)");
                    callback(false); // accept failed
                }
            }
        });
    },

    refuseDemandeDevenirRecruteur: function (id_demande, callback) {
        // refuser une demande de devenir recruteur
        const DESIRED_STATUT_DEMANDE = "Refusée";
        let sql_query = "UPDATE demande_devenir_recruteur SET statut_demande= ? WHERE id_demande= ?";

        db.query(sql_query, [DESIRED_STATUT_DEMANDE, id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors du refus (refuseDemandeDevenirRecruteur) de demande de devenir recruteur(id_demande=" + id_demande + "): " + err);
                callback(false); // refuse failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("demande de devenir recruteur(id_demande=" + id_demande + ") refusee avec succes. - (refuseDemandeDevenirRecruteur)");
                    callback(true); // refuse demande succeeded
                } else {
                    console.log("Erreur lors du refus de demande de devenir recruteur(id_demande=" + id_demande + "): aucune demande trouvee / echec de la requete SQL. - (refuseDemandeDevenirRecruteur)");
                    callback(false); // refuse failed
                }
            }
        });
    },

    deleteDemandeDevenirRecruteur: function (id_demande, callback) {
        // supprimer une demande de devenir recruteur de la BD
        let sql_query = "DELETE FROM demande_devenir_recruteur WHERE id_demande= ?";

        db.query(sql_query, [id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la suppression (deletDemandeDevenirRecruteur) de demande de devenir recruteur(id_demande=" + id_demande + "): " + err);
                callback(false); // delete faile
            } else {
                if(result.affectedRows === 1) {
                    console.log("demande de devenir recruteur(id_demande=" + id_demande + ") supprimee avec succes. - (deleteDemandeDevenirRecruteur)");
                    callback(true); // delete demande succeeded
                } else {
                    console.log("Erreur lirs de la suppression de demande de devenir recruteur(id_demande=" + id_demande + "): aucune demande trouvee / echec de la requete SQL. - (deleteDemandeDevenirRecruteur)");
                    callback(false); // delete failed
                }
            }
        });
    },

    isDemandeDevenirRecruteurValid: function (id_demande, callback) {
        // verifier si une demande de devenir recruteur est valide
        let sql_query = "SELECT * FROM demande_devenir_recruteur WHERE id_demande= ?";
        
        db.query(sql_query, [id_demande], function(err, result) {
            if (err) {
                console.log("Erreur lors de la verification de validite (isDemandeDevenirRecruteurValid) de demande de devenir recruteur(id_demande=" + id_demande + "): " + err);
                callback(false);
            } else {
                if (result.length === 1) {
                    console.log("demande de devenir recruteur(id_demande=" + id_demande + ") est valide. - (isDemandeDevenirRecruteurValid)");
                    callback(true);
                } else {
                    console.log("demande de devenir recruteur(id_demande=" + id_demande + ") est invalide / echec de la requete SQL. - (isDemandeDevenirRecruteurValid)");
                    callback(false);
                }
            }
        });
    },



}

