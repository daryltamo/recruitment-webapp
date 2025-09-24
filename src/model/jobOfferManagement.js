const db = require('../../config/db.js');
const jsonResp = require('../utils/jsonResponse.js');

const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

function jsonResponse(statusCode, status, message, data = {}) {
    return jsonResp.jsonResponse(statusCode, status, message, data);
}

module.exports = {
    // Add a new job offer management entry to the database
    create: function (idRecruiter, offerNumber, next) {
        const sqlQuery =
            'INSERT INTO gestionOffreDemploi (recruteur, num_offre_demploi) VALUES (?, ?)';
        db.query(sqlQuery, [idRecruiter, offerNumber], function (err, result) {
            if (err) {
                logError('Error creating job offer management', {
                    idRecruiter,
                    offerNumber,
                    err
                });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error creating job offer management.',
                        { error: err }
                    )
                );
            }
            if (result.affectedRows === 1) {
                logDebug('Job offer management created', {
                    idRecruiter,
                    offerNumber
                });
                next(
                    null,
                    jsonResponse(
                        201,
                        'success',
                        'Job offer management created successfully.',
                        { idRecruiter, offerNumber }
                    )
                );
            } else {
                logError('SQL query failed to create job offer management', {
                    idRecruiter,
                    offerNumber
                });
                next(
                    jsonResponse(
                        400,
                        'error',
                        'SQL query failed to create job offer management.'
                    )
                );
            }
        });
    },

    read: function (idRecruiter, offerNumber, next) {
        // Retrieve a job offer management entry from the database
        const sqlQuery =
            'SELECT * FROM gestionOffreDemploi WHERE recruteur= ? AND num_offre_demploi= ?';
        db.query(sqlQuery, [idRecruiter, offerNumber], function (err, result) {
            if (err) {
                logError('Error reading job offer management', {
                    idRecruiter,
                    offerNumber,
                    err
                });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error reading job offer management.',
                        { error: err }
                    )
                );
            }
            if (result.length > 0) {
                logDebug('Job offer management found', {
                    idRecruiter,
                    offerNumber
                });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Job offer management found.',
                        { management: result[0] }
                    )
                );
            } else {
                logDebug('Job offer management not found', {
                    idRecruiter,
                    offerNumber
                });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Job offer management not found.'
                    )
                );
            }
        });
    },

    readAll: function (next) {
        // Retrieve all job offer management entries from the database
        const sqlQuery = 'SELECT * FROM gestionOffreDemploi';
        db.query(sqlQuery, function (err, result) {
            if (err) {
                logError('Error reading all job offer management entries', {
                    err
                });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error reading all job offer management entries.',
                        { error: err }
                    )
                );
            }
            logDebug('All job offer management entries read', {
                count: result.length
            });
            next(
                null,
                jsonResponse(
                    200,
                    'success',
                    'Job offer management entries retrieved.',
                    { managements: result }
                )
            );
        });
    },

    update: function (idRecruiter, offerNumber, next) {
        // Update a job offer management entry in the database
        const sqlQuery =
            'UPDATE gestionOffreDemploi SET recruteur= ? WHERE num_offre_demploi= ?';
        db.query(sqlQuery, [idRecruiter, offerNumber], function (err, result) {
            if (err) {
                logError('Error updating job offer management', {
                    idRecruiter,
                    offerNumber,
                    err
                });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error updating job offer management.',
                        { error: err }
                    )
                );
            }
            if (result.affectedRows === 1) {
                logDebug('Job offer management updated', {
                    idRecruiter,
                    offerNumber
                });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Job offer management updated successfully.'
                    )
                );
            } else {
                logDebug('Job offer management not found for update', {
                    idRecruiter,
                    offerNumber
                });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Job offer management not found.'
                    )
                );
            }
        });
    },

    delete: function (idRecruiter, offerNumber, next) {
        // Delete a job offer management entry from the database
        const sqlQuery =
            'DELETE FROM gestionOffreDemploi WHERE recruteur= ? AND num_offre_demploi= ?';
        db.query(sqlQuery, [idRecruiter, offerNumber], function (err, result) {
            if (err) {
                logError('Error deleting job offer management', {
                    idRecruiter,
                    offerNumber,
                    err
                });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error deleting job offer management.',
                        { error: err }
                    )
                );
            }
            if (result.affectedRows === 1) {
                logDebug('Job offer management deleted', {
                    idRecruiter,
                    offerNumber
                });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Job offer management deleted.'
                    )
                );
            } else {
                logDebug('Job offer management not found for delete', {
                    idRecruiter,
                    offerNumber
                });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Job offer management not found.'
                    )
                );
            }
        });
    }
    // other functions are to be implemented here
};
