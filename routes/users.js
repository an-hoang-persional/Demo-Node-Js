const express = require('express');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const UserController = require('../users/controller');

const router = express.Router();

router.post('/find-all-users', async(req, res) => {
    try {
        // Find all users
        const users = await UserController.findAll();

        return res.send(Responses.success(users));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/find-by-user-id', async(req, res) => {
    const id = req.body.id;

    // Check the user id
    const validate = Utils.checkNumber({
        id,
        label: 'User id'
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Find by user id
        const user = await UserController.findById(id);

        return res.send(Responses.success(user));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/create-new-user', async(req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const gender = req.body.gender;
    const check = [{
        value: username,
        label: 'Username'
    }, {
        value: email,
        label: 'Email'
    }, {
        value: password,
        label: 'Password'
    }, {
        value: firstName,
        label: 'First name'
    }, {
        value: lastName,
        label: 'Last name'
    }];

    // Check if the username, email, password, first name or last name has a length of zero
    let validate = Utils.checkEmpty(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Check the email
    validate = Utils.validateEmail(email);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Create new user
        const user = await UserController.create({
            username,
            email,
            password: Utils.hashPassword(password),
            firstName,
            lastName,
            gender
        });

        return res.send(Responses.success(user));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-password', async(req, res) => {
    const id = req.body.id;
    const password = req.body.password;
    const newPassword = req.body.new_password;
    const check = [{
        value: password,
        label: 'Password'
    }, {
        value: newPassword,
        label: 'New password'
    }];

    // Check the user id
    let validate = Utils.checkNumber({
        id,
        label: 'User id',
        forbidden: Forbidden.user
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the password or new password has a length of zero
    validate = Utils.checkEmpty(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Check exist by user id and if can change password
        const check = await UserController.checkPassword(id, password);

        if (typeof check === 'string') {
            return res.send(Responses.error(check));
        }
        // Update password
        await UserController.updatePassword({
            id,
            password: Utils.hashPassword(newPassword)
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-role', async(req, res) => {
    const id = req.body.id;
    const role = req.body.role;

    // Check the user id
    const validate = Utils.checkNumber({
        id,
        label: 'User id',
        forbidden: Forbidden.user
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update role
        await UserController.updateRole({
            id,
            role
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-profile', async(req, res) => {
    const id = req.body.id;
    const firstName = req.body.first_name;
    const lastName = req.body.last_name;
    const gender = req.body.gender;
    const birthday = req.body.birthday;
    const phone = req.body.phone;
    const address = req.body.address;
    const slogan = req.body.slogan;
    const avatar = req.body.avatar;
    const check = [{
        value: firstName,
        label: 'First name'
    }, {
        value: lastName,
        label: 'Last name'
    }];

    // Check the user id
    let validate = Utils.checkNumber({
        id,
        label: 'User id',
        forbidden: Forbidden.user
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the first name or last name has a length of zero
    validate = Utils.checkEmpty(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update user profile
        await UserController.updateProfile({
            id,
            firstName,
            lastName,
            gender,
            birthday,
            phone,
            address,
            slogan,
            avatar
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/delete-user', async(req, res) => {
    const id = req.body.id;

    // Check the user id
    const validate = Utils.checkNumber({
        id,
        label: 'User id',
        forbidden: Forbidden.user
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Delete user
        await UserController.delete(id);

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/add-user-car', async(req, res) => {
    const userId = req.body.user_id;
    const carId = req.body.car_id;
    const modelId = req.body.model_id;
    const check = [{
        id: userId,
        label: 'User id',
        forbidden: Forbidden.user
    }, {
        id: carId,
        label: 'Car id'
    }, {
        id: modelId,
        label: 'Car model id'
    }];

    // Check the user id, the car id and the car model id
    const validate = Utils.checkNumber(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Add new user car relationship
        await UserController.addCar({
            userId,
            carId,
            modelId
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-user-car', async(req, res) => {
    const id = req.body.id;
    const carId = req.body.car_id;
    const modelId = req.body.model_id;
    const check = [{
        id,
        label: 'Relationship id',
        forbidden: Forbidden.user_car
    }, {
        id: carId,
        label: 'Car id'
    }, {
        id: modelId,
        label: 'Car model id'
    }];

    // Check the relationship id, the car id and the car model id
    const validate = Utils.checkNumber(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update user car relationship
        await UserController.updateCar({
            id,
            carId,
            modelId
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/delete-user-car', async(req, res) => {
    const id = req.body.id;

    // Check the relationship id
    const validate = Utils.checkNumber({
        id,
        label: 'Relationship id',
        forbidden: Forbidden.user_car
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Delete user car relationship
        await UserController.deleteCar(id);

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/add-user-color', async(req, res) => {
    const userId = req.body.user_id;
    const colorId = req.body.color_id;
    const check = [{
        id: userId,
        label: 'User id',
        forbidden: Forbidden.user
    }, {
        id: colorId,
        label: 'Color id'
    }];

    // Check the user id and the color id
    const validate = Utils.checkNumber(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Add new user color relationship
        await UserController.addColor({
            userId,
            colorId
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-user-color', async(req, res) => {
    const id = req.body.id;
    const colorId = req.body.color_id;
    const check = [{
        id,
        label: 'Relationship id',
        forbidden: Forbidden.user_color
    }, {
        id: colorId,
        label: 'Color id'
    }];

    // Check the relationship id and the color id
    const validate = Utils.checkNumber(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update user color relationship
        await UserController.updateColor({
            id,
            colorId
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/delete-user-color', async(req, res) => {
    const id = req.body.id;

    // Check the relationship id
    const validate = Utils.checkNumber({
        id,
        label: 'Relationship id',
        forbidden: Forbidden.user_color
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Delete user color relationship
        await UserController.deleteColor(id);

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/add-user-company', async(req, res) => {
    const userId = req.body.user_id;
    const companyId = req.body.company_id;
    const check = [{
        id: userId,
        label: 'User id',
        forbidden: Forbidden.user
    }, {
        id: companyId,
        label: 'Company id'
    }];

    // Check the user id and the company id
    const validate = Utils.checkNumber(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Add new user company relationship
        await UserController.addCompany({
            userId,
            companyId
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-user-company', async(req, res) => {
    const id = req.body.id;
    const companyId = req.body.company_id;
    const check = [{
        id,
        label: 'Relationship id',
        forbidden: Forbidden.user_company
    }, {
        id: companyId,
        label: 'Company id'
    }];

    // Check the relationship id and the company id
    const validate = Utils.checkNumber(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update user company relationship
        await UserController.updateCompany({
            id,
            companyId
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/delete-user-company', async(req, res) => {
    const id = req.body.id;

    // Check the relationship id
    const validate = Utils.checkNumber({
        id,
        label: 'Relationship id',
        forbidden: Forbidden.user_company
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Delete user company relationship
        await UserController.deleteCompany(id);

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/add-user-country', async(req, res) => {
    const userId = req.body.user_id;
    const countryId = req.body.country_id;
    const check = [{
        id: userId,
        label: 'User id',
        forbidden: Forbidden.user
    }, {
        id: countryId,
        label: 'Country id'
    }];

    // Check the user id and the country id
    const validate = Utils.checkNumber(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Add new user country relationship
        await UserController.addCountry({
            userId,
            countryId
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-user-country', async(req, res) => {
    const id = req.body.id;
    const countryId = req.body.country_id;
    const check = [{
        id,
        label: 'Relationship id',
        forbidden: Forbidden.user_country
    }, {
        id: countryId,
        label: 'Country id'
    }];

    // Check the relationship id and the country id
    const validate = Utils.checkNumber(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update user country relationship
        await UserController.updateCountry({
            id,
            countryId
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/delete-user-country', async(req, res) => {
    const id = req.body.id;

    // Check the relationship id
    const validate = Utils.checkNumber({
        id,
        label: 'Relationship id',
        forbidden: Forbidden.user_country
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Delete user country relationship
        await UserController.deleteCountry(id);

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/add-user-genre', async(req, res) => {
    const userId = req.body.user_id;
    const genreId = req.body.genre_id;
    const check = [{
        id: userId,
        label: 'User id',
        forbidden: Forbidden.user
    }, {
        id: genreId,
        label: 'Genre id'
    }];

    // Check the user id and the genre id
    const validate = Utils.checkNumber(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Add new user genre relationship
        await UserController.addGenre({
            userId,
            genreId
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-user-genre', async(req, res) => {
    const id = req.body.id;
    const genreId = req.body.genre_id;
    const check = [{
        id,
        label: 'Relationship id',
        forbidden: Forbidden.user_genre
    }, {
        id: genreId,
        label: 'Genre id'
    }];

    // Check the relationship id and the genre id
    const validate = Utils.checkNumber(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update user genre relationship
        await UserController.updateGenre({
            id,
            genreId
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/delete-user-genre', async(req, res) => {
    const id = req.body.id;

    // Check the relationship id
    const validate = Utils.checkNumber({
        id,
        label: 'Relationship id',
        forbidden: Forbidden.user_genre
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Delete user genre relationship
        await UserController.deleteGenre(id);

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/add-user-job-title', async(req, res) => {
    const userId = req.body.user_id;
    const titleId = req.body.title_id;
    const check = [{
        id: userId,
        label: 'User id',
        forbidden: Forbidden.user
    }, {
        id: titleId,
        label: 'Job title id'
    }];

    // Check the user id and the job title id
    const validate = Utils.checkNumber(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Add new user job title relationship
        await UserController.addJobTitle({
            userId,
            titleId
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-user-job-title', async(req, res) => {
    const id = req.body.id;
    const titleId = req.body.title_id;
    const check = [{
        id,
        label: 'Relationship id',
        forbidden: Forbidden.user_job_title
    }, {
        id: titleId,
        label: 'Job title id'
    }];

    // Check the relationship id and the job title id
    const validate = Utils.checkNumber(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update user job title relationship
        await UserController.updateJobTitle({
            id,
            titleId
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/delete-user-job-title', async(req, res) => {
    const id = req.body.id;

    // Check the relationship id
    const validate = Utils.checkNumber({
        id,
        label: 'Relationship id',
        forbidden: Forbidden.user_job_title
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Delete user job title relationship
        await UserController.deleteJobTitle(id);

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/add-user-movie', async(req, res) => {
    const userId = req.body.user_id;
    const movieId = req.body.movie_id;
    const check = [{
        id: userId,
        label: 'User id',
        forbidden: Forbidden.user
    }, {
        id: movieId,
        label: 'Movie id'
    }];

    // Check the user id and the movie id
    const validate = Utils.checkNumber(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Add new user movie relationship
        await UserController.addMovie({
            userId,
            movieId
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-user-movie', async(req, res) => {
    const id = req.body.id;
    const movieId = req.body.movie_id;
    const check = [{
        id,
        label: 'Relationship id',
        forbidden: Forbidden.user_movie
    }, {
        id: movieId,
        label: 'Movie id'
    }];

    // Check the relationship id and the movie id
    const validate = Utils.checkNumber(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update user movie relationship
        await UserController.addMovie({
            id,
            movieId
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/delete-user-movie', async(req, res) => {
    const id = req.body.id;

    // Check the relationship id
    const validate = Utils.checkNumber({
        id,
        label: 'Relationship id',
        forbidden: Forbidden.user_movie
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Delete user movie relationship
        await UserController.deleteMovie(id);

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/add-user-university', async(req, res) => {
    const userId = req.body.user_id;
    const universityId = req.body.university_id;
    const check = [{
        id: userId,
        label: 'User id',
        forbidden: Forbidden.user
    }, {
        id: universityId,
        label: 'University id'
    }];

    // Check the user id and the university id
    const validate = Utils.checkNumber(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Add new user university relationship
        await UserController.addUniversity({
            userId,
            universityId
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/change-user-university', async(req, res) => {
    const id = req.body.id;
    const universityId = req.body.university_id;
    const check = [{
        id,
        label: 'Relationship id',
        forbidden: Forbidden.user_university
    }, {
        id: universityId,
        label: 'University id'
    }];

    // Check the relationship id and the university id
    const validate = Utils.checkNumber(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Update user university relationship
        await UserController.updateUniversity({
            id,
            universityId
        });

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

router.post('/delete-user-university', async(req, res) => {
    const id = req.body.id;

    // Check the relationship id
    const validate = Utils.checkNumber({
        id,
        label: 'Relationship id',
        forbidden: Forbidden.user_university
    });

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    try {
        // Delete user university relationship
        await UserController.deleteUniversity(id);

        return res.send(Responses.success({}));
    } catch (error) {
        return res.send(Responses.error(error));
    }
});

module.exports = router;