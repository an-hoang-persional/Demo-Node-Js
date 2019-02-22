const express = require('express');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const MovieController = require('../movies/controller');

const router = express.Router();

router.post('/find-all-movies', async(req, res) => {
    try {
        // Find all movies
        const movies = await MovieController.findAll();

        return res.send(Responses.success(movies));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/find-by-movie-id', async(req, res) => {
    const id = req.body.id;

    // Check the movie id
    const validate = Utils.checkNumber({
        id,
        label: 'Movie id'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Find by movie id
        const movie = await MovieController.findById(id);

        return res.send(Responses.success(movie));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/create-new-movie', async(req, res) => {
    const name = req.body.name;

    // Check if the movie name has a length of zero
    const validate = Utils.checkEmpty({
        value: name,
        label: 'Movie name'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Create new movie
        const movie = await MovieController.create(name);

        return res.send(Responses.success(movie));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-movie-name', async(req, res) => {
    const id = req.body.id;
    const name = req.body.name;

    // Check the movie id
    let validate = Utils.checkNumber({
        id,
        label: 'Movie id',
        forbidden: Forbidden.movies
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the movie name has a length of zero
    validate = Utils.checkEmpty({
        value: name,
        label: 'Movie name'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update movie name
        await MovieController.update({
            id,
            name
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/delete-movie', async(req, res) => {
    const id = req.body.id;

    // Check the movie id
    const validate = Utils.checkNumber({
        id,
        label: 'Movie id',
        forbidden: Forbidden.movies
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Delete movie
        await MovieController.delete(id);

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

module.exports = router;