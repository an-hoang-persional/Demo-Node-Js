const express = require('express');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const CountryController = require('../countries/controller');

const router = express.Router();

router.post('/find-all-countries', async(req, res) => {
    try {
        // Find all countries
        const countries = await CountryController.findAll();

        return res.send(Responses.success(countries));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/find-by-country-id', async(req, res) => {
    const id = req.body.id;

    // Check the country id
    const validate = Utils.checkNumber({
        id,
        label: 'Country id'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Find by country id
        const country = await CountryController.findById(id);

        return res.send(Responses.success(country));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/create-new-country', async(req, res) => {
    const name = req.body.name;
    const code = req.body.code;
    const check = [{
        value: name,
        label: 'Country name'
    }, {
        value: code,
        label: 'Country code'
    }];

    // Check if the country name or country code has a length of zero
    const validate = Utils.checkEmpty(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Create new country
        const country = await CountryController.create({
            name,
            code
        });

        return res.send(Responses.success(country));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-country', async(req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const code = req.body.code;
    const check = [{
        value: name,
        label: 'Country name'
    }, {
        value: code,
        label: 'Country code'
    }];

    // Check the country id
    let validate = Utils.checkNumber({
        id,
        label: 'Country id',
        forbidden: Forbidden.countries
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the country name or country code has a length of zero
    validate = Utils.checkEmpty(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update country
        await CountryController.update({
            id,
            name,
            code
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/delete-country', async(req, res) => {
    const id = req.body.id;

    // Check the country id
    const validate = Utils.checkNumber({
        id,
        label: 'Country id',
        forbidden: Forbidden.countries
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Delete country
        await CountryController.delete(id);

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

module.exports = router;