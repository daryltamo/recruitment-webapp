const mongoose = require('mongoose');

const candidatureSchema = new mongoose.Schema({
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'OffreDemploi'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Utilisateur'
    },
    coverLetter: {
        type: String,
        required: true
    },
    resume: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['submitted', 'under review', 'accepted', 'rejected'],
        default: 'submitted'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Candidature', candidatureSchema);