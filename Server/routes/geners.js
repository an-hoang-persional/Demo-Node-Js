const express = require('express');
const validator = require('validator');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const GenerController = new (require('../controllers/geners'))();

const router = express.Router();

router.post('/find-all-geners', (req, res) => {
    // Find all geners
    GenerController.findAll((error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        let geners = [];

        for (let gener of result) {
            geners.push({
                id: gener.gener_id,
                name: gener.gener_name
            });
        }
        return res.send(Responses.success(geners));
    });
});

router.post('/find-by-gener-id', (req, res) => {
    const id = req.body.id;

    // Check the gener id
    const validate = Utils.checkNumber(id, 'Gener id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Find by gener id
    GenerController.findById(id, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        return res.send(Responses.success({
            id: result[0].gener_id,
            name: result[0].gener_name
        }));
    });
});

router.post('/create-new-gener', (req, res) => {
    const name = req.body.name;
    const nameCheck = {
        value: name,
        label: 'Gener name'
    };

    // Check if the gener name has a length of zero
    const validate = Utils.checkEmpty(nameCheck);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Create new gener
    GenerController.create(name, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        return res.send(Responses.success({
            id: result[0].gener_id,
            name: result[0].gener_name
        }));
    });
});

router.post('/change-gener-name', async(req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const nameCheck = {
        value: name,
        label: 'Gener name'
    };

    // Check the gener id
    let validate = Utils.checkNumber(id, 'Gener id', Forbidden.geners);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the gener name has a length of zero
    validate = Utils.checkEmpty(nameCheck);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const gener = {
        id: id,
        name: name
    };

    // Update gener name
    await GenerController.update(gener);

    return res.send(Responses.success({}));
});

router.post('/delete-gener', async(req, res) => {
    const id = req.body.id;
    let validate;

    if (Array.isArray(id)) {
        // Check the array of gener id
        validate = Utils.checkListNumber(id, 'Gener id', Forbidden.geners);
    } else {
        // Check the gener id
        validate = Utils.checkNumber(id, 'Gener id', Forbidden.geners);
    }
    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Delete gener
    await GenerController.delete(id);

    return res.send(Responses.success({}));
});

module.exports = router;