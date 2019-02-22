const express = require('express');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const UniversityController = require('../universities/controller');

const router = express.Router();

router.post('/find-all-universities', async(req, res) => {
    try {
        // Find all universities
        const universities = await UniversityController.findAll();

        return res.send(Responses.success(universities));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/find-by-university-id', async(req, res) => {
    const id = req.body.id;

    // Check the university id
    const validate = Utils.checkNumber({
        id,
        label: 'University id'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Find by university id
        const university = await UniversityController.findById(id);

        return res.send(Responses.success(university));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/create-new-university', async(req, res) => {
    const name = req.body.name;

    // Check if the university name has a length of zero
    const validate = Utils.checkEmpty({
        value: name,
        label: 'University name'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Create new university
        const university = await UniversityController.create(name);

        return res.send(Responses.success(university));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-university-name', async(req, res) => {
    const id = req.body.id;
    const name = req.body.name;

    // Check the university id
    let validate = Utils.checkNumber({
        id,
        label: 'University id',
        forbidden: Forbidden.universities
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the university name has a length of zero
    validate = Utils.checkEmpty({
        value: name,
        label: 'University name'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update university name
        await UniversityController.update({
            id,
            name
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/delete-university', async(req, res) => {
    const id = req.body.id;

    // Check the university id
    const validate = Utils.checkNumber({
        id,
        label: 'University id',
        forbidden: Forbidden.universities
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Delete university
        await UniversityController.delete(id);

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

module.exports = router;