const express = require('express');
const validator = require('validator');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const UniversityController = new (require('../controllers/universities'))();

const router = express.Router();

router.post('/find-all-universities', (req, res) => {
    // Find all universities
    UniversityController.findAll((error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        let universities = [];

        for (let university of result) {
            universities.push({
                id: university.university_id,
                name: university.university_name
            });
        }
        return res.send(Responses.success(universities));
    });
});

router.post('/find-by-university-id', (req, res) => {
    const id = req.body.id;

    // Check the university id
    const validate = Utils.checkNumber(id, 'University id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Find by university id
    UniversityController.findById(id, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        return res.send(Responses.success({
            id: result[0].university_id,
            name: result[0].university_name
        }));
    });
});

router.post('/create-new-university', (req, res) => {
    const name = req.body.name;
    const nameCheck = {
        value: name,
        label: 'University name'
    };

    // Check if the university name has a length of zero
    const validate = Utils.checkEmpty(nameCheck);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Create new university
    UniversityController.create(name, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        return res.send(Responses.success({
            id: result[0].university_id,
            name: result[0].university_name
        }));
    });
});

router.post('/change-university-name', async(req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const nameCheck = {
        value: name,
        label: 'University name'
    };

    // Check the university id
    let validate = Utils.checkNumber(id, 'University id', Forbidden.universities);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the university name has a length of zero
    validate = Utils.checkEmpty(nameCheck);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const university = {
        id: id,
        name: name
    };

    // Update university name
    await UniversityController.update(university);

    return res.send(Responses.success({}));
});

router.post('/delete-university', async(req, res) => {
    const id = req.body.id;
    let validate;

    if (Array.isArray(id)) {
        // Check the array of university id
        validate = Utils.checkListNumber(id, 'University id', Forbidden.universities);
    } else {
        // Check the university id
        validate = Utils.checkNumber(id, 'University id', Forbidden.universities);
    }
    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Delete university
    await UniversityController.delete(id);

    return res.send(Responses.success({}));
});

module.exports = router;