const validator = require('validator');

module.exports = {
    /**
     * Check the input string
     *
     * @param id
     * @param label
     * @param forbidden
     * @returns {*}
     */
    checkNumber: (id, label, forbidden = null) => {
        // Check if the string has a length of zero
        if (validator.isEmpty(id)) {
            return {
                error: true,
                message: `${label} is empty !`
            };
        }
        // Check if the string contains only numbers
        if (!validator.isNumeric(id)) {
            return {
                error: true,
                message: `${label} 【${id}】 is not a numeric !`
            };
        }
        // Convert the input string to an integer and check if the string less than the forbidden
        if (forbidden && validator.toInt(id) <= forbidden) {
            return {
                error: true,
                message: 'You don\'t have permission !'
            };
        }
        return {
            error: false
        };
    },
    /**
     * Check the array of input string
     *
     * @param ids
     * @param label
     * @param forbidden
     * @returns {*}
     */
    checkListNumber: (ids, label, forbidden = null) => {
        // Check if the array of string has a length of zero
        if (ids.length === 0) {
            return {
                error: true,
                message: `List of ${label.toLowerCase()} is empty !`
            };
        }
        // Check if the array of string contains only numbers
        const tmp = ids.filter(id => !validator.isNumeric(id));

        if (tmp.length > 0) {
            const be = tmp.length === 1 ? 'is' : 'are';

            return {
                error: true,
                message: `${label} 【${tmp.join(', ')}】 ${be} not a numeric !`
            };
        }
        if (forbidden) {
            // Convert the array of input string to an integer and check if the string less than the forbidden
            const tmp = ids.filter(id => validator.toInt(id) <= forbidden);

            if (tmp.length > 0) {
                return {
                    error: true,
                    message: 'You don\'t have permission !'
                };
            }
        }
        return {
            error: false
        };
    }
};