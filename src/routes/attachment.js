var express = require('express');
var router = express.Router();
var multer = require('multer');
const piecesJointes = require('../model/piecesJointes');
const { stat } = require('fs');


// Set up multer
// Set up storage engine
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Make sure this uploads directory exists
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});


// Initialize multer with the storage configuration
const upload = multer({ storage: storage });


// GET route for /piecesJointes
router.get('/', function(req, res, next) {
    try {
        piecesJointes.readall(function(result) {
            if (result) {
                res.render('piecesJointes', {
                    title: 'Liste des pieces jointes',
                    piecesJointes: result
                });
            } else {
                res.status(404).json({
                    error: 'Aucune piece jointe trouvee.',
                    status: 'error',
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            error: 'Echec de la lecture des pieces jointes.',
            status: 'error',
        });
        console.log('Echec de la lecture des pieces jointes: ' + error);
    }
});

// GET route for /piecesJointes/:id
router.get('/:id', function(req, res, next) {
    try {
        const id_piece_jointe = req.params.id;

        piecesJointes.read(id_piece_jointe, function(result) {
            if (result) {
                res.render('piecesJointes-details', {
                    title: 'Détails de la piece jointe',
                    piecesJointes: result 
                });
            } else {
                res.status(404).json({
                    error: "Piece jointe non trouvee.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            error: "Echec de la lecture de la piece jointe.",
            status: 'error',
        });
        console.log("Echec de la lecture (read) de la piece jointe (id= " + id + "): " + error);
    }
});

// POST route for /piecesJointes
router.post('/addPiecesJointes',  function (req, res, next){
    try {
        const id_candidat = req.body.id_candidat;
        const id_offre_demploi = req.body.id_offre_demploi;
    
        // Access uploaded files
        const resume = req.files['resume'][0];
        const coverLetter = req.files['coverLetter'][0];
    
        // Access filenames
        const resumeFilename = resume.filename;
        const coverLetterFilename = coverLetter.filename;
    
        // Access file paths
        const resumePath = "uploads/" + resumeFilename;
        const coverLetterPath = "uploads/" + coverLetterFilename;
    
        // const { id_piece_jointe, id_candidature_candidat, id_candidature_offre_demploi, chemin_fichier} = req.body;
    
        piecesJointes.create(id_candidat, id_offre_demploi, resumePath, function(success) {
            if (success) {
                res.status(201).json({
                    message: "CV ajoutee avec succes.",
                    status: 'success',
                });
            } else {
                res.status(500).json({
                    error: "Echec de l'ajout de la piece jointe.",
                    status: 'error',
                });
            }
        });

        piecesJointes.create(id_candidat, id_offre_demploi, coverLetterPath, function(success) {
            if (success) {
                res.status(201).json({
                    message: "LM ajoutee avec succes.",
                    status: 'success',
                });
            } else {
                res.status(500).json({
                    error: "Echec de l'ajout de la piece jointe.",
                    status: 'error',
                });
            }
        })
    } catch (error) {
        res.status(500).json({
            error: "Echec de l'ajout de la piece jointe.",
            status: 'error',
        });
        console.log("Echec de l'ajout de la piece jointe: " + error);
    }
});

// PUT route for /piecesJointes/:id
router.put('/:id', function (req, res, next) {
    try {
        const id_piece_jointe = req.params.id;

        piecesJointes.update(id_piece_jointe, function(result) {
            if (result) {
                res.status(200).json({
                    message: "Piece jointe modifiee avec succes.",
                });
            } else {
                res.status(404).json({
                    error: "Piece jointe non trouvee.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            error: "Echec de la mise a jour de la piece jointe.",
            status: 'error',
        });
        console.log("Echec de la mise a jour de la piece jointe (id= " + id + "): " + error);
    }
});

// DELETE route for /piecesJointes/:id
router.delete('/:id', function (req, res, next) {
    try {
        const id_piece_jointe = req.params.id;

        piecesJointes.delete(id_piece_jointe, function(result) {
            if (result) {
                res.status(200).json({
                    message: "Piece jointe supprimee avec succes.",
                });
            } else {
                res.status(404).json({
                    error: "Piece jointe non trouvee.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            error: "Echec de la suppression de la piece jointe.",
            status: 'error',
        });
        console.log("Echec de la suppression de la piece jointe (id= " + id + "): " + error);
    }
});

// GET route for /piecesJointes/:id/download
router.get('/:id/download', function(req, res, next) {
    try {
        const id_piece_jointe = req.params.id;

        piecesJointes.download(id_piece_jointe, function(result) {
            if (result) {
                res.download(result);
            } else {
                res.status(404).json({
                    error: "Piece jointe non trouvee.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            error: "Echec du telechargement de la piece jointe.",
            status: 'error',
        });
        console.log("Echec du telechargement de la piece jointe (id= " + id + "): " + error);
    }
});

// GET route for /piecesJointes/:id/preview
router.get('/:id/preview', function(req, res, next) {
    try {
        const id_piece_jointe = req.params.id;
        
        piecesJointes.download(id_piece_jointe, function(result) {
            if (result) {
                res.render('piecesJointes-preview', {
                    title: 'Preview de la piece jointe',
                    piecesJointes: result
                });
            } else {
                res.status(404).json({
                    error: "Piece jointe non trouvee.",
                    status: 'error',
                });
            }
        });
    } catch (error) {
        res.status(500).json({
            error: "Echec de la lecture de la piece jointe.",
            status: 'error',
        });
        console.log("Echec de la lecture (read) de la piece jointe (id= " + id + "): " + error);
    }
});

// Upload file (add a row in piecesJointes table and put file in uploads folder)
router.post('/upload', function(req, res, next) {
    try {
        piecesJointes.create(req.session.id_utilisateur, req.query.id_offre, function(result) {
            if (result) {
                res.status(201).json({
                    message: "Piece jointe ajoutee avec succes.",
                    status: 'success',
                });
            } else {
                res.status(500).json({
                    error: "Echec de l'ajout de la piece jointe.",
                    status: 'error',
                });
            }
        });
        
    } catch (error) {
        res.status(500).json({
            error: "Echec de l'ajout de la piece jointe.",
            status: 'error',
        });
        console.log("Echec de l'ajout de la piece jointe: " + error);
    }
});



module.exports = router;
