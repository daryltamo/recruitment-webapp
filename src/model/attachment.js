const mongoose = require('mongoose');

const piecesJointesSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    filepath: {
        type: String,
        required: true
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    }
});

const PiecesJointes = mongoose.model('PiecesJointes', piecesJointesSchema);

module.exports = PiecesJointes;