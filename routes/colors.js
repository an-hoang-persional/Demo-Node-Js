const express = require('express');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const ColorController = require('../colors/controller');

const router = express.Router();

router.post('/find-all-colors', async(req, res) => {
    try {
        // Find all colors
        const colors = await ColorController.findAll();

        return res.send(Responses.success(colors));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/find-by-color-id', async(req, res) => {
    const id = req.body.id;

    // Check the color id
    const validate = Utils.checkNumber({
        id,
        label: 'Color id'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Find by color id
        const color = await ColorController.findById(id);

        return res.send(Responses.success(color));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/create-new-color', async(req, res) => {
    const name = req.body.name;

    // Check if the color name has a length of zero
    const validate = Utils.checkEmpty({
        value: name,
        label: 'Color name'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Create new color
        const color = await ColorController.create(name);

        return res.send(Responses.success(color));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-color-name', async(req, res) => {
    const id = req.body.id;
    const name = req.body.name;

    // Check the color id
    let validate = Utils.checkNumber({
        id,
        label: 'Color id',
        forbidden: Forbidden.colors
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the color name has a length of zero
    validate = Utils.checkEmpty({
        value: name,
        label: 'Color name'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update color name
        await ColorController.update({
            id,
            name
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/delete-color', async(req, res) => {
    const id = req.body.id;

    // Check the color id
    const validate = Utils.checkNumber({
        id,
        label: 'Color id',
        forbidden: Forbidden.colors
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Delete color
        await ColorController.delete(id);

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

module.exports = router;