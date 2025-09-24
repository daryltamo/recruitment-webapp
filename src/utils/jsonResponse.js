module.exports = {
    jsonResponse: function (statusCode, status, message, data = {}) {
        return Object.assign(
            {
                statusCode,
                status,
                message
            },
            data
        );
    }
};
