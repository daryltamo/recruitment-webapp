const db = require('../../config/db.js');
const jsonResp = require('../utils/jsonResponse.js');


const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

function jsonResponse(statusCode, status, message, data = {}) {
    return jsonResp.jsonResponse(statusCode, status, message, data);
}

module.exports = {
    // Example: Create a new join organization request
    create: function (requestUserId, requestTargetOrgSiren, requestReason, next) {
        const sqlQuery =
            'INSERT INTO request_become_recruiter (request_user_id, request_target_org_siren, request_reason, request_creation_date) VALUES (?, ?, ?, CURRENT_DATE())';
        db.query(sqlQuery, [requestUserId, requestTargetOrgSiren, requestReason], function (err, result) {
            if (err) {
                logError('Error creating become recruiter request', {
                    requestUserId,
                    requestTargetOrgSiren,
                    requestReason,
                    err
                });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error creating become recruiter request.',
                        { error: err }
                    )
                );
            }
            if (result.affectedRows === 1) {
                logDebug('Become recruiter request created', {
                    id: result.insertId
                });
                next(
                    null,
                    jsonResponse(
                        201,
                        'success',
                        'Become recruiter request created successfully.',
                        { id: result.insertId }
                    )
                );
            } else {
                logError('Become recruiter request not created', {
                    requestUserId,
                    requestTargetOrgSiren,
                    requestReason
                });
                next(
                    jsonResponse(
                        400,
                        'error',
                        'Become recruiter request not created.'
                    )
                );
            }

        });
    },

    read: function (idRequest, next) {
        const sqlQuery = 'SELECT * FROM request_become_recruiter WHERE id_request = ?';
        db.query(sqlQuery, [idRequest], function (err, results) {
            if (err) {
                logError('Error reading become recruiter request', { idRequest, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error reading become recruiter request.',
                        { error: err }
                    )
                );
            }
            if (results.length === 1) {
                logDebug('Become recruiter request read', { idRequest });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Become recruiter request found.',
                        results[0]
                    )
                );
            } else {
                logError('Become recruiter request not found', { idRequest });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Become recruiter request not found.'
                    )
                );
            }
        });
    },

    readAll: function (next) {
        const sqlQuery = 'SELECT * FROM request_become_recruiter';
        db.query(sqlQuery, function (err, results) {
            if (err) {
                logError('Error reading all become recruiter requests', { err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error reading all become recruiter requests.',
                        { error: err }
                    )
                );
            }
            logDebug('All become recruiter requests read', { count: results.length });
            next(
                null,
                jsonResponse(
                    200,
                    'success',
                    'All become recruiter requests found.',
                    results
                )
            );
        });
    },

    update: function (idRequest, status, next) {
        const sqlQuery = 'UPDATE request_become_recruiter SET request_status = ? WHERE id_request = ?';
        db.query(sqlQuery, [status, idRequest], function (err, result) {
            if (err) {
                logError('Error updating become recruiter request', { idRequest, status, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error updating become recruiter request.',
                        { error: err }
                    )
                );
            }
            if (result.affectedRows === 1) {
                logDebug('Become recruiter request updated', { idRequest, status });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Become recruiter request updated successfully.',
                        { idRequest, status }
                    )
                );
            } else {
                logError('Become recruiter request not updated', { idRequest, status });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Become recruiter request not found.'
                    )
                );
            }
        });
    },

    delete: function (idRequest, next) {
        const sqlQuery = 'DELETE FROM request_become_recruiter WHERE id_request = ?';
        db.query(sqlQuery, [idRequest], function (err, result) {
            if (err) {
                logError('Error deleting become recruiter request', { idRequest, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error deleting become recruiter request.',
                        { error: err }
                    )
                );
            }
            if (result.affectedRows === 1) {
                logDebug('Become recruiter request deleted', { idRequest });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Become recruiter request deleted successfully.',
                        { idRequest }
                    )
                );
            } else {
                logError('Become recruiter request not deleted', { idRequest });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Become recruiter request not found.'
                    )
                );
            }
        });
    }
// Add more RESTful methods as needed
};
