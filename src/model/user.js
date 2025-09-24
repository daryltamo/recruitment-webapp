const db = require('../../config/db.js');
const jsonResp = require('../utils/jsonResponse.js');

const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

function jsonResponse(statusCode, status, message, data = {}) {
    return jsonResp.jsonResponse(statusCode, status, message, data);
}

module.exports = {
    // Add a new user to the database
    create: function (
        emailAddress,
        password,
        userLastName,
        userFirstName,
        phoneNumber,
        accountRegistrationDate,
        accountStatus,
        idOrganization,
        userType,
        next
    ) {
        const sqlQuery = 'INSERT INTO utilisateur (emailAddress, password, userLastName, userFirstName, phoneNumber, accountRegistrationDate, accountStatus, idOrganization, userType) VALUES (?,?,?,?,?,?,?,?,?)';
        db.query(
            sqlQuery,
            [
                emailAddress,
                password,
                userLastName,
                userFirstName,
                phoneNumber,
                accountRegistrationDate,
                accountStatus,
                idOrganization,
                userType
            ],
            function (err, result) {
                if (err) {
                    logError('Error creating user', { emailAddress, err });
                    return next(jsonResponse(500, 'error', 'Database error creating user.', { error: err }));
                }
                if (result.affectedRows === 1) {
                    logDebug('User created', { id: result.insertId });
                    next(null, jsonResponse(201, 'success', 'User created successfully.', { id: result.insertId }));
                } else {
                    logError('SQL query failed to create user', { emailAddress });
                    next(jsonResponse(400, 'error', 'SQL query failed to create user.'));
                }
            }
        );
    },

    read: function (emailAddress, next) {
        // Retrieve a user from the database
        const sqlQuery = 'SELECT * FROM utilisateur WHERE emailAddress = ?';
        db.query(sqlQuery, [emailAddress], function (err, result) {
            if (err) {
                logError('Error reading user', { emailAddress, err });
                return next(jsonResponse(500, 'error', 'Database error reading user.', { error: err }));
            }
            if (result.length > 0) {
                logDebug('User found', { emailAddress });
                next(null, jsonResponse(200, 'success', 'User found.', { user: result[0] }));
            } else {
                logDebug('User not found', { emailAddress });
                next(jsonResponse(404, 'error', 'User not found.'));
            }
        });
    },

    readAll: function (next) {
        // Retrieve all users from the database
        const sqlQuery = 'SELECT * FROM utilisateur';
        db.query(sqlQuery, function (err, results) {
            if (err) {
                logError('Error reading all users', { err });
                return next(jsonResponse(500, 'error', 'Database error reading all users.', { error: err }));
            }
            logDebug('All users read', { count: results.length });
            next(null, jsonResponse(200, 'success', 'Users retrieved.', { users: results }));
        });
    },

    readAllAdmin: function (next) {
        // Retrieve all admin users from the database
        const USER_TYPE_ADMIN = 'Administrateur';
        const sqlQuery = 'SELECT * FROM utilisateur WHERE userType = ?';
        db.query(sqlQuery, [USER_TYPE_ADMIN], function (err, results) {
            if (err) {
                logError('Error reading all admin users', { err });
                return next(jsonResponse(500, 'error', 'Database error reading all admin users.', { error: err }));
            }
            logDebug('All admin users read', { count: results.length });
            next(null, jsonResponse(200, 'success', 'Admin users retrieved.', { users: results }));
        });
    },

    update: function (
        emailAddress,
        userLastName,
        userFirstName,
        phoneNumber,
        userType,
        password,
        next
    ){
        // Update a user in the database
        const sqlQuery = 'UPDATE utilisateur SET userLastName = ?, userFirstName = ?, phoneNumber = ?, userType = ?, password = ? WHERE emailAddress = ?';
        db.query(
            sqlQuery,
            [
                userLastName,
                userFirstName,
                phoneNumber,
                userType,
                password,
                emailAddress
            ],
            function (err, result) {
                if (err) {
                    logError('Error updating user', { emailAddress, err });
                    return next(jsonResponse(500, 'error', 'Database error updating user.', { error: err }));
                }
                if (result.affectedRows === 1) {
                    logDebug('User updated', { emailAddress });
                    next(null, jsonResponse(200, 'success', 'User updated successfully.'));
                } else {
                    logDebug('User not found for update', { emailAddress });
                    next(jsonResponse(404, 'error', 'User not found.'));
                }
            }
        );
    },

    updateUserType: function (emailAddress, userType, next) {
        // Update user type in the database
        const sqlQuery = 'UPDATE utilisateur SET userType= ? WHERE emailAddress = ?';
        db.query(sqlQuery, [userType, emailAddress], function (err, result) {
            if (err) {
                logError('Error updating user type', { emailAddress, err });
                return next(jsonResponse(500, 'error', 'Database error updating user type.', { error: err }));
            }
            if (result.affectedRows === 1) {
                logDebug('User type updated', { emailAddress });
                next(null, jsonResponse(200, 'success', 'User type updated successfully.'));
            } else {
                logDebug('User not found for type update', { emailAddress });
                next(jsonResponse(404, 'error', 'User not found.'));
            }
        });
    },

    updateUserOrg: function (emailAddress, idOrganization, next) {
        // Update user's organization in the database
        const sqlQuery = 'UPDATE utilisateur SET idOrganization= ? WHERE emailAddress = ?';
        db.query(sqlQuery, [idOrganization, emailAddress], function (err, result) {
            if (err) {
                logError('Error updating user organization', { emailAddress, err });
                return next(jsonResponse(500, 'error', 'Database error updating user organization.', { error: err }));
            }
            if (result.affectedRows === 1) {
                logDebug('User organization updated', { emailAddress });
                next(null, jsonResponse(200, 'success', 'User organization updated successfully.'));
            } else {
                logDebug('User not found for organization update', { emailAddress });
                next(jsonResponse(404, 'error', 'User not found.'));
            }
        });
    },

    updateUserOrgUsingId: function (idUser, idOrganization, next) {
        // Update user's organization by user ID in the database
        const sqlQuery = 'UPDATE utilisateur SET idOrganization= ? WHERE idUser = ?';
        db.query(sqlQuery, [idOrganization, idUser], function (err, result) {
            if (err) {
                logError('Error updating user organization by ID', { idUser, err });
                return next(jsonResponse(500, 'error', 'Database error updating user organization by ID.', { error: err }));
            }
            if (result.affectedRows === 1) {
                logDebug('User organization updated by ID', { idUser });
                next(null, jsonResponse(200, 'success', 'User organization updated successfully.'));
            } else {
                logDebug('User not found for organization update by ID', { idUser });
                next(jsonResponse(404, 'error', 'User not found.'));
            }
        });
    },

    deleteUser: function (emailAddress, next) {
        // Delete a user from the database
        const sqlQuery = 'DELETE FROM utilisateur WHERE emailAddress = ?';
        db.query(sqlQuery, [emailAddress], function (err, result) {
            if (err) {
                logError('Error deleting user', { emailAddress, err });
                return next(jsonResponse(500, 'error', 'Database error deleting user.', { error: err }));
            }
            if (result.affectedRows === 1) {
                logDebug('User deleted', { emailAddress });
                next(null, jsonResponse(200, 'success', 'User deleted.'));
            } else {
                logDebug('User not found for delete', { emailAddress });
                next(jsonResponse(404, 'error', 'User not found.'));
            }
        });
    },

    areValid: function (emailAddress, password, next) {
        // Validate user credentials
        const sqlQuery = 'SELECT password FROM utilisateur WHERE emailAddress = ?';
        db.query(sqlQuery, [emailAddress], function (err, result) {
            if (err) {
                logError('Error validating user credentials', { emailAddress, err });
                return next(jsonResponse(500, 'error', 'Database error validating user credentials.', { error: err }));
            }
            const valid = result.length >= 1 && result[0].password === password;
            logDebug('User credentials validation checked', { emailAddress, valid });
            next(null, jsonResponse(200, 'success', 'User credentials validation checked.', { valid }));
        });
    },

    deactivateUser: function (emailAddress, next) {
        // Deactivate a user
        const INACTIVE_USER_STATUS = 0;
        const sqlQuery = 'UPDATE utilisateur SET accountStatus= ? WHERE emailAddress= ?';
        db.query(sqlQuery, [INACTIVE_USER_STATUS, emailAddress], function (err, result) {
            if (err) {
                logError('Error deactivating user', { emailAddress, err });
                return next(jsonResponse(500, 'error', 'Database error deactivating user.', { error: err }));
            }
            if (result.affectedRows === 1) {
                logDebug('User deactivated', { emailAddress });
                next(null, jsonResponse(200, 'success', 'User deactivated successfully.'));
            } else {
                logDebug('User not found for deactivation', { emailAddress });
                next(jsonResponse(404, 'error', 'User not found.'));
            }
        });
    },

    isUserActive: function (emailAddress, next) {
        // Check if a user is active (accountStatus = 1)
        const ACTIVE_USER_STATUS = 1;
        const sqlQuery = 'SELECT accountStatus FROM utilisateur WHERE emailAddress = ?';
        db.query(sqlQuery, [emailAddress], function (err, result) {
            if (err) {
                logError('Error checking user active status', { emailAddress, err });
                return next(jsonResponse(500, 'error', 'Database error checking user active status.', { error: err }));
            }
            const isActive = result.length === 1 && result[0].accountStatus === ACTIVE_USER_STATUS;
            logDebug('User active status checked', { emailAddress, isActive });
            next(null, jsonResponse(200, 'success', 'User active status checked.', { isActive }));
        });
    },

    isUserAnAdmin: function (emailAddress, next) {
        // Check if a user is an admin (userType = 'Administrateur')
        const USER_TYPE_ADMIN = 'Administrateur';
        const sqlQuery = 'SELECT userType FROM utilisateur WHERE emailAddress = ?';
        db.query(sqlQuery, [emailAddress], function (err, result) {
            if (err) {
                logError('Error checking user admin status', { emailAddress, err });
                return next(jsonResponse(500, 'error', 'Database error checking user admin status.', { error: err }));
            }
            const isAdmin = result.length === 1 && result[0].userType === USER_TYPE_ADMIN;
            logDebug('User admin status checked', { emailAddress, isAdmin });
            next(null, jsonResponse(200, 'success', 'User admin status checked.', { isAdmin }));
        });
    },

    isUserARecruiter: function (emailAddress, next) {
        // Check if a user is a recruiter (userType = 'Recruteur')
        const USER_TYPE_RECRUTEUR = 'Recruteur';
        const sqlQuery = 'SELECT userType FROM utilisateur WHERE emailAddress = ?';
        db.query(sqlQuery, [emailAddress], function (err, result) {
            if (err) {
                logError('Error checking user recruiter status', { emailAddress, err });
                return next(jsonResponse(500, 'error', 'Database error checking user recruiter status.', { error: err }));
            }
            const isRecruiter = result.length === 1 && result[0].userType === USER_TYPE_RECRUTEUR;
            logDebug('User recruiter status checked', { emailAddress, isRecruiter });
            next(null, jsonResponse(200, 'success', 'User recruiter status checked.', { isRecruiter }));
        });
    },

    isUserACandidate: function (emailAddress, next) {
        // Check if a user is a candidate (userType = 'Candidat')
        const USER_TYPE_CANDIDATE = 'Candidat';
        const sqlQuery = 'SELECT userType FROM utilisateur WHERE emailAddress = ?';
        db.query(sqlQuery, [emailAddress], function (err, result) {
            if (err) {
                logError('Error checking user candidate status', { emailAddress, err });
                return next(jsonResponse(500, 'error', 'Database error checking user candidate status.', { error: err }));
            }
            const isCandidate = result.length === 1 && result[0].userType === USER_TYPE_CANDIDATE;
            logDebug('User candidate status checked', { emailAddress, isCandidate });
            next(null, jsonResponse(200, 'success', 'User candidate status checked.', { isCandidate }));
        });
    }
};
