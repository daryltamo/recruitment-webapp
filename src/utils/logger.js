module.exports = {
    logDebug: function (message, data = {}) {
        console.debug(`[DEBUG] ${message}`, data);
    },

    logError: function (message, error) {
        console.error(`[ERROR] ${message}`, error);
    }
};
