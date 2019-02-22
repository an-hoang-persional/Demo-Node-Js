const express = require('express');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const CompanyController = require('../companies/controller');

const router = express.Router();

router.post('/find-all-companies', async(req, res) => {
    try {
        // Find all companies
        const companies = await CompanyController.findAll();

        return res.send(Responses.success(companies));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/find-by-company-id', async(req, res) => {
    const id = req.body.id;

    // Check the company id
    const validate = Utils.checkNumber({
        id,
        label: 'Company id'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Find by company id
        const company = await CompanyController.findById(id);

        return res.send(Responses.success(company));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/create-new-company', async(req, res) => {
    const name = req.body.name;

    // Check if the company name has a length of zero
    const validate = Utils.checkEmpty({
        value: name,
        label: 'Company name'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Create new company
        const company = await CompanyController.create(name);

        return res.send(Responses.success(company));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-company-name', async(req, res) => {
    const id = req.body.id;
    const name = req.body.name;

    // Check the company id
    let validate = Utils.checkNumber({
        id,
        label: 'Company id',
        forbidden: Forbidden.companies
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the company name has a length of zero
    validate = Utils.checkEmpty({
        value: name,
        label: 'Company name'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update company name
        await CompanyController.update({
            id,
            name
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/delete-company', async(req, res) => {
    const id = req.body.id;

    // Check the company id
    const validate = Utils.checkNumber({
        id,
        label: 'Company id',
        forbidden: Forbidden.companies
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Delete company
        await CompanyController.delete(id);

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

module.exports = router;