const db = require('../../config/db.js');
const jsonResp = require('../utils/jsonResponse.js');

const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

function jsonResponse(statusCode, status, message, data = {}) {
    return jsonResp.jsonResponse(statusCode, status, message, data);
}

module.exports = {
    create: function (
        idJobDescription,
        expirationDate,
        indication,
        numberOfRequiredDocuments,
        jobOfferState,
        idRecruiter,
        next
    ) {
        // Add a new job offer to the database
        const sqlQuery =
            'INSERT INTO offreDemploi (idJobDescription, expirationDate, indication, numberOfRequiredDocuments, jobOfferState, idRecruiter) VALUES (?, ?, ?, ?, ?, ?)';
        db.query(
            sqlQuery,
            [
                idJobDescription,
                expirationDate,
                indication,
                numberOfRequiredDocuments,
                jobOfferState,
                idRecruiter
            ],
            function (err, result) {
                if (err) {
                    logError('Error creating job offer', {
                        idJobDescription,
                        err
                    });
                    return next(
                        jsonResponse(
                            500,
                            'error',
                            'Database error creating job offer.',
                            { error: err }
                        )
                    );
                }
                if (result.affectedRows === 1) {
                    logDebug('Job offer created', { id: result.insertId });
                    next(
                        null,
                        jsonResponse(
                            201,
                            'success',
                            'Job offer created successfully.',
                            { id: result.insertId }
                        )
                    );
                } else {
                    logError('SQL query failed to create job offer', {
                        idJobDescription
                    });
                    next(
                        jsonResponse(
                            400,
                            'error',
                            'SQL query failed to create job offer.'
                        )
                    );
                }
            }
        );
    },

    read: function (offerNumber, next) {
        // Retrieve a job offer from the database
        const sqlQuery = 'SELECT * FROM offreDemploi WHERE num= ?';
        db.query(sqlQuery, [offerNumber], function (err, result) {
            if (err) {
                logError('Error reading job offer', { offerNumber, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error reading job offer.',
                        { error: err }
                    )
                );
            }
            if (result.length > 0) {
                logDebug('Job offer found', { offer: result[0] });
                next(
                    null,
                    jsonResponse(200, 'success', 'Job offer found.', {
                        offer: result[0]
                    })
                );
            } else {
                logDebug('Job offer not found', { offerNumber });
                next(jsonResponse(404, 'error', 'Job offer not found.'));
            }
        });
    },

    readAll: function (next) {
        // Retrieve all job offers from the database
        const sqlQuery = 'SELECT * FROM offreDemploi';
        db.query(sqlQuery, function (err, result) {
            if (err) {
                logError('Error reading all job offers', err);
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error reading all job offers.',
                        { error: err }
                    )
                );
            }
            logDebug('All job offers read', { count: result.length });
            next(
                null,
                jsonResponse(200, 'success', 'Job offers retrieved.', {
                    offers: result
                })
            );
        });
    },

    readAllInOrganisation: function (idOrganization, next) {
        // Retrieve all job offers for a recruiter from the database
        const sqlQuery =
            'SELECT * FROM offreDemploi WHERE idRecruiter IN (SELECT idUser FROM utilisateur WHERE idOrganization= ?)';
        db.query(sqlQuery, [idOrganization], function (err, result) {
            if (err) {
                logError('Error reading job offers in organisation', {
                    idOrganization,
                    err
                });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error reading job offers in organisation.',
                        { error: err }
                    )
                );
            }
            logDebug('Job offers in organisation read', {
                idOrganization,
                count: result.length
            });
            next(
                null,
                jsonResponse(
                    200,
                    'success',
                    'Job offers in organisation retrieved.',
                    { offers: result }
                )
            );
        });
    },

    readAllPublished: function (next) {
        // Retrieve all published job offers from the database
        const NEED_OFFER_jobOfferState = 'publié';
        const sqlQuery = 'SELECT * FROM offreDemploi WHERE jobOfferState= ?';
        db.query(sqlQuery, [NEED_OFFER_jobOfferState], function (err, result) {
            if (err) {
                logError('Error reading published job offers', { err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error reading published job offers.',
                        { error: err }
                    )
                );
            }
            logDebug('Published job offers read', { count: result.length });
            next(
                null,
                jsonResponse(
                    200,
                    'success',
                    'Published job offers retrieved.',
                    { offers: result }
                )
            );
        });
    },

    readAllPublishedInOrganisation: function (idOrganization, next) {
        // Retrieve all published job offers for a recruiter from the database
        const NEED_OFFER_jobOfferState = 'publié';
        const sqlQuery =
            'SELECT * FROM offreDemploi WHERE jobOfferState= ? AND idRecruiter IN (SELECT idUser FROM utilisateur WHERE idOrganization= ?)';
        db.query(
            sqlQuery,
            [NEED_OFFER_jobOfferState, idOrganization],
            function (err, result) {
                if (err) {
                    logError(
                        'Error reading published job offers in organisation',
                        { idOrganization, err }
                    );
                    return next(
                        jsonResponse(
                            500,
                            'error',
                            'Database error reading published job offers in organisation.',
                            { error: err }
                        )
                    );
                }
                logDebug('Published job offers in organisation read', {
                    idOrganization,
                    count: result.length
                });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Published job offers in organisation retrieved.',
                        { offers: result }
                    )
                );
            }
        );
    },

    readOffersWithLinkedDatas: function (next) {
        // Retrieve all published job offers with linked data from the database
        const NEED_OFFER_jobOfferState = 'publié';
        const sqlQuery =
            'SELECT * FROM offreDemploi NATURAL JOIN ficheDePoste WHERE jobOfferState= ?';
        db.query(sqlQuery, [NEED_OFFER_jobOfferState], function (err, result) {
            if (err) {
                logError(
                    'Error reading published job offers with linked data',
                    { err }
                );
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error reading published job offers with linked data.',
                        { error: err }
                    )
                );
            }
            logDebug('Published job offers with linked data read', {
                count: result.length
            });
            next(
                null,
                jsonResponse(
                    200,
                    'success',
                    'Published job offers with linked data retrieved.',
                    { offers: result }
                )
            );
        });
    },

    update: function (
        offerNumber,
        expirationDate,
        indication,
        numberOfRequiredDocuments,
        jobOfferState,
        idRecruiter,
        next
    ) {
        // Update a job offer in the database
        const sqlQuery =
            'UPDATE offreDemploi SET expirationDate= ?, indication= ?, numberOfRequiredDocuments= ?, jobOfferState= ?, idRecruiter= ? WHERE num= ?';
        db.query(
            sqlQuery,
            [
                expirationDate,
                indication,
                numberOfRequiredDocuments,
                jobOfferState,
                idRecruiter,
                offerNumber
            ],
            function (err, result) {
                if (err) {
                    logError('Error updating job offer', { offerNumber, err });
                    return next(
                        jsonResponse(
                            500,
                            'error',
                            'Database error updating job offer.',
                            { error: err }
                        )
                    );
                }
                if (result.affectedRows === 1) {
                    logDebug('Job offer updated', { offerNumber });
                    next(
                        null,
                        jsonResponse(
                            200,
                            'success',
                            'Job offer updated successfully.'
                        )
                    );
                } else {
                    logDebug('Job offer not found for update', { offerNumber });
                    next(jsonResponse(404, 'error', 'Job offer not found.'));
                }
            }
        );
    },

    delete: function (offerNumber, next) {
        // Delete a job offer from the database
        const sqlQuery = 'DELETE FROM offreDemploi WHERE num= ?';
        db.query(sqlQuery, [offerNumber], function (err, result) {
            if (err) {
                logError('Error deleting job offer', { offerNumber, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error deleting job offer.',
                        { error: err }
                    )
                );
            }
            if (result.affectedRows === 1) {
                logDebug('Job offer deleted', { offerNumber });
                next(null, jsonResponse(200, 'success', 'Job offer deleted.'));
            } else {
                logDebug('Job offer not found for delete', { offerNumber });
                next(jsonResponse(404, 'error', 'Job offer not found.'));
            }
        });
    },

    isOfferValid: function (offerNumber, next) {
        // Check if a job offer is valid
        const sqlQuery =
            'SELECT expirationDate FROM offreDemploi WHERE offerNumber = ?';
        db.query(sqlQuery, [offerNumber], function (err, result) {
            if (err) {
                logError('Error validating job offer', { offerNumber, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error validating job offer.',
                        { error: err }
                    )
                );
            }
            if (result.length === 1) {
                const expirationDate = new Date(result[0].expirationDate);
                const currentDate = new Date();
                const valid = expirationDate > currentDate;
                logDebug('Job offer validation checked', {
                    offerNumber,
                    valid
                });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Job offer validation checked.',
                        { valid }
                    )
                );
            } else {
                logDebug('Job offer not found for validation', { offerNumber });
                next(jsonResponse(404, 'error', 'Job offer not found.'));
            }
        });
    },

    markOfferExpired: function (offerNumber, next) {
        // Mark a job offer as expired
        const NEED_OFFER_jobOfferState = 'expiré';
        const sqlQuery =
            'UPDATE offreDemploi SET jobOfferState= ? WHERE num= ?';
        db.query(
            sqlQuery,
            [NEED_OFFER_jobOfferState, offerNumber],
            function (err, result) {
                if (err) {
                    logError('Error marking job offer as expired', {
                        offerNumber,
                        err
                    });
                    return next(
                        jsonResponse(
                            500,
                            'error',
                            'Database error marking job offer as expired.',
                            { error: err }
                        )
                    );
                }
                if (result.affectedRows === 1) {
                    logDebug('Job offer marked as expired', { offerNumber });
                    next(
                        null,
                        jsonResponse(
                            200,
                            'success',
                            'Job offer marked as expired.'
                        )
                    );
                } else {
                    logDebug('Job offer not found for expiration', {
                        offerNumber
                    });
                    next(jsonResponse(404, 'error', 'Job offer not found.'));
                }
            }
        );
    },

    publishOffer: function (offerNumber, next) {
        // Publish a job offer
        const NEED_OFFER_jobOfferState = 'publié';
        const sqlQuery =
            'UPDATE offreDemploi SET jobOfferState= ? WHERE num= ?';
        db.query(
            sqlQuery,
            [NEED_OFFER_jobOfferState, offerNumber],
            function (err, result) {
                if (err) {
                    logError('Error publishing job offer', {
                        offerNumber,
                        err
                    });
                    return next(
                        jsonResponse(
                            500,
                            'error',
                            'Database error publishing job offer.',
                            { error: err }
                        )
                    );
                }
                if (result.affectedRows === 1) {
                    logDebug('Job offer published', { offerNumber });
                    next(
                        null,
                        jsonResponse(200, 'success', 'Job offer published.')
                    );
                } else {
                    logDebug('Job offer not found for publish', {
                        offerNumber
                    });
                    next(jsonResponse(404, 'error', 'Job offer not found.'));
                }
            }
        );
    },

    readOfferWithLinkedDatas: function (idJobOffer, next) {
        // Retrieve a job offer with linked data from the database
        const sqlQuery =
            'SELECT * FROM offreDemploi NATURAL JOIN ficheDePoste WHERE num=?';
        db.query(sqlQuery, [idJobOffer], function (err, result) {
            if (err) {
                logError('Error reading job offer with linked data', {
                    idJobOffer,
                    err
                });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error reading job offer with linked data.',
                        { error: err }
                    )
                );
            }
            if (result.length > 0) {
                logDebug('Job offer with linked data found', {
                    offer: result[0]
                });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Job offer with linked data found.',
                        { offer: result[0] }
                    )
                );
            } else {
                logDebug('Job offer with linked data not found', {
                    idJobOffer
                });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Job offer with linked data not found.'
                    )
                );
            }
        });
    },

    readFilteredOffersWithLinkedDatas: function (
        salary,
        jobType,
        nameOrganization,
        jobLocation,
        jobTitle,
        next
    ) {
        // Retrieve filtered published job offers with linked data from the database
        const NEED_OFFER_jobOfferState = 'publié';
        logDebug('Filtering job offers', {
            salary,
            jobType,
            nameOrganization,
            jobLocation,
            jobTitle
        });
        const sqlQuery =
            (((('SELECT * FROM offreDemploi NATURAL JOIN ficheDePoste JOIN organisation ON ficheDePoste.idOrganization = organisation.siren WHERE jobOfferState=? AND salary >=? AND jobType LIKE CONCAT(' %
                ',?) AND nom LIKE CONCAT(') %
                ',?) AND jobLocation LIKE CONCAT(') %
                ',?) AND jobTitle LIKE CONCAT(') %
                ',CONCAT(?,') %
            '))';
        db.query(
            sqlQuery,
            [
                NEED_OFFER_jobOfferState,
                salary,
                jobType,
                nameOrganization,
                jobLocation,
                jobTitle
            ],
            function (err, result) {
                if (err) {
                    logError(
                        'Error reading filtered job offers with linked data',
                        { err }
                    );
                    return next(
                        jsonResponse(
                            500,
                            'error',
                            'Database error reading filtered job offers with linked data.',
                            { error: err }
                        )
                    );
                }
                logDebug('Filtered job offers with linked data read', {
                    count: result.length
                });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Filtered job offers with linked data retrieved.',
                        { offers: result }
                    )
                );
            }
        );
    },

    truncateDate: function (date) {
        // Format a date as DD/MM/YYYY
        const yyyy = date.getFullYear();
        let mm = date.getMonth() + 1;
        let dd = date.getDate();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        return dd + '/' + mm + '/' + yyyy;
    }
};
