const express = require('express');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const ColorController = new (require('../controllers/colors'))();

const router = express.Router();

router.post('/find-all-colors', (req, res) => {
    // Find all colors
    ColorController.findAll((error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        let colors = [];

        for (let color of result) {
            colors.push({
                id: color.color_id,
                name: color.color_name
            });
        }
        return res.send(Responses.success(colors));
    });
});

router.post('/find-by-color-id', (req, res) => {
    const id = req.body.id;

    // Check the color id
    const validate = Utils.checkNumber(id, 'Color id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Find by color id
    ColorController.findById(id, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        return res.send(Responses.success({
            id: result[0].color_id,
            name: result[0].color_name
        }));
    });
});

router.post('/create-new-color', (req, res) => {
    const name = req.body.name;
    const nameCheck = {
        value: name,
        label: 'Color name'
    };

    // Check if the color name has a length of zero
    const validate = Utils.checkEmpty(nameCheck);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Create new color
    ColorController.create(name, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        return res.send(Responses.success({
            id: result[0].color_id,
            name: result[0].color_name
        }));
    });
});

router.post('/change-color-name', async(req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const nameCheck = {
        value: name,
        label: 'Color name'
    };

    // Check the color id
    let validate = Utils.checkNumber(id, 'Color id', Forbidden.colors);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the color name has a length of zero
    validate = Utils.checkEmpty(nameCheck);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const color = {
        id: id,
        name: name
    };

    // Update color name
    await ColorController.update(color);

    return res.send(Responses.success({}));
});

router.post('/delete-color', async(req, res) => {
    const id = req.body.id;
    let validate;

    if (Array.isArray(id)) {
        // Check the array of color id
        validate = Utils.checkListNumber(id, 'Color id', Forbidden.colors);
    } else {
        // Check the color id
        validate = Utils.checkNumber(id, 'Color id', Forbidden.colors);
    }
    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Delete color
    await ColorController.delete(id);

    return res.send(Responses.success({}));
});

module.exports = router;