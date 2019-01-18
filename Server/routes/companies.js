const express = require('express');
const validator = require('validator');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const CompanyController = new (require('../controllers/companies'))();

const router = express.Router();

router.post('/find-all-companies', (req, res) => {
    // Find all companies
    CompanyController.findAll((error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        let companies = [];

        for (let company of result) {
            companies.push({
                id: company.company_id,
                name: company.company_name
            });
        }
        return res.send(Responses.success(companies));
    });
});

router.post('/find-by-company-id', (req, res) => {
    const id = req.body.id;

    // Check the company id
    const validate = Utils.checkNumber(id, 'Company id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Find by company id
    CompanyController.findById(id, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        return res.send(Responses.success({
            id: result[0].company_id,
            name: result[0].company_name
        }));
    });
});

router.post('/create-new-company', (req, res) => {
    const name = req.body.name;
    const nameCheck = {
        value: name,
        label: 'Company name'
    };

    // Check if the company name has a length of zero
    const validate = Utils.checkEmpty(nameCheck);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Create new company
    CompanyController.create(name, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        return res.send(Responses.success({
            id: result[0].company_id,
            name: result[0].company_name
        }));
    });
});

router.post('/change-company-name', async(req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const nameCheck = {
        value: name,
        label: 'Company name'
    };

    // Check the company id
    let validate = Utils.checkNumber(id, 'Company id', Forbidden.companies);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the company name has a length of zero
    validate = Utils.checkEmpty(nameCheck);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const company = {
        id: id,
        name: name
    };

    // Update company name
    await CompanyController.update(company);

    return res.send(Responses.success({}));
});

router.post('/delete-company', async(req, res) => {
    const id = req.body.id;
    let validate;

    if (Array.isArray(id)) {
        // Check the array of company id
        validate = Utils.checkListNumber(id, 'Company id', Forbidden.companies);
    } else {
        // Check the company id
        validate = Utils.checkNumber(id, 'Company id', Forbidden.companies);
    }
    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Delete company
    await CompanyController.delete(id);

    return res.send(Responses.success({}));
});

module.exports = router;