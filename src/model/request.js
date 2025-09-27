const mongoose = require('mongoose');

const demandeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Utilisateur',
        required: true
    }
});

demandeSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Demande = mongoose.model('Demande', demandeSchema);

module.exports = Demande;