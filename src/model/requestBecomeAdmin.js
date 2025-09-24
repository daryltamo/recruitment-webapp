const db = require('../../config/db.js');
const jsonResp = require('../utils/jsonResponse.js');


const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

function jsonResponse(statusCode, status, message, data = {}) {
    return jsonResp.jsonResponse(statusCode, status, message, data);
}

module.exports = {
    // Example: Create a new join organization request
    create: function (requestUserId, requestReason, next) {
        const sqlQuery =
            'INSERT INTO request_become_admin (request_user_id, request_reason, request_creation_date) VALUES (?, ?, CURRENT_DATE())';
        db.query(sqlQuery, [requestUserId, requestReason], function (err, result) {
            if (err) {
                logError('Error creating become admin request', {
                    requestUserId,
                    requestReason,
                    err
                });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error creating become admin request.',
                        { error: err }
                    )
                );
            }
            if (result.affectedRows === 1) {
                logDebug('Become admin request created', {
                    id: result.insertId
                });
                next(
                    null,
                    jsonResponse(
                        201,
                        'success',
                        'Become admin request created successfully.',
                        { id: result.insertId }
                    )
                );
            } else {
                logError('Become admin request not created', {
                    requestUserId,
                    requestReason
                });
                next(
                    jsonResponse(
                        400,
                        'error',
                        'Become admin request not created.'
                    )
                );
            }

        });
    },

    read: function (idRequest, next) {
        const sqlQuery = 'SELECT * FROM request_become_admin WHERE id_request = ?';
        db.query(sqlQuery, [idRequest], function (err, results) {
            if (err) {
                logError('Error reading become admin request', { idRequest, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error reading become admin request.',
                        { error: err }
                    )
                );
            }
            if (results.length === 1) {
                logDebug('Become admin request read', { idRequest });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Become admin request retrieved successfully.',
                        results[0]
                    )
                );
            } else {
                logError('Become admin request not found', { idRequest });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Become admin request not found.'
                    )
                );
            }
        });
    },

    readAll: function (next) {
        const sqlQuery = 'SELECT * FROM request_become_admin';
        db.query(sqlQuery, function (err, results) {
            if (err) {
                logError('Error reading all become admin requests', { err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error reading all become admin requests.',
                        { error: err }
                    )
                );
            }
            logDebug('All become admin requests read', { count: results.length });
            next(
                null,
                jsonResponse(
                    200,
                    'success',
                    'All become admin requests retrieved successfully.',
                    results
                )
            );
        });
    },

    update: function (idRequest, status, next) {
        const sqlQuery = 'UPDATE request_become_admin SET request_status = ? WHERE id_request = ?';
        db.query(sqlQuery, [status, idRequest], function (err, result) {
            if (err) {
                logError('Error updating become admin request', { idRequest, status, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error updating become admin request.',
                        { error: err }
                    )
                );
            }
            if (result.affectedRows === 1) {
                logDebug('Become admin request updated', { idRequest, status });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Become admin request updated successfully.',
                        { idRequest, status }
                    )
                );
            } else {
                logError('Become admin request not found for update', { idRequest });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Become admin request not found for update.'
                    )
                );
            }
        });
    },

    delete: function (idRequest, next) {
        const sqlQuery = 'DELETE FROM request_become_admin WHERE id_request = ?';
        db.query(sqlQuery, [idRequest], function (err, result) {
            if (err) {
                logError('Error deleting become admin request', { idRequest, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error deleting become admin request.',
                        { error: err }
                    )
                );
            }
            if (result.affectedRows === 1) {
                logDebug('Become admin request deleted', { idRequest });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Become admin request deleted successfully.',
                        { idRequest }
                    )
                );
            } else {
                logError('Become admin request not found for deletion', { idRequest });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Become admin request not found for deletion.'
                    )
                );
            }
        });
    }
// Add more RESTful methods as needed
};
