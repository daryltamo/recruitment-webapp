const db = require('../../config/db.js');
const jsonResp = require('../utils/jsonResponse.js');


const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

function jsonResponse(statusCode, status, message, data = {}) {
    return jsonResp.jsonResponse(statusCode, status, message, data);
}

module.exports = {
    // Example: Create a new organization request
    create: function (idUser, orgName, orgType, next) {
        const sqlQuery =
            'INSERT INTO request_add_org (idUser, orgName, orgType, requestDate) VALUES (?, ?, ?, CURRENT_DATE())';
        db.query(sqlQuery, [idUser, orgName, orgType], function (err, result) {
            if (err) {
                logError('Error creating organization request', {
                    idUser,
                    orgName,
                    orgType,
                    err
                });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error creating organization request.',
                        { error: err }
                    )
                );
            }
            if (result.affectedRows === 1) {
                logDebug('Organization request created', {
                    id: result.insertId
                });
                next(
                    null,
                    jsonResponse(
                        201,
                        'success',
                        'Organization request created successfully.',
                        { id: result.insertId }
                    )
                );
            } else {
                logError('Organization request not created', {
                    idUser,
                    orgName,
                    orgType
                });
                next(
                    jsonResponse(
                        400,
                        'error',
                        'Organization request not created.'
                    )
                );
            }

        });
    },

    read: function (idRequest, next) {
        const sqlQuery = 'SELECT * FROM request_add_org WHERE idRequest = ?';
        db.query(sqlQuery, [idRequest], function (err, results) {
            if (err) {
                logError('Error reading organization request', { idRequest, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error reading organization request.',
                        { error: err }
                    )
                );
            }
            if (results.length === 1) {
                logDebug('Organization request read', { idRequest });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Organization request retrieved successfully.',
                        results[0]
                    )
                );
            } else {
                logError('Organization request not found', { idRequest });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Organization request not found.'
                    )
                );
            }
        });
    },

    readAll: function (next) {
        const sqlQuery = 'SELECT * FROM request_add_org';
        db.query(sqlQuery, function (err, results) {
            if (err) {
                logError('Error reading all organization requests', { err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error reading all organization requests.',
                        { error: err }
                    )
                );
            }
            logDebug('All organization requests read', { count: results.length });
            next(
                null,
                jsonResponse(
                    200,
                    'success',
                    'All organization requests retrieved successfully.',
                    results
                )
            );
        });
    },

    update: function (idRequest, status, next) {
        const sqlQuery = 'UPDATE request_add_org SET status = ? WHERE idRequest = ?';
        db.query(sqlQuery, [status, idRequest], function (err, result) {
            if (err) {
                logError('Error updating organization request', { idRequest, status, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error updating organization request.',
                        { error: err }
                    )
                );
            }
            if (result.affectedRows === 1) {
                logDebug('Organization request updated', { idRequest, status });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Organization request updated successfully.',
                        { idRequest, status }
                    )
                );
            } else {
                logError('Organization request not found for update', { idRequest });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Organization request not found for update.'
                    )
                );
            }
        });
    },

    delete: function (idRequest, next) {
        const sqlQuery = 'DELETE FROM request_add_org WHERE idRequest = ?';
        db.query(sqlQuery, [idRequest], function (err, result) {
            if (err) {
                logError('Error deleting organization request', { idRequest, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error deleting organization request.',
                        { error: err }
                    )
                );
            }
            if (result.affectedRows === 1) {
                logDebug('Organization request deleted', { idRequest });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Organization request deleted successfully.',
                        { idRequest }
                    )
                );
            } else {
                logError('Organization request not found for deletion', { idRequest });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Organization request not found for deletion.'
                    )
                );
            }
        });
    }
// Add more RESTful methods as needed
};
