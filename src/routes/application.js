const express = require('express');
const router = express.Router();
const applicationModel = require('../model/application');
const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

// GET all applications
router.get('/', function (req, res, next) {
    try {
        logDebug('GET /application - Retrieving all applications');
        applicationModel.readall(function (result) {
            if (result) {
                logDebug('GET /application - Applications retrieved', {
                    count: result.length
                });
                res.render('application', {
                    title: 'Application List',
                    applications: result
                });
            } else {
                logError('GET /application - No applications found');
                res.status(404).json({
                    error: 'No applications found.'
                });
            }
        });
    } catch (error) {
        logError('GET /application - Failed to retrieve applications', error);
        res.status(500).json({
            error: 'Failed to retrieve applications.'
        });
        next(error);
    }
});

// GET applications for a specific applicant
router.get('/applicant/:idApplicant', function (req, res, next) {
    try {
        const idApplicant = req.params.idApplicant;
        logDebug(
            'GET /application/applicant/:idApplicant - Retrieving applications for applicant',
            { idApplicant }
        );
        applicationModel.readallforApplicant(idApplicant, function (result) {
            if (result) {
                logDebug(
                    'GET /application/applicant/:idApplicant - Applications found',
                    { idApplicant }
                );
                res.render('application-details', {
                    title: 'Application Details for Applicant ' + idApplicant,
                    application: result
                });
            } else {
                logError(
                    'GET /application/applicant/:idApplicant - Application not found',
                    { idApplicant }
                );
                res.status(404).json({
                    error: 'Application not found.'
                });
            }
        });
    } catch (error) {
        logError(
            'GET /application/applicant/:idApplicant - Failed to retrieve application',
            error
        );
        res.status(500).json({
            error: 'Failed to retrieve application.'
        });
        next(error);
    }
});

// GET applications for a specific job offer
router.get('/offer/:idJobOffer', function (req, res) {
    try {
        const idJobOffer = req.params.idJobOffer;
        logDebug(
            'GET /application/offer/:idJobOffer - Retrieving applications for job offer',
            { idJobOffer }
        );
        applicationModel.readallforOffer(idJobOffer, function (result) {
            if (result) {
                logDebug(
                    'GET /application/offer/:idJobOffer - Applications found',
                    { idJobOffer }
                );
                res.render('application', {
                    title: 'Applications for Job Offer ' + idJobOffer,
                    applications: result
                });
            } else {
                logError(
                    'GET /application/offer/:idJobOffer - No applications found for job offer',
                    { idJobOffer }
                );
                res.status(404).json({
                    error: 'No applications found for this job offer.'
                });
            }
        });
    } catch (error) {
        logError(
            'GET /application/offer/:idJobOffer - Failed to retrieve applications for job offer',
            error
        );
        res.status(500).json({
            error: 'Failed to retrieve applications for job offer.'
        });
    }
});

// POST create a new application
router.post('/addApplication', function (req, res) {
    try {
        const idApplicant = req.body.idApplicant;
        const idJobOffer = req.body.idJobOffer;
        const applicationDate = new Date();
        logDebug('POST /application/addApplication - Creating application', {
            idApplicant,
            idJobOffer,
            applicationDate
        });
        applicationModel.create(idApplicant, idJobOffer, function (success) {
            if (success) {
                logDebug(
                    'POST /application/addApplication - Application created',
                    { idApplicant, idJobOffer, applicationDate }
                );
                res.status(201).json({
                    message: 'Application added successfully.'
                });
            } else {
                logError(
                    'POST /application/addApplication - Failed to add application',
                    { idApplicant, idJobOffer }
                );
                res.status(500).json({
                    error: 'Failed to add application.'
                });
            }
        });
    } catch (error) {
        logError(
            'POST /application/addApplication - Exception occurred',
            error
        );
        res.status(500).json({
            error: 'Failed to add application.'
        });
    }
});

// PUT update an application
router.put('/', function (req, res) {
    try {
        const idApplicant = req.body.idApplicant;
        const idJobOffer = req.body.idJobOffer;
        const applicationDate = new Date();
        logDebug('PUT /application - Updating application', {
            idApplicant,
            idJobOffer,
            applicationDate
        });
        applicationModel.isApplicationValid(
            idApplicant,
            idJobOffer,
            function (isValid) {
                if (isValid === true) {
                    logDebug(
                        'PUT /application - Application is valid for update',
                        { idApplicant, idJobOffer }
                    );
                    // ...existing code for update logic...
                } else {
                    logError(
                        'PUT /application - Application is not valid for update',
                        { idApplicant, idJobOffer }
                    );
                    // ...existing code for invalid application...
                }
            }
        );
    } catch (error) {
        logError('PUT /application - Failed to update application', error);
        res.status(500).json({
            error: 'Failed to update application.'
        });
    }
});

// DELETE remove an application
router.delete('/', function (req, res) {
    try {
        const idApplicant = req.body.idApplicant;
        const idJobOffer = req.body.idJobOffer;
        logDebug('DELETE /application - Deleting application', {
            idApplicant,
            idJobOffer
        });
        applicationModel.isApplicationValid(
            idApplicant,
            idJobOffer,
            function (isValid) {
                if (isValid === true) {
                    logDebug(
                        'DELETE /application - Application is valid for deletion',
                        { idApplicant, idJobOffer }
                    );
                    // ...existing code for delete logic...
                } else {
                    logError(
                        'DELETE /application - Application is not valid for deletion',
                        { idApplicant, idJobOffer }
                    );
                    // ...existing code for invalid application...
                }
            }
        );
    } catch (error) {
        logError('DELETE /application - Failed to delete application', error);
        res.status(500).json({
            error: 'Failed to delete application.'
        });
    }
});

module.exports = router;
