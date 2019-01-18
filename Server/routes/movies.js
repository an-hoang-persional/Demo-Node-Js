const express = require('express');
const validator = require('validator');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const MovieController = new (require('../controllers/movies'))();

const router = express.Router();

router.post('/find-all-movies', (req, res) => {
    // Find all movies
    MovieController.findAll((error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        let movies = [];

        for (let movie of result) {
            movies.push({
                id: movie.movie_id,
                name: movie.movie_name
            });
        }
        return res.send(Responses.success(movies));
    });
});

router.post('/find-by-movie-id', (req, res) => {
    const id = req.body.id;

    // Check the movie id
    const validate = Utils.checkNumber(id, 'Movie id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Find by movie id
    MovieController.findById(id, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        return res.send(Responses.success({
            id: result[0].movie_id,
            name: result[0].movie_name
        }));
    });
});

router.post('/create-new-movie', (req, res) => {
    const name = req.body.name;
    const nameCheck = {
        value: name,
        label: 'Movie name'
    };

    // Check if the movie name has a length of zero
    const validate = Utils.checkEmpty(nameCheck);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Create new movie
    MovieController.create(name, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        return res.send(Responses.success({
            id: result[0].movie_id,
            name: result[0].movie_name
        }));
    });
});

router.post('/change-movie-name', async(req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const nameCheck = {
        value: name,
        label: 'Movie name'
    };

    // Check the movie id
    let validate = Utils.checkNumber(id, 'Movie id', Forbidden.movies);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the movie name has a length of zero
    validate = Utils.checkEmpty(nameCheck);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const movie = {
        id: id,
        name: name
    };

    // Update movie name
    await MovieController.update(movie);

    return res.send(Responses.success({}));
});

router.post('/delete-movie', async(req, res) => {
    const id = req.body.id;
    let validate;

    if (Array.isArray(id)) {
        // Check the array of movie id
        validate = Utils.checkListNumber(id, 'Movie id', Forbidden.movies);
    } else {
        // Check the movie id
        validate = Utils.checkNumber(id, 'Movie id', Forbidden.movies);
    }
    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Delete movie
    await MovieController.delete(id);

    return res.send(Responses.success({}));
});

module.exports = router;