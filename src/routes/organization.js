const express = require('express');
const router = express.Router();
const organizationModel = require('../model/organization');
const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

// GET all organizations
router.get('/', function (req, res) {
    logDebug('GET /organizations - Fetching all organizations');
    try {
        organizationModel.readall(function (result) {
            if (result) {
                logDebug('GET /organizations - Organizations found');
                res.render('organization', {
                    title: 'Organization List',
                    organizations: result,
                    status: 'success',
                    message: 'Organization list retrieved successfully.'
                });
            } else {
                logDebug('GET /organizations - No organizations found');
                res.status(404).json({
                    error: 'No organizations found.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        logError(
            'GET /organizations - Failed to retrieve organizations',
            error
        );
        res.status(500).json({
            error: 'Failed to retrieve organizations.',
            status: 'error'
        });
    }
});

// GET a specific organization
router.get('/:sirenOrg', function (req, res) {
    const sirenOrg = req.params.sirenOrg;
    logDebug(`GET /organizations/${sirenOrg} - Fetching organization`);
    try {
        organizationModel.read(sirenOrg, function (result) {
            if (result) {
                logDebug(`GET /organizations/${sirenOrg} - Organization found`);
                res.status(200).json({
                    title: 'Organization Details',
                    organization: result,
                    status: 'success',
                    message: 'Organization details retrieved successfully.'
                });
            } else {
                logDebug(
                    `GET /organizations/${sirenOrg} - Organization not found`
                );
                res.status(404).json({
                    error: 'Organization not found.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        logError(
            `GET /organizations/${sirenOrg} - Failed to retrieve organization`,
            error
        );
        res.status(500).json({
            error: 'Failed to retrieve organization.',
            status: 'error'
        });
    }
});

// POST create a new organization
router.post('/addOrganization', function (req, res) {
    logDebug('POST /organizations/addOrganization - Creating new organization');
    try {
        const { sirenOrg, nameOrg, hqOrg, type_assos } = req.body;
        organizationModel.create(
            sirenOrg,
            nameOrg,
            hqOrg,
            type_assos,
            function (success) {
                if (success) {
                    logDebug(
                        'POST /organizations/addOrganization - Organization added successfully'
                    );
                    res.json({
                        message: 'Organization added successfully.',
                        status: 'success'
                    });
                } else {
                    logError(
                        'POST /organizations/addOrganization - Failed to add organization'
                    );
                    res.status(500).json({
                        error: 'Failed to add organization.',
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        logError(
            'POST /organizations/addOrganization - Failed to add organization',
            error
        );
        res.status(500).json({
            error: 'Failed to add organization.',
            status: 'error'
        });
    }
});

// PUT update an organization
router.put('/:sirenOrg', function (req, res) {
    const sirenOrg = req.params.sirenOrg;
    logDebug(`PUT /organizations/${sirenOrg} - Updating organization`);
    try {
        const nameOrg = req.body.nameOrg;
        const hqOrg = req.body.hqOrg;
        const type_assos = req.body.type_assos;
        organizationModel.update(
            sirenOrg,
            nameOrg,
            hqOrg,
            type_assos,
            function (success) {
                if (success) {
                    logDebug(
                        `PUT /organizations/${sirenOrg} - Organization updated successfully`
                    );
                    res.json({
                        message: 'Organization updated successfully.',
                        status: 'success'
                    });
                } else {
                    logError(
                        `PUT /organizations/${sirenOrg} - Failed to update organization`
                    );
                    res.status(500).json({
                        error: 'Failed to update organization.',
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        logError(
            `PUT /organizations/${sirenOrg} - Failed to update organization`,
            error
        );
        res.status(500).json({
            error: 'Failed to update organization.',
            status: 'error'
        });
    }
});

// DELETE remove an organization
router.delete('/:sirenOrg', function (req, res) {
    const sirenOrg = req.params.sirenOrg;
    logDebug(`DELETE /organizations/${sirenOrg} - Deleting organization`);
    try {
        organizationModel.delete(sirenOrg, function (success) {
            if (success) {
                logDebug(
                    `DELETE /organizations/${sirenOrg} - Organization deleted successfully`
                );
                res.json({
                    message: 'Organization deleted successfully.',
                    status: 'success'
                });
            } else {
                logError(
                    `DELETE /organizations/${sirenOrg} - Failed to delete organization`
                );
                res.status(500).json({
                    error: 'Failed to delete organization.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        logError(
            `DELETE /organizations/${sirenOrg} - Failed to delete organization`,
            error
        );
        res.status(500).json({
            error: 'Failed to delete organization.',
            status: 'error'
        });
    }
});

module.exports = router;
