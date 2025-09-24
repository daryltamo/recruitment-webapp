const express = require('express');
const router = express.Router();
const userModel = require('../model/user');
const session = require('../../sessions');
const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

// Render login view
router.get('/', function (req, res) {
    logDebug('GET /login - Rendering login view');
    res.render('login');
});

// Authenticate user and create session
router.post('/connectUser', async function (req, res) {
    logDebug('POST /login/connectUser - Authenticating user');
    try {
        const email = req.body.email;
        const password = req.body.password;
        userModel.areValid(email, password, function (isValid) {
            if (isValid) {
                logDebug(
                    `POST /login/connectUser - Credentials valid for ${email}`
                );
                userModel.isUserActive(email, async function (isActive) {
                    if (isActive) {
                        logDebug(
                            `POST /login/connectUser - Account active for ${email}`
                        );
                        userModel.isUserACandidate(
                            email,
                            async function (isCandidate) {
                                if (isCandidate) {
                                    logDebug(
                                        `POST /login/connectUser - Candidate role for ${email}`
                                    );
                                    const results = await session.createSession(
                                        req.session,
                                        email,
                                        'Candidate'
                                    );
                                    if (results) {
                                        res.redirect('/candidate/home');
                                    }
                                } else {
                                    userModel.isUserARecruiter(
                                        email,
                                        async function (isRecruiter) {
                                            if (isRecruiter) {
                                                logDebug(
                                                    `POST /login/connectUser - Recruiter role for ${email}`
                                                );
                                                const results =
                                                    await session.createSession(
                                                        req.session,
                                                        email,
                                                        'Recruiter'
                                                    );
                                                if (results) {
                                                    res.redirect(
                                                        '/recruiter/home'
                                                    );
                                                }
                                            } else {
                                                userModel.isUserAnAdmin(
                                                    email,
                                                    async function (isAdmin) {
                                                        if (isAdmin) {
                                                            logDebug(
                                                                `POST /login/connectUser - Administrator role for ${email}`
                                                            );
                                                            const results =
                                                                await session.createSession(
                                                                    req.session,
                                                                    email,
                                                                    'Administrator'
                                                                );
                                                            if (results) {
                                                                res.redirect(
                                                                    '/admin/home'
                                                                );
                                                            }
                                                        } else {
                                                            logError(
                                                                `POST /login/connectUser - Unknown role for ${email}`
                                                            );
                                                            res.status(
                                                                401
                                                            ).json({
                                                                error: 'Unknown role',
                                                                status: 'error'
                                                            });
                                                        }
                                                    }
                                                );
                                            }
                                        }
                                    );
                                }
                            }
                        );
                    } else {
                        logError(
                            `POST /login/connectUser - Inactive account for ${email}`
                        );
                        res.status(401).json({
                            error: 'Inactive account',
                            status: 'error'
                        });
                    }
                });
            } else {
                logError(
                    `POST /login/connectUser - Invalid credentials for ${email}`
                );
                res.redirect('/login');
            }
        });
    } catch (error) {
        logError('POST /login/connectUser - Failed to verify user', error);
        res.status(500).json({
            error: 'Failed to verify user',
            status: 'error'
        });
    }
});

// Logout user and destroy session
router.get('/disconnectUser', function (req, res) {
    logDebug('GET /login/disconnectUser - Logging out user');
    try {
        session.deleteSession(req.session);
        logDebug('GET /login/disconnectUser - User session deleted');
        res.redirect('/login');
    } catch (error) {
        logError('GET /login/disconnectUser - Error during user logout', error);
        res.status(500).json({
            error: 'Error during user logout',
            status: 'error'
        });
    }
});

module.exports = router;
