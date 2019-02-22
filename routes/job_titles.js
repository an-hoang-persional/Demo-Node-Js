const express = require('express');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const JobTitleController = require('../job-titles/controller');

const router = express.Router();

router.post('/find-all-job-titles', async(req, res) => {
    try {
        // Find all job titles
        const titles = await JobTitleController.findAll();

        return res.send(Responses.success(titles));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/find-by-job-title-id', async(req, res) => {
    const id = req.body.id;

    // Check the job title id
    const validate = Utils.checkNumber({
        id,
        label: 'Job title id'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Find by job title id
        const jobTitle = await JobTitleController.findById(id);

        return res.send(Responses.success(jobTitle));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/create-new-job-title', async(req, res) => {
    const name = req.body.name;

    // Check if the job title name has a length of zero
    const validate = Utils.checkEmpty({
        value: name,
        label: 'Job title name'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Create new job title
        const jobTitle = await JobTitleController.create(name);

        return res.send(Responses.success(jobTitle));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-job-title-name', async(req, res) => {
    const id = req.body.id;
    const name = req.body.name;

    // Check the job title id
    let validate = Utils.checkNumber({
        id,
        label: 'Job title id',
        forbidden: Forbidden.job_titles
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the job title name has a length of zero
    validate = Utils.checkEmpty({
        value: name,
        label: 'Job title name'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update job title name
        await JobTitleController.update({
            id,
            name
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/delete-job-title', async(req, res) => {
    const id = req.body.id;

    // Check the job title id
    const validate = Utils.checkNumber({
        id,
        label: 'Job title id',
        forbidden: Forbidden.job_titles
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Delete job title
        await JobTitleController.delete(id);

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

module.exports = router;