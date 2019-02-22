const express = require('express');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const GenreController = require('../genres/controller');

const router = express.Router();

router.post('/find-all-genres', async(req, res) => {
    try {
        // Find all genres
        const genres = await GenreController.findAll();

        return res.send(Responses.success(genres));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/find-by-genre-id', async(req, res) => {
    const id = req.body.id;

    // Check the genre id
    const validate = Utils.checkNumber({
        id,
        label: 'Genre id'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Find by genre id
        const genre = await GenreController.findById(id);

        return res.send(Responses.success(genre));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/create-new-genre', async(req, res) => {
    const name = req.body.name;

    // Check if the genre name has a length of zero
    const validate = Utils.checkEmpty({
        value: name,
        label: 'Genre name'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Create new genre
        const genre = await GenreController.create(name);

        return res.send(Responses.success(genre));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-genre-name', async(req, res) => {
    const id = req.body.id;
    const name = req.body.name;

    // Check the genre id
    let validate = Utils.checkNumber({
        id,
        label: 'Genre id',
        forbidden: Forbidden.genres
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the genre name has a length of zero
    validate = Utils.checkEmpty({
        value: name,
        label: 'Genre name'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update genre name
        await GenreController.update({
            id,
            name
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/delete-genre', async(req, res) => {
    const id = req.body.id;

    // Check the genre id
    const validate = Utils.checkNumber({
        id,
        label: 'Genre id',
        forbidden: Forbidden.genres
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Delete genre
        await GenreController.delete(id);

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

module.exports = router;