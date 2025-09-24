const express = require('express');
const router = express.Router();
const path = require('path');
const attachmentModel = require('../model/attachment');
const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

// Initialize multer with the storage configuration
const multer = require('multer');

// Set up multer storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Ensure uploads directory exists
    },
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        );
    }
});

const upload = multer({ storage: storage });

// GET all attachments
router.get('/', function (req, res, next) {
    logDebug('GET /attachments - Fetching all attachments');
    try {
        attachmentModel.readall(function (result) {
            if (result) {
                logDebug('GET /attachments - Attachments found');
                res.render('attachment', {
                    title: 'Attachment List',
                    attachments: result
                });
            } else {
                logDebug('GET /attachments - No attachments found');
                res.status(404).json({
                    error: 'No attachments found.'
                });
            }
        });
    } catch (error) {
        logError('GET /attachments - Failed to retrieve attachments', error);
        res.status(500).json({
            error: 'Failed to retrieve attachments.'
        });
        next(error);
    }
});

// GET a specific attachment
router.get('/:id', function (req, res, next) {
    const idAttachment = req.params.id;
    logDebug(`GET /attachments/${idAttachment} - Fetching attachment`);
    try {
        attachmentModel.read(idAttachment, function (result) {
            if (result) {
                logDebug(`GET /attachments/${idAttachment} - Attachment found`);
                res.render('attachment-details', {
                    title: 'Attachment Details',
                    attachment: result
                });
            } else {
                logDebug(
                    `GET /attachments/${idAttachment} - Attachment not found`
                );
                res.status(404).json({
                    error: 'Attachment not found.'
                });
            }
        });
    } catch (error) {
        logError(
            `GET /attachments/${idAttachment} - Failed to retrieve attachment`,
            error
        );
        res.status(500).json({
            error: 'Failed to retrieve attachment.'
        });
        next(error);
    }
});

// POST add new attachments (resume and cover letter)
router.post(
    '/addAttachment',
    upload.fields([
        { name: 'resume', maxCount: 1 },
        { name: 'coverLetter', maxCount: 1 }
    ]),
    function (req, res, next) {
        logDebug('POST /attachments/addAttachment - Adding new attachments');
        try {
            const idApplicant = req.body.idApplicant;
            const idJobOffer = req.body.idJobOffer;
            const resume = req.files['resume'] ? req.files['resume'][0] : null;
            const coverLetter = req.files['coverLetter']
                ? req.files['coverLetter'][0]
                : null;

            if (!resume || !coverLetter) {
                logDebug(
                    'POST /attachments/addAttachment - Resume or cover letter missing'
                );
                return res
                    .status(400)
                    .json({ error: 'Resume and cover letter are required.' });
            }

            const resumePath = 'uploads/' + resume.filename;
            const coverLetterPath = 'uploads/' + coverLetter.filename;

            attachmentModel.create(
                idApplicant,
                idJobOffer,
                resumePath,
                function (success) {
                    if (!success) {
                        logError(
                            'POST /attachments/addAttachment - Failed to add resume attachment'
                        );
                        return res
                            .status(500)
                            .json({
                                error: 'Failed to add resume attachment.'
                            });
                    }
                }
            );

            attachmentModel.create(
                idApplicant,
                idJobOffer,
                coverLetterPath,
                function (success) {
                    if (!success) {
                        logError(
                            'POST /attachments/addAttachment - Failed to add cover letter attachment'
                        );
                        return res
                            .status(500)
                            .json({
                                error: 'Failed to add cover letter attachment.'
                            });
                    }
                    logDebug(
                        'POST /attachments/addAttachment - Attachments added successfully'
                    );
                    res.status(201).json({
                        message: 'Attachments added successfully.'
                    });
                }
            );
        } catch (error) {
            logError(
                'POST /attachments/addAttachment - Failed to add attachment',
                error
            );
            res.status(500).json({ error: 'Failed to add attachment.' });
            next(error);
        }
    }
);

// PUT update an attachment
router.put('/:id', function (req, res, next) {
    const idAttachment = req.params.id;
    logDebug(`PUT /attachments/${idAttachment} - Updating attachment`);
    try {
        attachmentModel.update(idAttachment, function (result) {
            if (result) {
                logDebug(
                    `PUT /attachments/${idAttachment} - Attachment updated successfully`
                );
                res.json({ message: 'Attachment updated successfully.' });
            } else {
                logError(
                    `PUT /attachments/${idAttachment} - Failed to update attachment`
                );
                res.status(500).json({ error: 'Failed to update attachment.' });
            }
        });
    } catch (error) {
        logError(
            `PUT /attachments/${idAttachment} - Failed to update attachment`,
            error
        );
        res.status(500).json({ error: 'Failed to update attachment.' });
        next(error);
    }
});

// DELETE remove an attachment
router.delete('/:id', function (req, res, next) {
    const idAttachment = req.params.id;
    logDebug(`DELETE /attachments/${idAttachment} - Deleting attachment`);
    try {
        attachmentModel.delete(idAttachment, function (result) {
            if (result) {
                logDebug(
                    `DELETE /attachments/${idAttachment} - Attachment deleted successfully`
                );
                res.json({ message: 'Attachment deleted successfully.' });
            } else {
                logError(
                    `DELETE /attachments/${idAttachment} - Failed to delete attachment`
                );
                res.status(500).json({ error: 'Failed to delete attachment.' });
            }
        });
    } catch (error) {
        logError(
            `DELETE /attachments/${idAttachment} - Failed to delete attachment`,
            error
        );
        res.status(500).json({ error: 'Failed to delete attachment.' });
        next(error);
    }
});

// GET download an attachment
router.get('/:id/download', function (req, res, next) {
    const idAttachment = req.params.id;
    logDebug(
        `GET /attachments/${idAttachment}/download - Downloading attachment`
    );
    try {
        attachmentModel.download(idAttachment, function (result) {
            if (result) {
                // ...existing code for download logic...
            } else {
                logDebug(
                    `GET /attachments/${idAttachment}/download - Attachment not found for download`
                );
                res.status(404).json({
                    error: 'Attachment not found for download.'
                });
            }
        });
    } catch (error) {
        logError(
            `GET /attachments/${idAttachment}/download - Failed to download attachment`,
            error
        );
        res.status(500).json({ error: 'Failed to download attachment.' });
        next(error);
    }
});

// GET preview an attachment
router.get('/:id/preview', function (req, res, next) {
    const idAttachment = req.params.id;
    logDebug(
        `GET /attachments/${idAttachment}/preview - Previewing attachment`
    );
    try {
        // ...existing code for preview logic...
    } catch (error) {
        logError(
            `GET /attachments/${idAttachment}/preview - Failed to preview attachment`,
            error
        );
        res.status(500).json({ error: 'Failed to preview attachment.' });
        next(error);
    }
});

// POST upload a file (add a row in attachment table and put file in uploads folder)
router.post('/upload', function (req, res, next) {
    logDebug('POST /attachments/upload - Uploading file');
    try {
        // ...existing code for upload logic...
    } catch (error) {
        logError('POST /attachments/upload - Failed to upload file', error);
        res.status(500).json({ error: 'Failed to upload file.' });
        next(error);
    }
});

module.exports = router;
