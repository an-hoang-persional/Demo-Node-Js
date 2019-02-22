const express = require('express');

const Responses = require('../common/responses');
const Utils = require('../common/utils');

const UserController = require('../users/controller');

const router = express.Router();

router.post('/login', async(req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const check = [{
        value: email,
        label: 'Email'
    }, {
        value: password,
        label: 'Password'
    }];

    // Check if the email or password has a length of zero
    let validate = Utils.checkEmpty(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the email
    validate = Utils.validateEmail(email);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Login
        const user = await UserController.login(email, password);

        if (typeof user === 'string') {
            return res.send(Responses.error(user));
        }
        return res.send(Responses.success(user));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

module.exports = router;