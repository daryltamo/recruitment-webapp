const express = require('express');
const router = express.Router();
const multer = require('multer'); // Ajoutez cette ligne pour importer multer
const path = require('path');
const fs = require('fs'); // Importer le module 'fs' pour travailler avec le système de fichiers
const applicationModel = require('../../model/application');
const attachment = require('../../model/attachment');

// Définir le chemin vers le dossier 'uploads'
const uploadDirectory = path.join(__dirname, '../../uploads/');

// Vérifier si le dossier 'uploads' existe, sinon le créer
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

// Configuration de multer
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory); // Utiliser un chemin absolu
    },
    filename: function (req, file, cb) {
        const uniqueSuffix =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9) +
            path.extname(file.originalname);
        cb(null, file.fieldname + '-' + uniqueSuffix); // Ajouter l'extension du fichier original
    }
});

const upload = multer({ storage: storage });

router.get('/', function (req, res) {
    // rediriger vers la liste des offres (côté candidat : /candidat/listeOffres) parce qu'il faut utiliser la routes /candidat/candidatureAUneOffre/:idJobDescription qui précise sur quelle offre on veut candidater
    // on pourrait faire mieux: si le numéro de l'offre est dans la session, on le récupère et on affiche la vue ../views/candidat/candidatureAUneOffreForm
    const idJobDescription = req.params.idJobDescription;

    // let numero = req.query.numero // Reccupération du numéro de l'offre depuis l'url
    // let email = req.session.mail // Reccupération de l'email de l\'utilisateur depuis la session

    if (idJobDescription === null) {
        console.log(
            'Erreur: idJobDescription est null. - (GET /candidat/candidatureAUneOffre/)'
        );
        res.redirect('/candidat/listeOffres');
    } else {
        console.log(
            'Erreur: idJobDescription non est null. - (GET /candidat/candidatureAUneOffre/)'
        );

        res.render('../views/candidat/candidatureAUneOffreForm', {
            title: 'MT Rec - Candidature a une offre',
            idJobDescription: idJobDescription
        });
    }
});

const fields = [
    { name: 'cv', maxCount: 1 },
    { name: 'lettre_motivation', maxCount: 1 },
    { name: 'autre_document', maxCount: 1 }
];
// Route pour charger plusieurs fichiers distincts
router.post('/upload', upload.fields(fields), async (req, res) => {
    const uploadedFiles = {};
    for (const field in req.files) {
        uploadedFiles[field] = req.files[field].map((file) => file.filename);
    }

    const idJobOffer = req.query.id_offre;
    const idApplicant = req.session.idUser;

    const result_candidature = await applicationModel.create(
        idApplicant,
        idJobOffer
    );
    if (result_candidature) {
        console.log(
            'Candidature envoyee avec succes. - (POST /candidat/candidatureAUneOffre/:idJobDescription)'
        );
        attachment.create(
            idApplicant,
            idJobOffer,
            uploadedFiles,
            function (result_piecejointe) {
                if (result_piecejointe) {
                    console.log('Pièce jointes enregistrées avec succes. ');
                    res.send({
                        message: 'Candidature envoyee',
                        status: 'success'
                    });
                } else {
                    console.log(
                        "Echec de l'enregistrement des pièces jointes."
                    );
                    res.status(500).send({
                        error: 'Echec de l enregistrement des pièces jointes',
                        status: 'error'
                    });
                }
            }
        );
    } else {
        console.log(
            'Echec de la candidature. - (POST /candidat/candidatureAUneOffre/:idJobDescription)'
        );

        res.status(500).send({
            error: 'Echec de la candidature',
            status: 'error'
        });
    }
});

router.get('/:id_offre', function (req, res) {
    const id_offre = req.params.id_offre;
    console.log('DANS CANDIDATURE A UNE OFFRE', id_offre);
    res.render('../views/candidat/candidatureAUneOffreForm', {
        title: 'MT Rec - Candidature a une offre',
        id_offre: id_offre
    });
});

router.post('/:id_offre', function (req, res) {
    const idJobOffer = req.params.id_offre;
    const idApplicant = req.session.idUser;

    applicationModel.create(idApplicant, idJobOffer, function (result) {
        if (result) {
            console.log(
                'Candidature envoyee avec succes. - (POST /candidat/candidatureAUneOffre/:idJobDescription)'
            );

            res.status(200).json({
                message: 'Candidature envoyee',
                status: 'success'
            });
        } else {
            console.log(
                'Echec de la candidature. - (POST /candidat/candidatureAUneOffre/:idJobDescription)'
            );

            res.status(500).json({
                message: 'Echec de la candidature',
                status: 'error'
            });
        }
    });
});

module.exports = router;
