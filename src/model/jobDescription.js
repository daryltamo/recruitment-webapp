const db = require('../../config/db.js');
const jsonResp = require('../utils/jsonResponse.js');

const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

function jsonResponse(statusCode, status, message, data = {}) {
    return jsonResp.jsonResponse(statusCode, status, message, data);
}

module.exports = {
    // Create a new job description
    create: function (
        jobTitle,
        idOrganization,
        jobStatus,
        supervisor,
        jobType,
        jobLocation,
        schedule,
        salary,
        description,
        next
    ) {
        const sqlQuery =
            'INSERT INTO ficheDePoste (jobTitle, idOrganization, statut_poste, resp_hierarch, jobType, jobLocation, rythme, salary, description) VALUES (?,?,?,?,?,?,?,?,?)';
        db.query(
            sqlQuery,
            [
                jobTitle,
                idOrganization,
                jobStatus,
                supervisor,
                jobType,
                jobLocation,
                schedule,
                salary,
                description
            ],
            function (err, result) {
                if (err) {
                    logError('Error creating job description', {
                        jobTitle,
                        idOrganization,
                        err
                    });
                    next(
                        jsonResponse(
                            500,
                            'error',
                            `Failed to create job description (jobTitle=${jobTitle}, organization=${idOrganization}): ${err}`
                        )
                    );
                } else if (result.affectedRows === 1) {
                    logDebug('Job description created', {
                        jobTitle,
                        idOrganization
                    });
                    next(
                        jsonResponse(
                            201,
                            'success',
                            `Job description (jobTitle=${jobTitle}) created successfully.`
                        )
                    );
                } else {
                    logError('Job description not created', {
                        jobTitle,
                        idOrganization
                    });
                    next(
                        jsonResponse(
                            400,
                            'error',
                            'No job description created. SQL query failed.'
                        )
                    );
                }
            }
        );
    },

    // Read a job description by title and organization
    read: function (jobTitle, idOrganization, next) {
        const sqlQuery =
            'SELECT * FROM ficheDePoste WHERE jobTitle = ? AND idOrganization = ?';
        db.query(sqlQuery, [jobTitle, idOrganization], function (err, result) {
            if (err) {
                logError('Error reading job description', {
                    jobTitle,
                    idOrganization,
                    err
                });
                next(
                    jsonResponse(
                        500,
                        'error',
                        `Failed to read job description (jobTitle=${jobTitle}, organization=${idOrganization}): ${err}`
                    )
                );
            } else if (result.length > 0) {
                logDebug('Job description found', { jobTitle, idOrganization });
                next(
                    jsonResponse(200, 'success', 'Job description found.', {
                        jobDescription: result[0]
                    })
                );
            } else {
                logError('Job description not found', {
                    jobTitle,
                    idOrganization
                });
                next(
                    jsonResponse(
                        404,
                        'error',
                        `Job description (jobTitle=${jobTitle}, organization=${idOrganization}) not found.`
                    )
                );
            }
        });
    },

    // Read all job descriptions
    readAll: function (next) {
        const sqlQuery = 'SELECT * FROM ficheDePoste';
        db.query(sqlQuery, function (err, result) {
            if (err) {
                logError('Error reading job descriptions', { err });
                next(
                    jsonResponse(
                        500,
                        'error',
                        `Failed to read job descriptions: ${err}`
                    )
                );
            } else if (result.length > 0) {
                logDebug('Job descriptions found', { count: result.length });
                next(
                    jsonResponse(200, 'success', 'Job descriptions found.', {
                        jobDescriptions: result
                    })
                );
            } else {
                logError('No job descriptions found');
                next(jsonResponse(404, 'error', 'No job descriptions found.'));
            }
        });
    },

    // Read a job description by ID
    readById: function (idJobDescription, next) {
        const sqlQuery =
            'SELECT * FROM ficheDePoste WHERE idJobDescription = ?';
        db.query(sqlQuery, [idJobDescription], function (err, result) {
            if (err) {
                logError('Error reading job description by ID', {
                    idJobDescription,
                    err
                });
                next(
                    jsonResponse(
                        500,
                        'error',
                        `Failed to read job description (id=${idJobDescription}): ${err}`
                    )
                );
            } else if (result.length > 0) {
                logDebug('Job description found by ID', { idJobDescription });
                next(
                    jsonResponse(200, 'success', 'Job description found.', {
                        jobDescription: result[0]
                    })
                );
            } else {
                logError('Job description not found by ID', {
                    idJobDescription
                });
                next(
                    jsonResponse(
                        404,
                        'error',
                        `Job description (id=${idJobDescription}) not found.`
                    )
                );
            }
        });
    },

    // Read all job descriptions in an organization
    readAllInOrganization: function (idOrganization, next) {
        const sqlQuery = 'SELECT * FROM ficheDePoste WHERE idOrganization = ?';
        db.query(sqlQuery, [idOrganization], function (err, result) {
            if (err) {
                logError('Error reading job descriptions for organization', {
                    idOrganization,
                    err
                });
                next(
                    jsonResponse(
                        500,
                        'error',
                        `Failed to read job descriptions for organization (id=${idOrganization}): ${err}`
                    )
                );
            } else if (result.length > 0) {
                logDebug('Job descriptions found for organization', {
                    idOrganization,
                    count: result.length
                });
                next(
                    jsonResponse(200, 'success', 'Job descriptions found.', {
                        jobDescriptions: result
                    })
                );
            } else {
                logError('No job descriptions found for organization', {
                    idOrganization
                });
                next(
                    jsonResponse(
                        404,
                        'error',
                        `No job descriptions found for organization (id=${idOrganization}).`
                    )
                );
            }
        });
    },

    // Update a job description by title and organization
    update: function (
        jobTitle,
        idOrganization,
        jobStatus,
        supervisor,
        jobType,
        jobLocation,
        schedule,
        salary,
        description,
        next
    ) {
        const sqlQuery =
            'UPDATE ficheDePoste SET statut_poste = ?, resp_hierarch = ?, jobType = ?, jobLocation = ?, rythme = ?, salary = ?, description = ? WHERE jobTitle = ? AND idOrganization = ?';
        db.query(
            sqlQuery,
            [
                jobStatus,
                supervisor,
                jobType,
                jobLocation,
                schedule,
                salary,
                description,
                jobTitle,
                idOrganization
            ],
            function (err, result) {
                if (err) {
                    logError('Error updating job description', {
                        jobTitle,
                        idOrganization,
                        err
                    });
                    next(
                        jsonResponse(
                            500,
                            'error',
                            `Failed to update job description (jobTitle=${jobTitle}, organization=${idOrganization}): ${err}`
                        )
                    );
                } else if (result.affectedRows === 1) {
                    logDebug('Job description updated', {
                        jobTitle,
                        idOrganization
                    });
                    next(
                        jsonResponse(
                            200,
                            'success',
                            `Job description (jobTitle=${jobTitle}) updated successfully.`
                        )
                    );
                } else {
                    logError('Job description not found or not updated', {
                        jobTitle,
                        idOrganization
                    });
                    next(
                        jsonResponse(
                            404,
                            'error',
                            `Job description (jobTitle=${jobTitle}, organization=${idOrganization}) not found or not updated.`
                        )
                    );
                }
            }
        );
    },

    // Update a job description by ID
    updateById: function (
        idJobDescription,
        jobTitle,
        idOrganization,
        jobStatus,
        supervisor,
        jobType,
        jobLocation,
        schedule,
        salary,
        description,
        next
    ) {
        const sqlQuery =
            'UPDATE ficheDePoste SET jobTitle = ?, idOrganization = ?, statut_poste = ?, resp_hierarch = ?, jobType = ?, jobLocation = ?, rythme = ?, salary = ?, description = ? WHERE idJobDescription = ?';
        db.query(
            sqlQuery,
            [
                jobTitle,
                idOrganization,
                jobStatus,
                supervisor,
                jobType,
                jobLocation,
                schedule,
                salary,
                description,
                idJobDescription
            ],
            function (err, result) {
                if (err) {
                    logError('Error updating job description by ID', {
                        idJobDescription,
                        err
                    });
                    next(
                        jsonResponse(
                            500,
                            'error',
                            `Failed to update job description (id=${idJobDescription}): ${err}`
                        )
                    );
                } else if (result.affectedRows === 1) {
                    logDebug('Job description updated by ID', {
                        idJobDescription
                    });
                    next(
                        jsonResponse(
                            200,
                            'success',
                            `Job description (id=${idJobDescription}) updated successfully.`
                        )
                    );
                } else {
                    logError('Job description not found or not updated by ID', {
                        idJobDescription
                    });
                    next(
                        jsonResponse(
                            404,
                            'error',
                            `Job description (id=${idJobDescription}) not found or not updated.`
                        )
                    );
                }
            }
        );
    },

    // Delete a job description by title and organization
    delete: function (jobTitle, idOrganization, next) {
        const sqlQuery =
            'DELETE FROM ficheDePoste WHERE jobTitle = ? AND idOrganization = ?';
        db.query(sqlQuery, [jobTitle, idOrganization], function (err, result) {
            if (err) {
                logError('Error deleting job description', {
                    jobTitle,
                    idOrganization,
                    err
                });
                next(
                    jsonResponse(
                        500,
                        'error',
                        `Failed to delete job description (jobTitle=${jobTitle}, organization=${idOrganization}): ${err}`
                    )
                );
            } else if (result.affectedRows === 1) {
                logDebug('Job description deleted', {
                    jobTitle,
                    idOrganization
                });
                next(
                    jsonResponse(
                        200,
                        'success',
                        `Job description (jobTitle=${jobTitle}) deleted successfully.`
                    )
                );
            } else {
                logError('Job description not found or not deleted', {
                    jobTitle,
                    idOrganization
                });
                next(
                    jsonResponse(
                        404,
                        'error',
                        `Job description (jobTitle=${jobTitle}, organization=${idOrganization}) not found or not deleted.`
                    )
                );
            }
        });
    },

    // Delete a job description by ID
    deleteById: function (idJobDescription, next) {
        const sqlQuery = 'DELETE FROM ficheDePoste WHERE idJobDescription = ?';
        db.query(sqlQuery, [idJobDescription], function (err, result) {
            if (err) {
                logError('Error deleting job description by ID', {
                    idJobDescription,
                    err
                });
                next(
                    jsonResponse(
                        500,
                        'error',
                        `Failed to delete job description (id=${idJobDescription}): ${err}`
                    )
                );
            } else if (result.affectedRows === 1) {
                logDebug('Job description deleted by ID', { idJobDescription });
                next(
                    jsonResponse(
                        200,
                        'success',
                        `Job description (id=${idJobDescription}) deleted successfully.`
                    )
                );
            } else {
                logError('Job description not found or not deleted by ID', {
                    idJobDescription
                });
                next(
                    jsonResponse(
                        404,
                        'error',
                        `Job description (id=${idJobDescription}) not found or not deleted.`
                    )
                );
            }
        });
    },

    // Check if a job description exists by title and organization
    exists: function (jobTitle, idOrganization, next) {
        const sqlQuery =
            'SELECT * FROM ficheDePoste WHERE jobTitle = ? AND idOrganization = ?';
        db.query(sqlQuery, [jobTitle, idOrganization], function (err, result) {
            if (err) {
                logError('Error checking existence of job description', {
                    jobTitle,
                    idOrganization,
                    err
                });
                next(
                    jsonResponse(
                        500,
                        'error',
                        `Failed to check existence of job description (jobTitle=${jobTitle}, organization=${idOrganization}): ${err}`
                    )
                );
            } else if (result.length > 0) {
                logDebug('Job description exists', {
                    jobTitle,
                    idOrganization
                });
                next(
                    jsonResponse(200, 'success', 'Job description exists.', {
                        jobDescription: result[0]
                    })
                );
            } else {
                logError('Job description does not exist', {
                    jobTitle,
                    idOrganization
                });
                next(
                    jsonResponse(
                        404,
                        'error',
                        `Job description (jobTitle=${jobTitle}, organization=${idOrganization}) does not exist.`
                    )
                );
            }
        });
    }
};
