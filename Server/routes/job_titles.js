const express = require('express');
const validator = require('validator');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const JobTitleController = new (require('../controllers/job_titles'))();

const router = express.Router();

router.post('/find-all-job-titles', (req, res) => {
    // Find all job titles
    JobTitleController.findAll((error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        let titles = [];

        for (let title of result) {
            titles.push({
                id: title.job_title_id,
                name: title.job_title_name
            });
        }
        return res.send(Responses.success(titles));
    });
});

router.post('/find-by-job-title-id', (req, res) => {
    const id = req.body.id;

    // Check the job title id
    const validate = Utils.checkNumber(id, 'Job title id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Find by job title id
    JobTitleController.findById(id, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        return res.send(Responses.success({
            id: result[0].job_title_id,
            name: result[0].job_title_name
        }));
    });
});

router.post('/create-new-job-title', (req, res) => {
    const name = req.body.name;
    const nameCheck = {
        value: name,
        label: 'Job title name'
    };

    // Check if the job title name has a length of zero
    const validate = Utils.checkEmpty(nameCheck);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Create new job title
    JobTitleController.create(name, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        return res.send(Responses.success({
            id: result[0].job_title_id,
            name: result[0].job_title_name
        }));
    });
});

router.post('/change-job-title-name', async(req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const nameCheck = {
        value: name,
        label: 'Job title name'
    };

    // Check the job title id
    let validate = Utils.checkNumber(id, 'Job title id', Forbidden.job_titles);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the job title name has a length of zero
    validate = Utils.checkEmpty(nameCheck);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const title = {
        id: id,
        name: name
    };

    // Update job title name
    await JobTitleController.update(title);

    return res.send(Responses.success({}));
});

router.post('/delete-job-title', async(req, res) => {
    const id = req.body.id;
    let validate;

    if (Array.isArray(id)) {
        // Check the array of job title id
        validate = Utils.checkListNumber(id, 'Job title id', Forbidden.job_titles);
    } else {
        // Check the job title id
        validate = Utils.checkNumber(id, 'Job title id', Forbidden.job_titles);
    }
    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Delete job title
    await JobTitleController.delete(id);

    return res.send(Responses.success({}));
});

module.exports = router;