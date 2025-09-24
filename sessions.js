const db = require('./config/db.js');
const session = require('express-session');

module.exports = {
    init: () => {
        return session({
            secret: '3B3sX*Gmzq7ub//MINK.PFjx',
            saveUninitialized: true,
            cookie: { maxAge: 3600 * 1000 }, // 60 minutes
            resave: false
        });
    },

    createSession: function(session, mail, role) {
        return new Promise((resolve, reject) => {
            const sqlQuery = 'SELECT nom, prenom, idUser, idOrganization, phoneNumber, accountRegistrationDate FROM utilisateur WHERE email = ?';
            db.query(sqlQuery, [mail], function(err, result) {
                if (err) {
                    console.error('Erreur lors de la requete:', err);
                    reject(err);
                }

                if (result.length > 0) {
                    const user = result[0]; // Un seul utilisateur trouvé
                    session.mail = mail;
                    session.role = role;
                    session.nom = user.nom;
                    session.prenom = user.prenom;
                    session.idUser = user.idUser;
                    session.idOrganization = user.idOrganization;
                    session.phoneNumber = user.phoneNumber;
                    session.date_creation = user.accountRegistrationDate;
                    session.idJobOffer = 0;

                    if (role === 'Administrateur') {
                        session.homepage = '/admin/accueilAdmin';
                    } else if (role === 'Recruteur') {
                        session.homepage = '/recruteur/accueilRecruteur';
                    } else if (role === 'Candidat') {
                        session.homepage = '/candidat/accueilCandidat';
                    } else {
                        session.homepage = '/';
                        console.log('Unknown role: ' + role); // Should never happen
                    }

                    session.save(function(err) {
                        console.log(err);
                    });

                    resolve(true);
                }
                if (err) {reject(err);}
                resolve(false);
            });
        });
    },

    isConnected: (session, role) => {
        if (!session || !session.idUser || session.idUser === undefined) {return false;}
        if (role && session.role !== role) {return false;}
        return true;
    },

    deleteSession: function(session) {
        session.destroy();
    }
};
