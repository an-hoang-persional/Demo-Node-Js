const express = require('express');

const Responses = require('../common/responses');
const Utils = require('../common/utils');

const UserController = new (require('../controllers/users'))();

const router = express.Router();

router.post('/login', (req, res) => {
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
    // Login
    UserController.login(email, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        if (result[0].role === 0) {
            return res.send(Responses.error('You don\'t have permission !'));
        }
        // Check password
        const validate = Utils.checkPassword(password, result[0].password);

        if (!validate) {
            return res.send(Responses.error('Wrong password !'));
        }
        return res.send(Responses.success({
            id: result[0].user_id,
            username: result[0].username,
            email: result[0].email,
            role: result[0].role
        }));
    });
});

module.exports = router;