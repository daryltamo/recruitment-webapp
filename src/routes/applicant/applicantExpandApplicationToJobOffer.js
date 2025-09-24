const express = require('express');
const router = express.Router();
const jobOfferModel = require('../../model/jobOffer');
const applicationModel = require('../../model/application');

router.get('/', function (req, res) {
    const offerNumber = req.query.offerNumber;
    const idApplicant = req.query.applicantId;
});

router.put('/', function (req, res) {
    const offerNumber = req.query.offerNumber;
    const idApplicant = req.query.applicantId;
});

router.delete('/', function (req, res) {
    const offerNumber = req.query.offerNumber;
    const idApplicant = req.query.applicantId;
});

module.exports = router;
