const db = require('../../config/db.js');
const jsonResp = require('../utils/jsonResponse.js');

const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');


function jsonResponse(statusCode, status, message, data = {}) {
    return jsonResp.jsonResponse(statusCode, status, message, data);
}

module.exports = {
    create: function (idApplicant, idJobOffer, next) {
        const sqlQuery =
            'INSERT INTO application (idApplicant, idJobOffer, applicationDate) VALUES (?,?,CURRENT_DATE())';
        db.query(sqlQuery, [idApplicant, idJobOffer], function (err, result) {
            if (err) {
                logError('Error creating application', { idApplicant, idJobOffer, err });
                return next(jsonResponse(500, 'error', 'Database error creating application.', { error: err }));
            }
            if (result.affectedRows === 1) {
                logDebug('Application created', { id: result.insertId });
                next(null, jsonResponse(201, 'success', 'Application created successfully.', { id: result.insertId }));
            } else {
                logError('SQL query failed to create application', { idApplicant, idJobOffer });
                next(jsonResponse(400, 'error', 'SQL query failed to create application.'));
            }
        });
    },

    read: function (idApplicant, idJobOffer, next) {
        const sqlQuery =
            'SELECT * FROM application WHERE idApplicant = ? AND idJobOffer = ?';
        db.query(sqlQuery, [idApplicant, idJobOffer], function (err, result) {
            if (err) {
                logError('Error reading application', { idApplicant, idJobOffer, err });
                return next(jsonResponse(500, 'error', 'Database error reading application.', { error: err }));
            }
            if (result.length > 0) {
                logDebug('Application found', { application: result[0] });
                next(null, jsonResponse(200, 'success', 'Application found.', { application: result[0] }));
            } else {
                logDebug('Application not found', { idApplicant, idJobOffer });
                next(jsonResponse(404, 'error', 'Application not found.'));
            }
        });
    },

    readAll: function (next) {
        const sqlQuery = 'SELECT * FROM application';
        db.query(sqlQuery, function (err, result) {
            if (err) {
                logError('Error reading all applications', err);
                return next(jsonResponse(500, 'error', 'Database error reading all applications.', { error: err }));
            }
            logDebug('All applications read', { count: result.length });
            next(null, jsonResponse(200, 'success', 'Applications retrieved.', { applications: result }));
        });
    },

    readAllForOffer: function (idJobOffer, next) {
        const sqlQuery =
            'SELECT idApplicant, applicationDate FROM application WHERE idJobOffer = ?';
        db.query(sqlQuery, [idJobOffer], function (err, result) {
            if (err) {
                logError('Error reading applications for job offer', { idJobOffer, err });
                return next(jsonResponse(500, 'error', 'Database error reading applications for job offer.', { error: err }));
            }
            logDebug('Applications for job offer read', { idJobOffer, count: result.length });
            next(null, jsonResponse(200, 'success', 'Applications for job offer retrieved.', { applications: result }));
        });
    },

    readAllForApplicant: function (idApplicant, next) {
        const sqlQuery =
            'SELECT * FROM application JOIN offreDemploi ON application.idJobOffer=offreDemploi.num NATURAL JOIN ficheDePoste WHERE idApplicant = ?';
        db.query(sqlQuery, [idApplicant], function (err, result) {
            if (err) {
                logError('Error reading applications for applicant', { idApplicant, err });
                return next(jsonResponse(500, 'error', 'Database error reading applications for applicant.', { error: err }));
            }
            logDebug('Applications for applicant read', { idApplicant, count: result.length });
            next(null, jsonResponse(200, 'success', 'Applications for applicant retrieved.', { applications: result }));
        });
    },

    update: function (idApplicant, idJobOffer, applicationDate, next) {
        const sqlQuery =
            'UPDATE application SET applicationDate = ? WHERE idApplicant = ? AND idJobOffer = ?';
        db.query(sqlQuery, [applicationDate, idApplicant, idJobOffer], function (err, result) {
            if (err) {
                logError('Error updating application', { idApplicant, idJobOffer, err });
                return next(jsonResponse(500, 'error', 'Database error updating application.', { error: err }));
            }
            if (result.affectedRows === 1) {
                logDebug('Application updated', { idApplicant, idJobOffer });
                next(null, jsonResponse(200, 'success', 'Application updated successfully.'));
            } else {
                logDebug('Application not found for update', { idApplicant, idJobOffer });
                next(jsonResponse(404, 'error', 'Application not found.'));
            }
        });
    },

    updateApplicationDate: function (idApplicant, idJobOffer, next) {
        const applicationDate = new Date();
        const sqlQuery =
            'UPDATE application SET applicationDate = ? WHERE idApplicant = ? AND idJobOffer = ?';
        db.query(sqlQuery, [applicationDate, idApplicant, idJobOffer], function (err, result) {
            if (err) {
                logError('Error updating application date', { idApplicant, idJobOffer, err });
                return next(jsonResponse(500, 'error', 'Database error updating application date.', { error: err }));
            }
            if (result.affectedRows === 1) {
                logDebug('Application date updated', { idApplicant, idJobOffer });
                next(null, jsonResponse(200, 'success', 'Application date updated successfully.'));
            } else {
                logDebug('Application not found for date update', { idApplicant, idJobOffer });
                next(jsonResponse(404, 'error', 'Application not found.'));
            }
        });
    },

    updateApplicationStatus: function (idApplicant, idJobOffer, desiredStatus, next) {
        const sqlQuery =
            'UPDATE application SET statut_candidature = ? WHERE idApplicant = ? AND idJobOffer = ?';
        db.query(sqlQuery, [desiredStatus, idApplicant, idJobOffer], function (err, result) {
            if (err) {
                logError('Error updating application status', { idApplicant, idJobOffer, err });
                return next(jsonResponse(500, 'error', 'Database error updating application status.', { error: err }));
            }
            if (result.affectedRows === 1) {
                logDebug('Application status updated', { idApplicant, idJobOffer, desiredStatus });
                next(null, jsonResponse(200, 'success', 'Application status updated successfully.'));
            } else {
                logDebug('Application not found for status update', { idApplicant, idJobOffer });
                next(jsonResponse(404, 'error', 'Application not found.'));
            }
        });
    },

    acceptApplication: function (idApplicant, idJobOffer, next) {
        const desiredStatus = 'Accepted';
        const sqlQuery =
            'UPDATE application SET statut_candidature = ? WHERE idApplicant = ? AND idJobOffer = ?';
        db.query(sqlQuery, [desiredStatus, idApplicant, idJobOffer], function (err, result) {
            if (err) {
                logError('Error accepting application', { idApplicant, idJobOffer, err });
                return next(jsonResponse(500, 'error', 'Database error accepting application.', { error: err }));
            }
            if (result.affectedRows === 1) {
                logDebug('Application accepted', { idApplicant, idJobOffer });
                next(null, jsonResponse(200, 'success', 'Application accepted.'));
            } else {
                logDebug('Application not found for accept', { idApplicant, idJobOffer });
                next(jsonResponse(404, 'error', 'Application not found.'));
            }
        });
    },

    refuseApplication: function (idApplicant, idJobOffer, next) {
        const desiredStatus = 'Refused';
        const sqlQuery =
            'UPDATE application SET statut_candidature = ? WHERE idApplicant = ? AND idJobOffer = ?';
        db.query(sqlQuery, [desiredStatus, idApplicant, idJobOffer], function (err, result) {
            if (err) {
                logError('Error refusing application', { idApplicant, idJobOffer, err });
                return next(jsonResponse(500, 'error', 'Database error refusing application.', { error: err }));
            }
            if (result.affectedRows === 1) {
                logDebug('Application refused', { idApplicant, idJobOffer });
                next(null, jsonResponse(200, 'success', 'Application refused.'));
            } else {
                logDebug('Application not found for refuse', { idApplicant, idJobOffer });
                next(jsonResponse(404, 'error', 'Application not found.'));
            }
        });
    },

    updateCommentOnApplication: function (idApplicant, idJobOffer, recruiterComment, next) {
        const sqlQuery =
            'UPDATE application SET commentaire_recruteur = ? WHERE idApplicant = ? AND idJobOffer = ?';
        db.query(sqlQuery, [recruiterComment, idApplicant, idJobOffer], function (err, result) {
            if (err) {
                logError('Error updating recruiter comment', { idApplicant, idJobOffer, err });
                return next(jsonResponse(500, 'error', 'Database error updating recruiter comment.', { error: err }));
            }
            if (result.affectedRows === 1) {
                logDebug('Recruiter comment updated', { idApplicant, idJobOffer });
                next(null, jsonResponse(200, 'success', 'Recruiter comment updated.'));
            } else {
                logDebug('Application not found for recruiter comment update', { idApplicant, idJobOffer });
                next(jsonResponse(404, 'error', 'Application not found.'));
            }
        });
    },

    delete: function (idApplicant, idJobOffer, next) {
        const sqlQuery =
            'DELETE FROM application WHERE idApplicant = ? AND idJobOffer = ?';
        db.query(sqlQuery, [idApplicant, idJobOffer], function (err, result) {
            if (err) {
                logError('Error deleting application', { idApplicant, idJobOffer, err });
                return next(jsonResponse(500, 'error', 'Database error deleting application.', { error: err }));
            }
            if (result.affectedRows === 1) {
                logDebug('Application deleted', { idApplicant, idJobOffer });
                next(null, jsonResponse(200, 'success', 'Application deleted.'));
            } else {
                logDebug('Application not found for delete', { idApplicant, idJobOffer });
                next(jsonResponse(404, 'error', 'Application not found.'));
            }
        });
    },

    isApplicationValid: function (idApplicant, idJobOffer, next) {
        const sqlQuery =
            'SELECT * FROM application WHERE idApplicant = ? AND idJobOffer = ?';
        db.query(sqlQuery, [idApplicant, idJobOffer], function (err, result) {
            if (err) {
                logError('Error validating application', { idApplicant, idJobOffer, err });
                return next(jsonResponse(500, 'error', 'Database error validating application.', { error: err }));
            }
            const valid = result.length === 1;
            logDebug('Application validation checked', { idApplicant, idJobOffer, valid });
            next(null, jsonResponse(200, 'success', 'Application validation checked.', { valid }));
        });
    }
};
