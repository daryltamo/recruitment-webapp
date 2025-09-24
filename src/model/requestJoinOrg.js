const db = require('../../config/db.js');
const jsonResp = require('../utils/jsonResponse.js');

const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

function jsonResponse(statusCode, status, message, data = {}) {
    return jsonResp.jsonResponse(statusCode, status, message, data);
}

module.exports = {
    // Example: Create a new join organization request
    create: function (idUser, orgId, reason, next) {
        const sqlQuery =
            'INSERT INTO request_join_org (idUser, orgId, reason, requestDate) VALUES (?, ?, ?, CURRENT_DATE())';
        db.query(sqlQuery, [idUser, orgId, reason], function (err, result) {
            if (err) {
                logError('Error creating join organization request', {
                    idUser,
                    orgId,
                    reason,
                    err
                });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error creating join organization request.',
                        { error: err }
                    )
                );
            }
            if (result.affectedRows === 1) {
                logDebug('Join organization request created', {
                    id: result.insertId
                });
                next(
                    null,
                    jsonResponse(
                        201,
                        'success',
                        'Join organization request created successfully.',
                        { id: result.insertId }
                    )
                );
            } else {
                logError('Join organization request not created', {
                    idUser,
                    orgId,
                    reason
                });
                next(
                    jsonResponse(
                        400,
                        'error',
                        'Join organization request not created.'
                    )
                );
            }

        });
    },

    read: function (idRequest, next) {
        const sqlQuery = 'SELECT * FROM request_join_org WHERE idRequest = ?';
        db.query(sqlQuery, [idRequest], function (err, results) {
            if (err) {
                logError('Error reading join organization request', { idRequest, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error reading join organization request.',
                        { error: err }
                    )
                );
            }
            if (results.length === 1) {
                logDebug('Join organization request read', { idRequest });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Join organization request retrieved successfully.',
                        results[0]
                    )
                );
            } else {
                logError('Join organization request not found', { idRequest });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Join organization request not found.'
                    )
                );
            }
        });
    },

    readAll: function (next) {
        const sqlQuery = 'SELECT * FROM request_join_org';
        db.query(sqlQuery, function (err, results) {
            if (err) {
                logError('Error reading all join organization requests', { err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error reading all join organization requests.',
                        { error: err }
                    )
                );
            }
            logDebug('All join organization requests read', { count: results.length });
            next(
                null,
                jsonResponse(
                    200,
                    'success',
                    'All join organization requests retrieved successfully.',
                    results
                )
            );
        });
    },

    update: function (idRequest, status, next) {
        const sqlQuery = 'UPDATE request_join_org SET status = ? WHERE idRequest = ?';
        db.query(sqlQuery, [status, idRequest], function (err, result) {
            if (err) {
                logError('Error updating join organization request', { idRequest, status, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error updating join organization request.',
                        { error: err }
                    )
                );
            }
            if (result.affectedRows === 1) {
                logDebug('Join organization request updated', { idRequest, status });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Join organization request updated successfully.',
                        { idRequest, status }
                    )
                );
            } else {
                logError('Join organization request not found for update', { idRequest });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Join organization request not found for update.'
                    )
                );
            }
        });
    },

    delete: function (idRequest, next) {
        const sqlQuery = 'DELETE FROM request_join_org WHERE idRequest = ?';
        db.query(sqlQuery, [idRequest], function (err, result) {
            if (err) {
                logError('Error deleting join organization request', { idRequest, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error deleting join organization request.',
                        { error: err }
                    )
                );
            }
            if (result.affectedRows === 1) {
                logDebug('Join organization request deleted', { idRequest });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Join organization request deleted successfully.',
                        { idRequest }
                    )
                );
            } else {
                logError('Join organization request not found for deletion', { idRequest });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Join organization request not found for deletion.'
                    )
                );
            }
        });
    }
    // Add more RESTful methods as needed
};
