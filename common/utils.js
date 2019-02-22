const bcrypt = require('bcrypt');
const validator = require('validator');

const Email = require('../config/email');

module.exports = {
    /**
     * Check the input string
     *
     * @param targets
     * @returns {*}
     */
    checkNumber: (targets) => {
        let messages = [];
        targets = Array.isArray(targets) ? targets : [targets];

        for (let target of targets) {
            const id = target.id;
            const label = target.label;
            const forbidden = target.forbidden;

            if (Array.isArray(id)) {
                // Check if the array of string has a length of zero
                if (id.length === 0) {
                    messages.push(`List of ${label.toLowerCase()} is empty !`);
                    continue;
                }
                // Check if the array of string contains only numbers
                const tmp = id.filter(id => !validator.isNumeric(id));

                if (tmp.length > 0) {
                    const be = tmp.length === 1 ? 'is' : 'are';

                    messages.push(`${label} 【${tmp.join(', ')}】 ${be} not a numeric !`);
                    continue;
                }
                if (forbidden) {
                    // Convert the array of input string to an integer and check if the string less than the forbidden
                    const tmp = id.find(id => validator.toInt(id) <= forbidden);

                    if (tmp) {
                        messages.push('You don\'t have permission !');
                    }
                }
            } else {
                // Check if the string has a length of zero
                if (validator.isEmpty(id)) {
                    messages.push(`${label} is empty !`);
                    continue;
                }
                // Check if the string contains only numbers
                if (!validator.isNumeric(id)) {
                    messages.push(`${label} 【${id}】 is not a numeric !`);
                    continue;
                }
                // Convert the input string to an integer and check if the string less than the forbidden
                if (forbidden && validator.toInt(id) <= forbidden) {
                    messages.push('You don\'t have permission !');
                }
            }
        }
        if (messages.length > 0) {
            return {
                error: true,
                message: messages.join('<br>')
            };
        }
        return {
            error: false
        };
    },
    /**
     * Check if the string has a length of zero
     *
     * @param fields
     * @returns {*}
     */
    checkEmpty: (fields) => {
        let messages = [];
        fields = Array.isArray(fields) ? fields : [fields];

        for (let field of fields) {
            if (validator.isEmpty(field.value)) {
                messages.push(`${field.label} is empty !`);
            }
        }
        if (messages.length > 0) {
            return {
                error: true,
                message: messages.join('<br>')
            };
        }
        return {
            error: false
        };
    },
    /**
     * Check if the string is an email
     *
     * @param email
     * @returns {*}
     */
    validateEmail: (email) => {
        if (!validator.isEmail(email)) {
            return {
                error: true,
                message: 'Enter e-mail address correctly !'
            };
        }
        return {
            error: false,
            email: validator.normalizeEmail(email, Email.normalizeEmail)
        };
    },
    /**
     * Hash password
     *
     * @param password
     * @returns {*}
     */
    hashPassword: (password) => {
        const salt = bcrypt.genSaltSync(10);

        return bcrypt.hashSync(password, salt);
    },
    /**
     * Check password
     *
     * @param password
     * @param hash
     * @returns {*}
     */
    checkPassword: (password, hash) => {
        return bcrypt.compareSync(password, hash);
    }
};