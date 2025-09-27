var express = require('express');
var router = express.Router();
var candidatureModel = require("../../model/candidature");
var multer = require('multer'); // Ajoutez cette ligne pour importer multer
var path = require('path');
var fs = require('fs'); // Importer le module 'fs' pour travailler avec le système de fichiers
var candidatureModel = require("../../model/candidature");

// Définir le chemin vers le dossier 'uploads'
var uploadDirectory = path.join(__dirname, '../../uploads/');

// Vérifier si le dossier 'uploads' existe, sinon le créer
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}


// Configuration de multer
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory); // Utiliser un chemin absolu
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Ajouter l'extension du fichier original
    }
});

var upload = multer({ storage: storage });


router.get('/', function(req, res) {
    // const id_candidat = req.params.id_candidat
    const id_candidat = req.session.id_utilisateur;

    candidatureModel.readallforCandidat(id_candidat, function(results){
        if (results) {
            res.render('../views/candidat/gestionDesCandidaturesCandidat', {
                title: 'MT Rec - Gestion des candidatures du candidat' + id_candidat,
                candidatures: results,
                message: 'Candidatures trouvees'
            });
        } else {
            res.render('../views/candidat/gestionDesCandidaturesCandidat', {
                title: 'MT Rec - Gestion des candidatures du candidat' + id_candidat,
                candidatures: [],
                message: 'Aucune candidature trouvee'
            });
        }
    });
});

router.get('/:id_offre_demploi', function(req, res) {
    const id_offre_demploi = req.params.id_offre_demploi;
    const id_candidat = req.session.id_utilisateur;
    
    
    candidatureModel.readallforCandidat(id_candidat, function(results){
        if (results) {
            res.render('candidat/gestionDesCandidaturesCandidat', {
                title: 'MT Rec - Gestion des candidatures',
                candidatures: results,
                message: 'Candidatures trouvees'
            });
        } else {
            res.render('candidat/gestionDesCandidaturesCandidat', {
                title: 'MT Rec - Gestion des candidatures',
                candidatures: [],
                message: 'Aucune candidature'
            });

        }
    });
});



// Route pour charger plusieurs fichiers distincts (LES METTRE A JOUR)
// TODO: Enregistrer les PIECES_JOINTE dans la base de données
router.put('/upload', upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'lettre_motivation', maxCount: 1 },
    { name: 'autre_document', maxCount: 1 }
]), (req, res) => {
    try {
        // if (!req.files || Object.keys(req.files).length === 0) {});
        //Réccupération du numéro de l'offre et id de l'utilisateur
        if (!req.session.id_utilisateur) {
            const redirectUrl = `/connexion?message=${encodeURIComponent('Vous devez vous connecter pour voir les offres')}`;
            res.redirect(redirectUrl);
        } else {
            // let num = req.query.numero
            // let email = req.session.mail

            const id_offre_demploi = req.query.num_offre;
            id_candidat = req.session.id_utilisateur;

            // console.log("L'email de l'utilisateur est:", email, ". - (POST /candidat/candidatureAUneOffre/upload)");
            // console.log("Le fichier CV est:", req.files.cv[0].filename, ". - (POST /candidat/candidatureAUneOffre/upload)");
            // console.log("Le fichier lettre de motivation est:", req.files.lettre_motivation[0].filename, ". - (POST /candidat/candidatureAUneOffre/upload)");
            // console.log("Le fichier autre document est:", req.files.autre_document[0].filename, ". - (POST /candidat/candidatureAUneOffre/upload)");

            console.log("Le numéro de l'offre est:", id_offre_demploi, ". - (PUT /candidat/gestionDesCandidaturesCandidat/upload)");
            console.log("L'id de l'utilisateur est:", id_candidat, ". - (PUT /candidat/gestionDesCandidaturesCandidat/upload)");
            
            candidatureModel.updateDateCandidature(id_candidat, id_offre_demploi, function(result) {
                if (result) {
                    console.log("Candidature mise a jour avec succes. - (PUT /candidat/gestionDesCandidaturesCandidat/upload)");
        
                    res.status(200).json({
                        message: 'Candidature mise a jour',
                        status: 'success'
                    });
                } else {
                    console.log("Echec de la candidature. - (PUT /candidat/gestionDesCandidaturesCandidat/upload)");
        
                    res.status(500).json({
                        error: 'Echec de la mise a jour de la candidature',
                        status: 'error'
                    });
                }
            });
        }
    } catch (error) {
        console.log("Erreur lors de l'ajout de la candidature" + error + ". - (PUT /candidat/gestionDesCandidaturesCandidat/upload)");
        
        res.status(500).json({
            error: 'Erreur lors de la mise a jour de la candidature',
            status: 'error'
        });
    }
});



router.delete('/:id_offre_demploi', function(req, res) {
    const id_offre_demploi = req.params.id_offre_demploi;
    // const id_candidat = req.session.id_utilisateur;
    const id_candidat = req.body.id_candidat;
    
    candidatureModel.delete(id_candidat, id_offre_demploi, function(result) {
        if (result) {
            res.json({'status': 'success'});
        } else {
            res.json({'status': 'error'});
        }
    });
});



module.exports = router;
