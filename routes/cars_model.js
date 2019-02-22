const express = require('express');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const CarModelController = require('../cars-model/controller');

const router = express.Router();

router.post('/find-all-cars-model', async(req, res) => {
    try {
        // Find all cars model
        const models = await CarModelController.findAll();

        return res.send(Responses.success(models));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/find-by-car-model-id', async(req, res) => {
    const id = req.body.id;

    // Check the car model id
    const validate = Utils.checkNumber({
        id,
        label: 'Car model id'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Find by car model id
        const carModel = await CarModelController.findById(id);

        return res.send(Responses.success(carModel));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/create-new-car-model', async(req, res) => {
    const model = req.body.model;

    // Check the car model
    const validate = Utils.checkNumber({
        id: model,
        label: 'Car model'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Create new car model
        const carModel = await CarModelController.create(model);

        return res.send(Responses.success(carModel));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-car-model', async(req, res) => {
    const id = req.body.id;
    const model = req.body.model;
    const check = [{
        id,
        label: 'Car model id',
        forbidden: Forbidden.cars_model
    }, {
        id: model,
        label: 'Car model'
    }];

    // Check the car model id and the car model
    const validate = Utils.checkNumber(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update car model
        await CarModelController.update({
            id,
            model
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/delete-car-model', async(req, res) => {
    const id = req.body.id;

    // Check the car model id
    const validate = Utils.checkNumber({
        id,
        label: 'Car model id',
        forbidden: Forbidden.cars_model
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Delete car model
        await CarModelController.delete(id);

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

module.exports = router;