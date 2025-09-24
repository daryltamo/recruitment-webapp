const { promises } = require("fs");
var db = require("./db.js");

module.exports = {
    injection: function(email,mdp){
        return new Promise((resolve, reject) => {
            let sql_query = "SELECT * FROM utilisateur WHERE email = ? AND mot_de_passe = ?";
                db.query(sql_query, [email, mdp], function (err, result) {
                    if (err) {
                        console.error("Erreur lors de la requete:", err);
                        reject(err);
                    }
                    
                    if(result.length > 0)
                    {
                        resolve("Utilisateur trouvé");
                    }
                    else
                    {
                        resolve("Utilisateur non trouvé");
                    }
            });
        });
    }
}