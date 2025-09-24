var db = require("./db.js");

module.exports = {
    create: function (id_fichedeposte, date_validite, indication, num_docs_req, etat, id_recruteur, callback) {
        // ajouter une nouvelle offreDemploi dans la BD
        let sql_query = "INSERT INTO offreDemploi (id_fichedeposte, date_validite, indication, num_docs_req, etat, id_recruteur) VALUES (?, ?, ?, ?, ?, ?)";
        
        db.query(sql_query, [id_fichedeposte, date_validite, indication, num_docs_req, etat, id_recruteur], function (err, result) {
            if (err) {
                console.log("Erreur lors de la creation de offreDemploi(id_fichedeposte=", id_fichedeposte, "): " + err);
                callback(false);
            } else {
                if (result.affectedRows === 1) {
                    console.log("offreDemploi(id_fichedeposte=", result.insertId, ") creee avec succes. - (create)");
                    callback(true); // create offreDemploi succeeded
                } else {
                    console.log("Erreur lors de la creation de offreDemploi(id_fichedeposte=", id_fichedeposte, "): aucune offreDemploi creee / echec de la requete SQL. - (create)");
                    callback(false);
                }
            }
        });
    },

    read: function (num_offre, callback) {
        // recuperer une offreDemploi depuis la BD
        let sql_query = "SELECT * FROM offreDemploi WHERE num= ?";
        
        db.query(sql_query, [num_offre], function (err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (read) de offreDemploi(num=", num_offre, "): " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("offreDemploi(num=", num_offre, ") trouvee. - (read)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture (read) de offreDemploi(num=", num_offre, "): aucune offreDemploi trouvee / echec de la requete SQL. - (read)");
                    callback(null);
                }
            }
        });
    },

    readall:function (callback) {
        // recuperer toutes les offresDemploi depuis la BD
        let sql_query = "SELECT * FROM offreDemploi";
        
        db.query(sql_query, function (err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readall) des offresDemploi: " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("offresDemploi trouvees. - (readall)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture (readall) de offresDemploi: aucune offreDemploi trouvee /echec de la requete SQL. - (readall)");
                    callback(null);
                }
            }
        });
    },

    readallInOrganisation: function (id_organisation, callback) {
        // recuperer toutes les offresDemploi d'un recruteur depuis la BD
        let sql_query = "SELECT * FROM offreDemploi WHERE id_recruteur IN (SELECT id_utilisateur FROM utilisateur WHERE id_organisation= ?)";
        
        db.query(sql_query, [id_organisation], function (err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallInOrganisation) des offresDemploi: " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("offresDemploi trouvees. - (readallInOrganisation)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture (readallInOrganisation) de offresDemploi: aucune offreDemploi trouvee / echec de la requete SQL. - (readallInOrganisation)");
                    callback(null);
                }
            }
        });
    },

    readallPublished: function (callback) {
        // recuperer toutes les offresDemploi publiees depuis la BD
        const NEED_OFFER_STATE = "publié";
        let sql_query = "SELECT * FROM offreDemploi WHERE etat= ?";

        db.query(sql_query, [NEED_OFFER_STATE], function (err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallPublished) des offresDemploi: " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("offresDemploi publiees trouvees. - (readallPublished)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture (readallPublished) de offresDemploi: aucune offreDemploi trouvee / echec de la requete SQL. - (readallPublished)");
                    callback(null);
                }
            }
        });
    },

    readallPublishedInOrganisation: function (id_organisation, callback) {
        // recuperer toutes les offresDemploi publiees d'un recruteur depuis la BD
        const NEED_OFFER_STATE = "publié";
        let sql_query = "SELECT * FROM offreDemploi WHERE etat= ? AND id_recruteur IN (SELECT id_utilisateur FROM utilisateur WHERE id_organisation= ?)";
        
        db.query(sql_query, [NEED_OFFER_STATE, id_organisation], function (err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallPublishedInOrganisation) des offresDemploi: " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("offresDemploi publiees trouvees. - (readallPublishedInOrganisation)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture (readallPublishedInOrganisation) de offresDemploi: aucune offreDemploi trouvee / echec de la requete SQL. - (readallPublishedInOrganisation)");
                    callback(null);
                }
            }
        });
    },

    readOffersWithLinkedDatas: function (callback) {
        // recuperer toutes les offresDemploi publiees depuis la BD
        const NEED_OFFER_STATE = "publié";
        let sql_query = "SELECT * FROM offreDemploi NATURAL JOIN ficheDePoste WHERE etat= ?";

        db.query(sql_query, [NEED_OFFER_STATE], function (err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readallPublishedDetails) des offresDemploi: " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("offresDemploi publiees trouvees. - (readallPublishedDetails)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture (readallPublishedDetails) de offresDemploi: aucune offreDemploi trouvee / echec de la requete SQL. - (readallPublishedDetails)");
                    callback(null);
                }
            }
        });
    },

    update:function (num_offre, date_validite, indication, num_docs_req, etat, recruteur, callback) {
        // mettre a jour une offreDemploi dans la BD
        let sql_query = "UPDATE offreDemploi SET date_validite= ?, indication= ?, num_docs_req= ?, etat= ?, id_recruteur= ? WHERE num= ?";
        
        db.query(sql_query, [date_validite, indication, num_docs_req, etat, recruteur, num_offre], function (err, result) {
            if (err) {
                console.log("Erreur lors de la mise a jour de offreDemploi(num_offre=", num_offre, "): " + err);
                callback(false);
            } else {
                if (result.affectedRows === 1) {
                    console.log("offreDemploi(num_offre=", num_offre, ") mise a jour avec succes. - (update)");
                    callback(true); // update offreDemploi succeeded
                } else {
                    console.log("Erreur lors de la mise a jour de offreDemploi(num_offre=", num_offre, "): aucune offreDemploi trouvee / echec de la requete SQL. - (update)");
                    callback(false);
                }
            }
        });
    },

    delete: function (num_offre, callback) {
        // supprimer une offreDemploi de la BD
        let sql_query = "DELETE FROM offreDemploi WHERE num= ?";
        
        db.query(sql_query, [num_offre], function (err, result) {
            if (err) {
                console.log("Erreur lors de la suppression de offreDemploi(num_offre=", num_offre, "): " + err);
                callback(false);
            } else {
                if (result.affectedRows === 1){
                    console.log("offreDemploi(num_offre=", num_offre, ") supprimee avec succes. - (delete)");
                    callback(true); // delete offreDemploi succeeded
                } else {
                    console.log("Erreur lors de la suppression de offreDemploi(num_offre=", num_offre, "): aucune offreDemploi trouvee / echec de la requete SQL. - (delete)");
                    callback(false);
                }
            }
        });
    },

    isOfferValid: function (num_offre, callback) {
        // verifier si une offreDemploi est valide
        let sql_query = "SELECT date_validite FROM offreDemploi WHERE num_offre = ?";
        
        db.query(sql_query, [num_offre], function (err, result) {
            if (err) {
                console.log("Erreur lors de la verification de validite (isOfferValid) de offreDemploi(num_offre=", num_offre, "): " + err);
                callback(false); // offreDemploi is invalid
            } else {
                if (result.length === 1) {
                    const date_validite_offer = new Date(result[0].date_validite);
                    const currentDate = new Date();
                    // Check if date_validite is greater than the current date
                    if (date_validite_offer > currentDate) {
                        console.log("offreDemploi(num_offre=", num_offre, ") validee. - (isOfferValid)");
                        callback(true); // offreDemploi is valid
                    } else {
                        console.log("offreDemploi(num_offre=", num_offre, ") invalide: date de validite expiree. - (isOfferValid)");
                        callback(false); // offreDemploi is invalid
                    }
                } else {
                    console.log("Erreur lors de la verification de validite de offreDemploi(num_offre=", num_offre, "): aucune offreDemploi trouvee / echec de la requete SQL. - (isOfferValid)");
                    callback(false); // offreDemploi is invalid
                }
            }
        });
    },

    markOfferExpired: function(num_offre, callback) {
        // marquer une offreDemploi comme expirée
        const NEED_OFFER_STATE = "expiré"
        let sql_query = "UPDATE offreDemploi SET etat= ? WHERE num= ?";

        db.query(sql_query, [NEED_OFFER_STATE, num_offre], function (err, result) {
            if (err) {
                console.log("Erreur lors de l'expiration (markOfferExpired) de offreDemploi(num_offre=", num_offre, "): " + err);
                callback(false); // mark offer expired failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("offreDemploi(num_offre=", num_offre, ") expiree avec succes. - (markOfferExpired)");
                    callback(true); // mark offer expired succeeded
                } else {
                    console.log("Erreur lors de l'expiration de offreDemploi(num_offre=", num_offre, "): aucune offreDemploi trouvee / echec de la requete SQL. - (markOfferExpired)");
                    callback(false); // mark offer expired failed
                }
            }
        });
    },
    
    publishOffer: function (num_offre, callback) {
        // publier une offreDemploi
        const NEED_OFFER_STATE = "publié"
        let sql_query = "UPDATE offreDemploi SET etat= ? WHERE num= ?";
        
        db.query(sql_query, [NEED_OFFER_STATE, num_offre], function (err, result) {
            if (err) {
                console.log("Erreur lors de la publication de offreDemploi(num_offre=", num_offre, "): " + err);
                callback(false); // publish offreDemploi failed
            } else {
                if (result.affectedRows === 1) {
                    console.log("offreDemploi(num_offre=", num_offre, ") publiee avec succes. - (publishOffer)");
                    callback(true); // publish offreDemploi succeeded
                } else {
                    console.log("Erreur lors de la publication de offreDemploi(num_offre=", num_offre, "): aucune offreDemploi trouvee / echec de la requete SQL. - (publishOffer)");
                    callback(false); // publish offreDemploi failed
                }
            }
        });
    },

    readOfferWithLinkedDatas: function (idoffer, callback) {
        // recuperer toutes les offresDemploi publiees depuis la BD
        let sql_query = "SELECT * FROM offreDemploi NATURAL JOIN ficheDePoste WHERE num=?";
        db.query(sql_query, [idoffer], function (err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readOffersWithLinkedDatas) des offresDemploi: " + err);
                callback(null);
            } else {
                if (result.length > 0) {
                    console.log("offresDemploi publiees trouvees. - (readOffersWithLinkedDatas)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture (readOffersWithLinkedDatas) de offresDemploi: aucune offreDemploi trouvee / echec de la requete SQL. - (readOffersWithLinkedDatas)");
                    callback(null);
                }
            }
        });
    },

    readFilteredOffersWithLinkedDatas: function (salaire, type_metier, nom_organisation, lieu_mission, intitule, callback) {
        // recuperer toutes les offresDemploi publiees depuis la BD
        const NEED_OFFER_STATE = "publié";
        console.log("Salaire : ", salaire);
        let sql_query = "SELECT * FROM offreDemploi NATURAL JOIN ficheDePoste JOIN organisation ON ficheDePoste.id_organisation = organisation.siren WHERE etat=? AND salaire >=? AND type_metier LIKE CONCAT('%',?) AND nom LIKE CONCAT('%',?) AND lieu_mission LIKE CONCAT('%',?) AND intitule LIKE CONCAT('%',CONCAT(?,'%'))";

        db.query(sql_query, [NEED_OFFER_STATE, salaire, type_metier, nom_organisation, lieu_mission, intitule], function (err, result) {
            if (err) {
                console.log("Erreur lors de la lecture (readOffersWithLinkedDatas) des offresDemploi: " + err);
                callback(null);
            } else {
                if (result.length >= 0) {
                    console.log("offresDemploi publiees trouvees. - (readOffersWithLinkedDatas)");
                    callback(result);
                } else {
                    console.log("Erreur lors de la lecture (readOffersWithLinkedDatas) de offresDemploi: aucune offreDemploi trouvee / echec de la requete SQL. - (readOffersWithLinkedDatas)");
                    callback(null);
                }
            }
        });
    },

    troncateDate: function (date) {
        const new_date = date;
        const yyyy = new_date.getFullYear();
        let mm = new_date.getMonth() + 1;
        let dd = new_date.getDate();   

        if (dd < 10) dd = '0' + dd;
        if (mm < 10) mm = '0' + mm;

        return dd + '/' + mm + '/' + yyyy;
    }
}

