const express = require('express');
const validator = require('validator');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const CarModelController = new (require('../controllers/cars_model'))();

const router = express.Router();

router.post('/find-all-cars-model', (req, res) => {
    // Find all cars model
    CarModelController.findAll((error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        let models = [];

        for (let model of result) {
            models.push({
                id: model.car_model_id,
                model: model.car_model
            });
        }
        return res.send(Responses.success(models));
    });
});

router.post('/find-by-car-model-id', (req, res) => {
    const id = req.body.id;

    // Check the car model id
    const validate = Utils.checkNumber(id, 'Car model id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Find by car model id
    CarModelController.findById(id, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        return res.send(Responses.success({
            id: result[0].car_model_id,
            model: result[0].car_model
        }));
    });
});

router.post('/create-new-car-model', (req, res) => {
    const model = req.body.model;

    // Check the car model
    const validate = Utils.checkNumber(model, 'Car model');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Create new car model
    CarModelController.create(model, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        return res.send(Responses.success({
            id: result[0].car_model_id,
            model: result[0].car_model
        }));
    });
});

router.post('/update-car-model', (req, res) => {
    const id = req.body.id;
    const model = req.body.model;

    // Check the car model id
    let validate = Utils.checkNumber(id, 'Car model id', Forbidden.cars_model);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Check the car model
    validate = Utils.checkNumber(model, 'Car model');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const carModel = {
        id: id,
        model: model
    };

    // Update car model
    CarModelController.update(carModel, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        return res.send(Responses.success(carModel));
    });
});

router.post('/delete-car-model', (req, res) => {
    const id = req.body.id;
    let validate;

    if (Array.isArray(id)) {
        // Check the array of car model id
        validate = Utils.checkListNumber(id, 'Car model id', Forbidden.cars_model);
    } else {
        // Check the car model id
        validate = Utils.checkNumber(id, 'Car model id', Forbidden.cars_model);
    }
    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Delete car model
    CarModelController.delete(id, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        return res.send(Responses.success({}));
    });
});

module.exports = router;