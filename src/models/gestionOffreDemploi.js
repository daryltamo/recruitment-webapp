// This file defines the GestionOffreDemploi model for managing job offers.

const mongoose = require('mongoose');

const gestionOffreDemploiSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    requirements: {
        type: [String],
        required: true
    },
    responsibilities: {
        type: [String],
        required: true
    }
});

module.exports = mongoose.model('GestionOffreDemploi', gestionOffreDemploiSchema);