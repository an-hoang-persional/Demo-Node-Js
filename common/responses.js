module.exports = {
    /**
     * Creates response when request error
     *
     * @param error
     * @param status
     * @returns {{status: number, error: *}}
     */
    error: (error, status = 400) => {
        return {
            'status': status,
            'error': error
        };
    },
    /**
     * Creates response when request success
     *
     * @param result
     * @returns {{status: number, response: *}}
     */
    success: (result) => {
        return {
            'status': 200,
            'response': result
        };
    },
    /**
     * Creates response when request empty
     *
     * @returns {{status: number}}
     */
    empty: () => {
        return {
            'status': 204
        };
    },
    /**
     * Generates error handler
     *
     * @param error
     * @param req
     * @param res
     * @returns {*}
     */
    errorHandler: (error, req, res) => {
        if (typeof (error) === 'string') {
            // Custom application error
            return res.send(module.exports.error(error));
        }
        if (error.name === 'ValidationError') {
            // Validation error
            return res.send(module.exports.error(error.message));
        }
        // Default to 500 server error
        return res.send(module.exports.error(error.message, 500));
    }
};