const db = require('../../config/db.js');
const jsonResp = require('../utils/jsonResponse.js');

const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

function jsonResponse(statusCode, status, message, data = {}) {
    return jsonResp.jsonResponse(statusCode, status, message, data);
}

module.exports = {
    // Create a new attachment
    create: function (idApplicant, idJobOffer, uploadedFiles, next) {
        let createdCount = 0;
        let errorOccurred = false;
        for (const field in uploadedFiles) {
            uploadedFiles[field].forEach((filePath) => {
                const sqlQuery =
                    'INSERT INTO piecesJointes (candidature_candidat, candidature_offre_demploi, chemin) VALUES (?, ?, ?)';
                db.query(
                    sqlQuery,
                    [idApplicant, idJobOffer, filePath],
                    function (err, result) {
                        if (err) {
                            errorOccurred = true;
                            logError('Error creating attachment', {
                                idApplicant,
                                idJobOffer,
                                filePath,
                                err
                            });
                            return next(
                                jsonResponse(
                                    500,
                                    'error',
                                    'Database error creating attachment.',
                                    { error: err }
                                )
                            );
                        }
                        if (result.affectedRows === 1) {
                            createdCount++;
                            logDebug('Attachment created', {
                                id: result.insertId
                            });
                        }
                    }
                );
            });
        }
        if (!errorOccurred) {
            next(
                null,
                jsonResponse(
                    201,
                    'success',
                    'Attachments created successfully.',
                    { count: createdCount }
                )
            );
        }
    },

    // Read an attachment by ID
    read: function (idAttachment, next) {
        const sqlQuery =
            'SELECT * FROM piecesJointes WHERE id_piece_jointe = ?';
        db.query(sqlQuery, [idAttachment], function (err, result) {
            if (err) {
                logError('Error reading attachment', { idAttachment, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error reading attachment.',
                        { error: err }
                    )
                );
            }
            if (result.length > 0) {
                logDebug('Attachment found', { idAttachment });
                next(
                    null,
                    jsonResponse(200, 'success', 'Attachment found.', {
                        attachment: result[0]
                    })
                );
            } else {
                logError('Attachment not found', { idAttachment });
                next(jsonResponse(404, 'error', 'Attachment not found.'));
            }
        });
    },

    // Read all attachments for an applicant and job offer
    readAll: function (idApplicant, idJobOffer, next) {
        const sqlQuery =
            'SELECT * FROM piecesJointes WHERE candidature_candidat = ? AND candidature_offre_demploi = ?';
        db.query(sqlQuery, [idApplicant, idJobOffer], function (err, result) {
            if (err) {
                logError('Error reading attachments', {
                    idApplicant,
                    idJobOffer,
                    err
                });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error reading attachments.',
                        { error: err }
                    )
                );
            }
            logDebug('Attachments found', {
                idApplicant,
                idJobOffer,
                count: result.length
            });
            next(
                null,
                jsonResponse(200, 'success', 'Attachments found.', {
                    attachments: result
                })
            );
        });
    },

    // Update an attachment
    update: function (idAttachment, idApplicant, idJobOffer, filePath, next) {
        const sqlQuery =
            'UPDATE piecesJointes SET candidature_candidat = ?, candidature_offre_demploi = ?, chemin = ? WHERE id_piece_jointe = ?';
        db.query(
            sqlQuery,
            [idApplicant, idJobOffer, filePath, idAttachment],
            function (err, result) {
                if (err) {
                    logError('Error updating attachment', {
                        idAttachment,
                        err
                    });
                    return next(
                        jsonResponse(
                            500,
                            'error',
                            'Database error updating attachment.',
                            { error: err }
                        )
                    );
                }
                if (result.affectedRows === 1) {
                    logDebug('Attachment updated', { idAttachment });
                    next(
                        null,
                        jsonResponse(
                            200,
                            'success',
                            'Attachment updated successfully.'
                        )
                    );
                } else {
                    logError('Attachment not found for update', {
                        idAttachment
                    });
                    next(
                        jsonResponse(
                            404,
                            'error',
                            'Attachment not found for update.'
                        )
                    );
                }
            }
        );
    },

    // Delete an attachment
    delete: function (idAttachment, next) {
        const sqlQuery = 'DELETE FROM piecesJointes WHERE id_piece_jointe = ?';
        db.query(sqlQuery, [idAttachment], function (err, result) {
            if (err) {
                logError('Error deleting attachment', { idAttachment, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error deleting attachment.',
                        { error: err }
                    )
                );
            }
            if (result.affectedRows === 1) {
                logDebug('Attachment deleted', { idAttachment });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Attachment deleted successfully.'
                    )
                );
            } else {
                logError('Attachment not found for deletion', { idAttachment });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Attachment not found for deletion.'
                    )
                );
            }
        });
    },

    // Download an attachment (get file path)
    download: function (idAttachment, next) {
        const sqlQuery =
            'SELECT chemin FROM piecesJointes WHERE id_piece_jointe = ?';
        db.query(sqlQuery, [idAttachment], function (err, result) {
            if (err) {
                logError('Error downloading attachment', { idAttachment, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error downloading attachment.',
                        { error: err }
                    )
                );
            }
            if (result.length > 0) {
                logDebug('Attachment file path found', { idAttachment });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Attachment file path found.',
                        { filePath: result[0].chemin }
                    )
                );
            } else {
                logError('Attachment not found for download', { idAttachment });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Attachment not found for download.'
                    )
                );
            }
        });
    },

    // Upload file (update file path for attachment)
    upload: function (idAttachment, filePath, next) {
        const sqlQuery =
            'UPDATE piecesJointes SET chemin = ? WHERE id_piece_jointe = ?';
        db.query(sqlQuery, [filePath, idAttachment], function (err, result) {
            if (err) {
                logError('Error uploading file for attachment', {
                    idAttachment,
                    err
                });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error uploading file for attachment.',
                        { error: err }
                    )
                );
            }
            if (result.affectedRows === 1) {
                logDebug('Attachment file path updated', { idAttachment });
                next(
                    null,
                    jsonResponse(
                        200,
                        'success',
                        'Attachment file path updated successfully.'
                    )
                );
            } else {
                logError('Attachment not found for file upload', {
                    idAttachment
                });
                next(
                    jsonResponse(
                        404,
                        'error',
                        'Attachment not found for file upload.'
                    )
                );
            }
        });
    }
};
