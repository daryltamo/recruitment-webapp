const mongoose = require('mongoose');

const utilisateurSchema = new mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    motDePasse: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['admin', 'recruteur', 'candidat'],
        default: 'candidat'
    },
    dateCreation: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Utilisateur', utilisateurSchema);