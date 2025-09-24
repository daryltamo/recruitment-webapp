const express = require('express');
const router = express.Router();
const jobOfferModel = require('../model/jobOffer');
const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

// GET all job offers
router.get('/', function (req, res, next) {
    logDebug('GET /jobOffers - Fetching all job offers');
    try {
        jobOfferModel.readall(function (result) {
            if (result) {
                logDebug('GET /jobOffers - Job offers found');
                res.render('jobOffer', {
                    title: 'Job Offer List',
                    jobOffers: result,
                    status: 'success'
                });
            } else {
                logDebug('GET /jobOffers - No job offers found');
                res.render('jobOffer', {
                    title: 'Job Offer List',
                    jobOffers: [],
                    error: 'No job offers found.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        logError('GET /jobOffers - Failed to retrieve job offers', error);
        res.render('jobOffer', {
            title: 'Job Offer List',
            jobOffers: [],
            error: 'Failed to retrieve job offers.',
            status: 'error'
        });
        next(error);
    }
});

// GET filter offers (placeholder)
router.get('/candidate/filterOffers', function (req, res, next) {
    logDebug('GET /jobOffers/candidate/filterOffers - Filtering job offers');
    try {
        // ...existing code for filtering offers...
    } catch (error) {
        logError(
            'GET /jobOffers/candidate/filterOffers - Failed to filter job offers',
            error
        );
        res.status(500).json({
            error: 'Failed to filter job offers.',
            status: 'error'
        });
        next(error);
    }
});

// GET a specific job offer
router.get('/:offerNumber', function (req, res) {
    const offerNumber = req.params.offerNumber;
    logDebug(`GET /jobOffers/${offerNumber} - Fetching job offer`);
    try {
        jobOfferModel.read(offerNumber, function (result) {
            if (result) {
                logDebug(`GET /jobOffers/${offerNumber} - Job offer found`);
                res.render('jobOffer-details', {
                    title: 'Job Offer Details',
                    jobOffer: result,
                    status: 'success'
                });
            } else {
                logDebug(`GET /jobOffers/${offerNumber} - Job offer not found`);
                res.status(404).json({
                    error: 'Job offer not found.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        logError(
            `GET /jobOffers/${offerNumber} - Failed to retrieve job offer`,
            error
        );
        res.status(500).json({
            error: 'Failed to retrieve job offer.',
            status: 'error'
        });
    }
});

// POST create a new job offer
router.post('/addOffer', function (req, res) {
    logDebug('POST /jobOffers/addOffer - Creating new job offer');
    try {
        const offerNumber = req.body.offerNumber;
        const expirationDate = req.body.expirationDate;
        const indication = req.body.indication;
        const numberOfRequiredDocuments = req.body.numberOfRequiredDocuments;
        const state = req.body.state;
        const recruiter = req.session.idUser;
        jobOfferModel.create(
            offerNumber,
            expirationDate,
            indication,
            numberOfRequiredDocuments,
            state,
            recruiter,
            function (success) {
                if (success) {
                    logDebug(
                        'POST /jobOffers/addOffer - Job offer created successfully'
                    );
                    res.redirect('/recruiter/createOffer');
                } else {
                    logError(
                        'POST /jobOffers/addOffer - Failed to add job offer'
                    );
                    res.status(500).json({
                        error: 'Failed to add job offer.'
                    });
                }
            }
        );
    } catch (error) {
        logError('POST /jobOffers/addOffer - Failed to add job offer', error);
        res.status(500).json({
            error: 'Failed to add job offer.',
            status: 'error'
        });
    }
});

// PUT update a job offer
router.put('/:offerNumber', function (req, res) {
    const offerNumber = req.params.offerNumber;
    logDebug(`PUT /jobOffers/${offerNumber} - Updating job offer`);
    try {
        const expirationDate = req.body.expirationDate;
        const indication = req.body.indication;
        const numberOfRequiredDocuments = req.body.numberOfRequiredDocuments;
        const state = req.body.state;
        const recruiter = req.session.idUser;
        jobOfferModel.update(
            offerNumber,
            expirationDate,
            indication,
            numberOfRequiredDocuments,
            state,
            recruiter,
            function (success) {
                if (success) {
                    logDebug(
                        `PUT /jobOffers/${offerNumber} - Job offer updated successfully`
                    );
                    res.status(200).json({
                        message: 'Job offer updated successfully.',
                        status: 'success'
                    });
                } else {
                    logError(
                        `PUT /jobOffers/${offerNumber} - Failed to update job offer: not found`
                    );
                    res.status(404).json({
                        error: 'Failed to update job offer: not found.',
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        logError(
            `PUT /jobOffers/${offerNumber} - Failed to update job offer`,
            error
        );
        res.status(500).json({
            error: 'Failed to update job offer.',
            status: 'error'
        });
    }
});

// DELETE remove a job offer
router.delete('/:offerNumber', function (req, res, next) {
    const offerNumber = req.params.offerNumber;
    logDebug(`DELETE /jobOffers/${offerNumber} - Deleting job offer`);
    try {
        jobOfferModel.delete(offerNumber, function (success) {
            if (success) {
                logDebug(
                    `DELETE /jobOffers/${offerNumber} - Job offer deleted successfully`
                );
                res.status(200).json({
                    message: 'Job offer deleted successfully.',
                    status: 'success'
                });
            } else {
                logError(
                    `DELETE /jobOffers/${offerNumber} - Failed to delete job offer: not found`
                );
                res.status(404).json({
                    error: 'Failed to delete job offer: not found.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        logError(
            `DELETE /jobOffers/${offerNumber} - Failed to delete job offer`,
            error
        );
        res.status(500).json({
            error: 'Failed to delete job offer.',
            status: 'error'
        });
        next(error);
    }
});

module.exports = router;
