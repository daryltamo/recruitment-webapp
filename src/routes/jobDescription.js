const express = require('express');
const router = express.Router();
const jobDescriptionModel = require('../model/jobDescription');
const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

// GET all job descriptions
router.get('/', function (req, res) {
    try {
        logDebug('GET /jobDescription - Retrieving all job descriptions');
        jobDescriptionModel.readall(function (result) {
            if (result) {
                logDebug('GET /jobDescription - Job descriptions retrieved', {
                    count: result.length
                });
                res.render('jobDescription', {
                    title: 'Job Description List',
                    jobDescriptions: result
                });
            } else {
                logError('GET /jobDescription - No job descriptions found');
                res.status(404).json({
                    error: 'No job descriptions found.'
                });
            }
        });
    } catch (error) {
        logError(
            'GET /jobDescription - Failed to retrieve job descriptions',
            error
        );
        res.status(500).json({
            error: 'Failed to retrieve job descriptions.'
        });
    }
});

// POST create a new job description
router.post('/addJobDescription', function (req, res) {
    try {
        const jobTitle = req.body.jobTitle;
        const idOrganization = req.body.idOrganization;
        const jobStatus = req.body.jobStatus;
        const supervisor = req.body.supervisor;
        const jobType = req.body.jobType;
        const jobLocation = req.body.jobLocation;
        const workSchedule = req.body.workSchedule;
        const salary = req.body.salary;
        const description = req.body.description;
        logDebug(
            'POST /jobDescription/addJobDescription - Creating job description',
            { jobTitle, idOrganization }
        );
        jobDescriptionModel.create(
            jobTitle,
            idOrganization,
            jobStatus,
            supervisor,
            jobType,
            jobLocation,
            workSchedule,
            salary,
            description,
            function (success) {
                if (success) {
                    logDebug(
                        'POST /jobDescription/addJobDescription - Job description created',
                        { jobTitle, idOrganization }
                    );
                    res.status(201).json({
                        message: 'Job description added successfully.'
                    });
                } else {
                    logError(
                        'POST /jobDescription/addJobDescription - Failed to add job description',
                        { jobTitle, idOrganization }
                    );
                    res.status(500).json({
                        error: 'Failed to add job description.'
                    });
                }
            }
        );
    } catch (error) {
        logError(
            'POST /jobDescription/addJobDescription - Exception occurred',
            error
        );
        res.status(500).json({
            error: 'Failed to add job description.'
        });
    }
});

// PUT update a job description
router.put('/', function (req, res) {
    try {
        const jobTitle = req.body.jobTitle;
        const idOrganization = req.body.idOrganization;
        const jobStatus = req.body.jobStatus;
        const supervisor = req.body.supervisor;
        const jobType = req.body.jobType;
        const jobLocation = req.body.jobLocation;
        const workSchedule = req.body.workSchedule;
        const salary = req.body.salary;
        const description = req.body.description;
        logDebug('PUT /jobDescription - Updating job description', {
            jobTitle,
            idOrganization
        });
        jobDescriptionModel.update(
            jobTitle,
            idOrganization,
            jobStatus,
            supervisor,
            jobType,
            jobLocation,
            workSchedule,
            salary,
            description,
            function (success) {
                if (success) {
                    logDebug('PUT /jobDescription - Job description updated', {
                        jobTitle,
                        idOrganization
                    });
                    res.json({
                        message: 'Job description updated successfully.'
                    });
                } else {
                    logError(
                        'PUT /jobDescription - Failed to update job description',
                        { jobTitle, idOrganization }
                    );
                    res.status(500).json({
                        error: 'Failed to update job description.'
                    });
                }
            }
        );
    } catch (error) {
        logError(
            'PUT /jobDescription - Failed to update job description',
            error
        );
        res.status(500).json({
            error: 'Failed to update job description.'
        });
    }
});

// DELETE remove a job description
router.delete('/', function (req, res) {
    try {
        const jobTitle = req.body.jobTitle;
        const idOrganization = req.body.idOrganization;
        logDebug('DELETE /jobDescription - Deleting job description', {
            jobTitle,
            idOrganization
        });
        jobDescriptionModel.delete(
            jobTitle,
            idOrganization,
            function (success) {
                if (success) {
                    logDebug(
                        'DELETE /jobDescription - Job description deleted',
                        { jobTitle, idOrganization }
                    );
                    res.json({
                        message: 'Job description deleted successfully.'
                    });
                } else {
                    logError(
                        'DELETE /jobDescription - Failed to delete job description',
                        { jobTitle, idOrganization }
                    );
                    res.status(500).json({
                        error: 'Failed to delete job description.'
                    });
                }
            }
        );
    } catch (error) {
        logError(
            'DELETE /jobDescription - Failed to delete job description',
            error
        );
        res.status(500).json({
            error: 'Failed to delete job description.'
        });
    }
});

module.exports = router;
