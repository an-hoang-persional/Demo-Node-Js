const express = require('express');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const CarController = require('../cars/controller');

const router = express.Router();

router.post('/find-all-cars', async(req, res) => {
    try {
        // Find all cars
        const cars = await CarController.findAll();

        return res.send(Responses.success(cars));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/find-by-car-id', async(req, res) => {
    const id = req.body.id;

    // Check the car id
    const validate = Utils.checkNumber({
        id,
        label: 'Car id'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Find by car id
        const car = await CarController.findById(id);

        return res.send(Responses.success(car));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/create-new-car', async(req, res) => {
    const name = req.body.name;

    // Check if the car name has a length of zero
    const validate = Utils.checkEmpty({
        value: name,
        label: 'Car name'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Create new car
        const car = await CarController.create(name);

        return res.send(Responses.success(car));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-car-name', async(req, res) => {
    const id = req.body.id;
    const name = req.body.name;

    // Check the car id
    let validate = Utils.checkNumber({
        id,
        label: 'Car id',
        forbidden: Forbidden.cars
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the car name has a length of zero
    validate = Utils.checkEmpty({
        value: name,
        label: 'Car name'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update car name
        await CarController.update({
            id,
            name
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/delete-car', async(req, res) => {
    const id = req.body.id;

    // Check the car id
    const validate = Utils.checkNumber({
        id,
        label: 'Car id',
        forbidden: Forbidden.cars
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Delete car
        await CarController.delete(id);

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

module.exports = router;