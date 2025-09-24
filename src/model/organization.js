const db = require('../../config/db.js');
const jsonResp = require('../utils/jsonResponse.js');

const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

function jsonResponse(statusCode, status, message, data = {}) {
    return jsonResp.jsonResponse(statusCode, status, message, data);
}

module.exports = {
    // Create a new organization
    create: function (siren, name, hq, type, next) {
        const sqlQuery =
            'INSERT INTO organisation (siren, nom, hqOrg, type_assos) VALUES (?, ?, ?, ?)';
        db.query(sqlQuery, [siren, name, hq, type], function (err, result) {
            if (err) {
                logError('Error creating organization', {
                    siren,
                    name,
                    hq,
                    type,
                    err
                });
                next(
                    jsonResponse(
                        500,
                        'error',
                        `Failed to create organization (siren=${siren}): ${err}`
                    )
                );
            } else if (result.affectedRows === 1) {
                logDebug('Organization created', { siren, name });
                next(
                    jsonResponse(
                        201,
                        'success',
                        `Organization (siren=${siren}) created successfully.`
                    )
                );
            } else {
                logError('Organization not created', { siren, name });
                next(
                    jsonResponse(
                        400,
                        'error',
                        `No organization created (siren=${siren}). SQL query failed.`
                    )
                );
            }
        });
    },

    // Read a single organization by siren
    read: function (siren, next) {
        const sqlQuery = 'SELECT * FROM organisation WHERE siren = ?';
        db.query(sqlQuery, [siren], function (err, result) {
            if (err) {
                logError('Error reading organization', { siren, err });
                next(
                    jsonResponse(
                        500,
                        'error',
                        `Failed to read organization (siren=${siren}): ${err}`
                    )
                );
            } else if (result.length > 0) {
                logDebug('Organization found', { siren });
                next(
                    jsonResponse(200, 'success', 'Organization found.', {
                        organization: result[0]
                    })
                );
            } else {
                logError('Organization not found', { siren });
                next(
                    jsonResponse(
                        404,
                        'error',
                        `Organization (siren=${siren}) not found.`
                    )
                );
            }
        });
    },

    // Read all organizations
    readAll: function (next) {
        const sqlQuery = 'SELECT * FROM organisation';
        db.query(sqlQuery, function (err, result) {
            if (err) {
                logError('Error reading organizations', { err });
                next(
                    jsonResponse(
                        500,
                        'error',
                        `Failed to read organizations: ${err}`
                    )
                );
            } else if (result.length > 0) {
                logDebug('Organizations found', { count: result.length });
                next(
                    jsonResponse(200, 'success', 'Organizations found.', {
                        organizations: result
                    })
                );
            } else {
                logError('No organizations found');
                next(jsonResponse(404, 'error', 'No organizations found.'));
            }
        });
    },

    // Update an organization
    update: function (siren, name, hq, type, next) {
        const sqlQuery =
            'UPDATE organisation SET nom = ?, hqOrg = ?, type_assos = ? WHERE siren = ?';
        db.query(sqlQuery, [name, hq, type, siren], function (err, result) {
            if (err) {
                logError('Error updating organization', {
                    siren,
                    name,
                    hq,
                    type,
                    err
                });
                next(
                    jsonResponse(
                        500,
                        'error',
                        `Failed to update organization (siren=${siren}): ${err}`
                    )
                );
            } else if (result.affectedRows === 1) {
                logDebug('Organization updated', { siren, name });
                next(
                    jsonResponse(
                        200,
                        'success',
                        `Organization (siren=${siren}) updated successfully.`
                    )
                );
            } else {
                logError('Organization not found or not updated', {
                    siren,
                    name
                });
                next(
                    jsonResponse(
                        404,
                        'error',
                        `Organization (siren=${siren}) not found or not updated.`
                    )
                );
            }
        });
    },

    // Delete an organization
    delete: function (siren, next) {
        const sqlQuery = 'DELETE FROM organisation WHERE siren = ?';
        db.query(sqlQuery, [siren], function (err, result) {
            if (err) {
                logError('Error deleting organization', { siren, err });
                next(
                    jsonResponse(
                        500,
                        'error',
                        `Failed to delete organization (siren=${siren}): ${err}`
                    )
                );
            } else if (result.affectedRows === 1) {
                logDebug('Organization deleted', { siren });
                next(
                    jsonResponse(
                        200,
                        'success',
                        `Organization (siren=${siren}) deleted successfully.`
                    )
                );
            } else {
                logError('Organization not found or not deleted', { siren });
                next(
                    jsonResponse(
                        404,
                        'error',
                        `Organization (siren=${siren}) not found or not deleted.`
                    )
                );
            }
        });
    },

    // Get all recruiters in an organization
    getRecruitersInOrganization: function (siren, next) {
        const USER_TYPE_RECRUITER = 'Recruiter';
        const sqlQuery =
            'SELECT * FROM utilisateur WHERE userType = ? AND organisation = ?';
        db.query(
            sqlQuery,
            [USER_TYPE_RECRUITER, siren],
            function (err, results) {
                if (err) {
                    logError('Error reading recruiters for organization', {
                        siren,
                        err
                    });
                    next(
                        jsonResponse(
                            500,
                            'error',
                            `Failed to read recruiters for organization (siren=${siren}): ${err}`
                        )
                    );
                } else if (results.length > 0) {
                    logDebug('Recruiters found for organization', {
                        siren,
                        count: results.length
                    });
                    next(
                        jsonResponse(200, 'success', 'Recruiters found.', {
                            recruiters: results
                        })
                    );
                } else {
                    logError('No recruiters found for organization', { siren });
                    next(
                        jsonResponse(
                            404,
                            'error',
                            `No recruiters found for organization (siren=${siren}).`
                        )
                    );
                }
            }
        );
    }

    // Other functions can be implemented here
};
