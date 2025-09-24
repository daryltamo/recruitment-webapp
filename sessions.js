var db = require('./model/db.js');
var session = require("express-session");

module.exports = {
    init: () => {
    return session({
        secret: "3B3sX*Gmzq7ub//MINK.PFjx",
        saveUninitialized: true,
        cookie: { maxAge: 3600 * 1000 }, // 60 minutes
        resave: false
    });
    },

    createSession: function (session, mail, role) {
        return new Promise((resolve, reject) => {
                let sql_query = "SELECT nom, prenom, id_utilisateur, id_organisation, num_telephone, date_creation_compte FROM utilisateur WHERE email = ?";
                db.query(sql_query, [mail], function (err, result) {
                    if (err) {
                        console.error("Erreur lors de la requete:", err);
                        reject(err);
                    }

                    if (result.length > 0) {
                        const user = result[0]; // Un seul utilisateur trouvé
                        session.mail = mail;
                        session.role = role;
                        session.nom = user.nom;
                        session.prenom = user.prenom;
                        session.id_utilisateur = user.id_utilisateur;
                        session.id_organisation = user.id_organisation;
                        session.num_telephone = user.num_telephone;
                        session.date_creation = user.date_creation_compte;
                        session.id_offre_demploi = 0;

                        if(role === "Administrateur") {
                            session.homepage = "/admin/accueilAdmin";
                        } else if (role === "Recruteur") {
                            session.homepage = "/recruteur/accueilRecruteur";
                        } else if (role === "Candidat") {
                            session.homepage = "/candidat/accueilCandidat";
                        } else {
                            session.homepage = "/"
                            console.log("Unknown role: " + role); // Should never happen
                        }

                        if(role === "Administrateur") {
                            session.homepage = "/admin/accueilAdmin";
                        } else if (role === "Recruteur") {
                            session.homepage = "/recruteur/accueilRecruteur";
                        } else if (role === "Candidat") {
                            session.homepage = "/candidat/accueilCandidat";
                        } else {
                            session.homepage = "/"
                            console.log("Unknown role: " + role); // Should never happen
                        }

                        session.save(function (err) {
                            console.log(err);
                        });

                        resolve(true);
                    }
                if (err) reject(err);
                resolve(false);
            });
        });
    },

    isConnected: (session, role) => {
    if ( !session || !session.id_utilisateur || session.id_utilisateur === undefined) return false;
    if (role && session.role !== role) return false;
    return true;
    },

    deleteSession: function (session) {
        session.destroy();
    },
};
