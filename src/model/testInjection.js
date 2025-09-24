const db = require('../../config/db.js');
const jsonResp = require('../utils/jsonResponse.js');

const { logDebug } = require('../utils/logger');
const { logError } = require('../utils/logger');

function jsonResponse(statusCode, status, message, data = {}) {
    return jsonResp.jsonResponse(statusCode, status, message, data);
}

module.exports = {
    // Check user credentials for injection test
    injection: function (email, password, next) {
        const sqlQuery =
            'SELECT * FROM utilisateur WHERE email = ? AND password = ?';
        db.query(sqlQuery, [email, password], function (err, result) {
            if (err) {
                logError('Error during injection test query', { email, err });
                return next(
                    jsonResponse(
                        500,
                        'error',
                        'Database error during injection test.',
                        { error: err }
                    )
                );
            }
            if (result.length > 0) {
                logDebug('User found during injection test', { email });
                next(
                    null,
                    jsonResponse(200, 'success', 'User found.', {
                        user: result[0]
                    })
                );
            } else {
                logDebug('User not found during injection test', { email });
                next(jsonResponse(404, 'error', 'User not found.'));
            }
        });
    }
};
