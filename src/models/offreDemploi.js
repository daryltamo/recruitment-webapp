const mongoose = require('mongoose');

const offreDemploiSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    company: {
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
    datePosted: {
        type: Date,
        default: Date.now
    },
    requirements: {
        type: [String],
        required: true
    },
    benefits: {
        type: [String]
    }
});

module.exports = mongoose.model('OffreDemploi', offreDemploiSchema);