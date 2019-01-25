const express = require('express');
const validator = require('validator');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const GenreController = new (require('../controllers/genres'))();

const router = express.Router();

router.post('/find-all-genres', (req, res) => {
    // Find all genres
    GenreController.findAll((error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        let genres = [];

        for (let genre of result) {
            genres.push({
                id: genre.genre_id,
                name: genre.genre_name
            });
        }
        return res.send(Responses.success(genres));
    });
});

router.post('/find-by-genre-id', (req, res) => {
    const id = req.body.id;

    // Check the genre id
    const validate = Utils.checkNumber(id, 'Genre id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Find by genre id
    GenreController.findById(id, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        return res.send(Responses.success({
            id: result[0].genre_id,
            name: result[0].genre_name
        }));
    });
});

router.post('/create-new-genre', (req, res) => {
    const name = req.body.name;
    const nameCheck = {
        value: name,
        label: 'Genre name'
    };

    // Check if the genre name has a length of zero
    const validate = Utils.checkEmpty(nameCheck);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Create new genre
    GenreController.create(name, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        return res.send(Responses.success({
            id: result[0].genre_id,
            name: result[0].genre_name
        }));
    });
});

router.post('/change-genre-name', async(req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const nameCheck = {
        value: name,
        label: 'Genre name'
    };

    // Check the genre id
    let validate = Utils.checkNumber(id, 'Genre id', Forbidden.genres);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the genre name has a length of zero
    validate = Utils.checkEmpty(nameCheck);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const genre = {
        id: id,
        name: name
    };

    // Update genre name
    await GenreController.update(genre);

    return res.send(Responses.success({}));
});

router.post('/delete-genre', async(req, res) => {
    const id = req.body.id;
    let validate;

    if (Array.isArray(id)) {
        // Check the array of genre id
        validate = Utils.checkListNumber(id, 'Genre id', Forbidden.genres);
    } else {
        // Check the genre id
        validate = Utils.checkNumber(id, 'Genre id', Forbidden.genres);
    }
    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Delete genre
    await GenreController.delete(id);

    return res.send(Responses.success({}));
});

module.exports = router;