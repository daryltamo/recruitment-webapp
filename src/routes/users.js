const express = require('express');
const userModel = require('../model/user');
const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

const router = express.Router();

/* GET users listing. */
router.get('/', function (res) {
    res.render('utilisateur', {
        title: 'Gestion des utilisateurs'
    });
});

router.get('/users', function (req, res) {
    logDebug('GET /users - Fetching all users');
    try {
        userModel.readall(function (result) {
            if (result) {
                logDebug('GET /users - Users found');
                res.render('usersList', {
                    title: 'User List',
                    users: result,
                    message: 'Users retrieved successfully.'
                });
            } else {
                logError('GET /users - Failed to retrieve users');
                res.status(404).json({
                    error: 'Failed to retrieve users.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        logError('GET /users - Error retrieving users', error);
        res.status(500).json({
            error: 'Failed to retrieve users.',
            status: 'error'
        });
    }
});

router.get('/usersList', function (req, res) {
    logDebug('GET /usersList - Fetching all users');
    try {
        userModel.readall(function (result) {
            if (result) {
                logDebug('GET /usersList - Users found');
                res.render('utilisateur', {
                    title: 'User List',
                    users: result,
                    message: 'Users retrieved successfully.'
                });
            } else {
                logError('GET /usersList - Failed to retrieve users');
                res.status(404).json({
                    error: 'Failed to retrieve users.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        logError('GET /usersList - Error retrieving users', error);
        res.status(500).json({
            error: 'Failed to retrieve users.',
            status: 'error'
        });
    }
});

router.post('/addUser', function (req, res) {
    try {
        const email = req.body.email; // body pour les posts et params pour le get
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const phoneNumber = req.body.telephone;
        const password = req.body.password;
        const statut = 1; // 1 renseigne sur le fait que l\'utilisateur soit actif par defaut
        const userType = 'Candidat'; // Candidat par défaut
        const idOrganization = 0; //par defaut
        const accountRegistrationDate = new Date();

        logDebug('POST /users/addUser - Adding new user');

        if (password !== req.body.mdp_repete) {
            logError('POST /users/addUser - Passwords do not match');
            res.status(401).json({
                error: 'Passwords do not match',
                status: 'password'
            });
            return;
        }

        userModel.create(
            email,
            password,
            nom,
            prenom,
            phoneNumber,
            accountRegistrationDate,
            statut,
            idOrganization,
            userType,
            function (success) {
                if (success) {
                    logDebug('POST /users/addUser - User added successfully');
                    res.status(201).json({
                        message: 'User added successfully',
                        status: 'success'
                    });
                } else {
                    logError('POST /users/addUser - Failed to add user');
                    res.status(400).json({
                        error: 'Failed to add user',
                        status: 'email'
                    });
                }
            }
        );
    } catch (error) {
        logError('POST /users/addUser - Failed to add user', error);
        res.status(500).json({
            error: 'Failed to add user',
            status: 'error'
        });
    }
});

router.put('/', function (req, res) {
    try {
        logDebug('PUT /users - Updating user', req.body);
        const email = req.body.email;
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const phoneNumber = req.body.telephone;
        const userType = req.body.userType;
        const password = req.body.password;

        userModel.update(
            email,
            nom,
            prenom,
            phoneNumber,
            userType,
            password,
            function (success) {
                if (success) {
                    logDebug('PUT /users - User updated successfully');
                    res.status(200).json({
                        message: 'User updated successfully.',
                        status: 'success'
                    });
                } else {
                    logError('PUT /users - Failed to update user');
                    res.status(400).json({
                        error: 'Failed to update user',
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        logError('PUT /users - Failed to update user', error);
        res.status(500).json({
            error: 'Failed to update user',
            status: 'error'
        });
    }
});

router.put('/updateUser', function (req, res) {
    try {
        logDebug('PUT /users/updateUser - Updating user', req.body);
        const email = req.body.email;
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const phoneNumber = req.body.telephone;
        const userType = req.body.userType;
        const password = req.body.password;

        userModel.update(
            email,
            nom,
            prenom,
            phoneNumber,
            userType,
            password,
            function (success) {
                if (success) {
                    logDebug(
                        'PUT /users/updateUser - User updated successfully'
                    );
                    res.status(200).json({
                        message: 'User updated successfully',
                        status: 'success'
                    });
                } else {
                    logError('PUT /users/updateUser - Failed to update user');
                    res.status(400).json({
                        error: 'Failed to update user',
                        status: 'error'
                    });
                }
            }
        );
    } catch (error) {
        logError('PUT /users/updateUser - Failed to update user', error);
        res.status(500).json({
            error: 'Failed to update user',
            status: 'error'
        });
    }
});

// Route to make a user a recruiter
router.put('/rendreRecruteur/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const NEEDED_USER_TYPE = 'Recruteur';

        userModel.updateUserType(email, NEEDED_USER_TYPE, function (success) {
            if (success) {
                logDebug(
                    `PUT /users/rendreRecruteur/${email} - User promoted to recruiter`
                );
                res.status(200).send({
                    message: 'User promoted to recruiter successfully.',
                    status: 'success'
                });
            } else {
                logError(
                    `PUT /users/rendreRecruteur/${email} - Failed to promote user to recruiter`
                );
                res.status(400).send({
                    error: 'Failed to promote user to recruiter.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        logError(
            `PUT /users/rendreRecruteur/${email} - Error promoting user to recruiter`,
            error
        );
        res.status(500).send({
            error: 'Error promoting user to recruiter',
            status: 'error'
        });
    }
});

// Route to make a user an admin
router.put('/rendreAdmin/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const NEEDED_USER_TYPE = 'Administrateur';

        userModel.updateUserType(email, NEEDED_USER_TYPE, function (success) {
            if (success) {
                logDebug(
                    `PUT /users/rendreAdmin/${email} - User promoted to admin`
                );
                res.status(200).send({
                    message: 'User promoted to admin successfully.',
                    status: 'success'
                });
            } else {
                logError(
                    `PUT /users/rendreAdmin/${email} - Failed to promote user to admin`
                );
                res.status(400).send({
                    error: 'Failed to promote user to admin.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        logError(
            `PUT /users/rendreAdmin/${email} - Error promoting user to admin`,
            error
        );
        res.status(500).send({
            error: 'Error promoting user to admin',
            status: 'error'
        });
    }
});

// Route to remove admin status from a user
router.put('/enleverAdmin/:email', async (req, res) => {
    const email = req.params.email;

    try {
        const NEEDED_USER_TYPE = 'Candidat';

        userModel.updateUserType(email, NEEDED_USER_TYPE, function (success) {
            if (success) {
                logDebug(
                    `PUT /users/enleverAdmin/${email} - Admin privilege removed successfully`
                );
                res.status(200).send({
                    message: 'Admin privilege removed successfully.',
                    status: 'success'
                });
            } else {
                logError(
                    `PUT /users/enleverAdmin/${email} - Failed to remove admin privilege`
                );
                res.status(400).send({
                    error: 'Failed to remove admin privilege.',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        logError(
            `PUT /users/enleverAdmin/${email} - Error removing admin privilege`,
            error
        );
        res.status(500).send({
            error: 'Error removing admin privilege',
            status: 'error'
        });
    }
});

router.delete('/', function (req, res) {
    try {
        const email = req.body.email;

        logDebug('DELETE /users - Deleting user');

        userModel.deleteUser(email, function (success) {
            if (success) {
                logDebug('DELETE /users - User deleted successfully');
                res.status(200).json({
                    message: 'User deleted successfully',
                    status: 'success'
                });
            } else {
                logError('DELETE /users - Failed to delete user');
                res.status(400).json({
                    error: 'Failed to delete user',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        logError('DELETE /users - Error deleting user', error);
        res.status(500).json({
            error: 'Error deleting user',
            status: 'error'
        });
    }
});

router.delete('/:email', function (req, res) {
    const email = req.params.email;

    try {
        // const nom = ;
        // const prenom = ;

        logDebug('DELETE /users/:email - Deleting user');

        userModel.deleteUser(email, function (success) {
            if (success) {
                logDebug(`DELETE /users/${email} - User deleted successfully`);
                res.status(200).json({
                    message: 'User deleted successfully',
                    status: 'success'
                });
            } else {
                logError(`DELETE /users/${email} - Failed to delete user`);
                res.status(400).json({
                    error: 'Failed to delete user',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        logError(`DELETE /users/${email} - Error deleting user`, error);
        res.status(500).json({
            error: 'Error deleting user',
            status: 'error'
        });
    }
});

router.get('/:email', function (req, res) {
    const email = req.params.email;

    try {
        logDebug('GET /users/:email - Fetching user');

        userModel.read(email, function (result) {
            if (result) {
                logDebug(`GET /users/${email} - User found`);
                res.status(200).json({
                    user: result,
                    status: 'success',
                    message: 'User found'
                });
            } else {
                logError(`GET /users/${email} - User not found`);
                res.status(404).json({
                    error: 'User not found',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        logError(`GET /users/${email} - Error fetching user`, error);
        res.status(500).json({
            error: 'Error fetching user',
            status: 'error'
        });
    }
});

router.post('/:email', function (req, res) {
    const email = req.params.email;

    try {
        logDebug('POST /users/:email - Fetching user');

        userModel.read(email, function (result) {
            if (result) {
                logDebug(`POST /users/${email} - User found`);
                res.status(200).json({
                    user: result,
                    status: 'success',
                    message: 'User found'
                });
            } else {
                logError(`POST /users/${email} - User not found`);
                res.status(404).json({
                    error: 'User not found',
                    status: 'error'
                });
            }
        });
    } catch (error) {
        logError(`POST /users/${email} - Error fetching user`, error);
        res.status(500).json({
            error: 'Error fetching user',
            status: 'error'
        });
    }
});

module.exports = router;
