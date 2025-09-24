var express = require('express');
var router = express.Router();
var multer = require('multer'); // Ajoutez cette ligne pour importer multer
var path = require('path');
var fs = require('fs'); // Importer le module 'fs' pour travailler avec le système de fichiers
var candidatureModel = require("../../model/candidature");
var piecejointe = require("../../model/piecesJointes");

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
		const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)+ path.extname(file.originalname)
		cb(null, file.fieldname + '-' + uniqueSuffix);// Ajouter l'extension du fichier original
	}
});

var upload = multer({ storage: storage });


router.get('/', function(req, res) {
	// rediriger vers la liste des offres (côté candidat : /candidat/listeOffres) parce qu'il faut utiliser la routes /candidat/candidatureAUneOffre/:id_fichedeposte qui précise sur quelle offre on veut candidater
	// on pourrait faire mieux: si le numéro de l'offre est dans la session, on le récupère et on affiche la vue ../views/candidat/candidatureAUneOffreForm
	const id_fichedeposte = req.params.id_fichedeposte;

	// let numero = req.query.numero // Reccupération du numéro de l'offre depuis l'url
	// let email = req.session.mail // Reccupération de l'email de l'utilisateur depuis la session

	if (id_fichedeposte === null) {
		console.log("Erreur: id_fichedeposte est null. - (GET /candidat/candidatureAUneOffre/)");
		res.redirect('/candidat/listeOffres');
	} else {
		console.log("Erreur: id_fichedeposte non est null. - (GET /candidat/candidatureAUneOffre/)");

		res.render('../views/candidat/candidatureAUneOffreForm', {
			title: 'MT Rec - Candidature a une offre',
			id_fichedeposte: id_fichedeposte
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
		uploadedFiles[field] = req.files[field].map(file => file.filename);
	}

	const id_offre_demploi = req.query.id_offre;
	const id_candidat = req.session.id_utilisateur;

	const result_candidature = await candidatureModel.create(id_candidat, id_offre_demploi);
	if (result_candidature) {
		console.log("Candidature envoyee avec succes. - (POST /candidat/candidatureAUneOffre/:id_fichedeposte)");
		piecejointe.create(id_candidat, id_offre_demploi, uploadedFiles, function(result_piecejointe) {
		if(result_piecejointe){
			console.log("Pièce jointes enregistrées avec succes. ");
			res.send({
					message: 'Candidature envoyee',
					status: 'success'
			});
		}else{
				console.log("Echec de l'enregistrement des pièces jointes'.");
				res.status(500).send({
					error: 'Echec de l enregistrement des pièces jointes',
					status: 'error'
				});
			}
		});

	} else {
		console.log("Echec de la candidature. - (POST /candidat/candidatureAUneOffre/:id_fichedeposte)");

		res.status(500).send({
			error: 'Echec de la candidature',
			status: 'error'
		});
	}
});

router.get('/:id_offre', function(req, res) {
	const id_offre = req.params.id_offre;
	console.log("DANS CANDIDATURE A UNE OFFRE",id_offre)
	res.render('../views/candidat/candidatureAUneOffreForm', {
		title: 'MT Rec - Candidature a une offre',
		id_offre: id_offre
	});
});

router.post('/:id_offre', function(req, res) {
	const id_offre_demploi = req.params.id_offre;
	id_candidat = req.session.id_utilisateur;

	candidatureModel.create(id_candidat, id_offre_demploi, function(result) {
		if (result) {
			console.log("Candidature envoyee avec succes. - (POST /candidat/candidatureAUneOffre/:id_fichedeposte)");

			res.status(200).json({
				message: 'Candidature envoyee',
				status: 'success'
			});
		} else {
			console.log("Echec de la candidature. - (POST /candidat/candidatureAUneOffre/:id_fichedeposte)");

			res.status(500).json({
				message: 'Echec de la candidature',
				status: 'error'
			});
		}
	});
});


module.exports = router;
