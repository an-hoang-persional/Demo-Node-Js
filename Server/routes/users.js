const express = require('express');

const Forbidden = require('../common/forbidden');
const Responses = require('../common/responses');
const Utils = require('../common/utils');

const UserController = new (require('../controllers/users'))();

const router = express.Router();

router.post('/find-all-users', (req, res) => {
    // Find all users
    UserController.findAll((error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        let users = [];

        for (let user of result) {
            users.push({
                id: user.user_id,
                username: user.username,
                email: user.email,
                role: user.role,
                firstName: user.first_name,
                lastName: user.last_name,
                gender: user.gender,
                birthday: user.birthday,
                phone: user.phone_number,
                address: user.address,
                slogan: user.slogan,
                avatar: user.avatar
            });
        }
        return res.send(Responses.success(users));
    });
});

router.post('/find-by-user-id', (req, res) => {
    const id = req.body.id;

    // Check the user id
    const validate = Utils.checkNumber(id, 'User id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Find by user id
    UserController.findById(id, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        if (result.length === 0) {
            return res.send(Responses.empty());
        }
        return res.send(Responses.success(result));
    });
});

router.post('/create-new-user', (req, res) => {
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
    const user = {
        username: username,
        email: email,
        password: Utils.hashPassword(password),
        firstName: firstName,
        lastName: lastName,
        gender: gender
    };

    // Create new user
    UserController.create(user, (error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        return res.send(Responses.success(result));
    });
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
    let validate = Utils.checkNumber(id, 'User id', Forbidden.user);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the password or new password has a length of zero
    validate = Utils.checkEmpty(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Check exist by user id
    UserController.checkById(id, async(error, result) => {
        if (error) {
            return res.send(Responses.error(error));
        }
        // Check password
        const validate = Utils.checkPassword(password, result[0].password);

        if (!validate) {
            return res.send(Responses.error('Wrong password !'));
        }
        const user = {
            id: id,
            password: Utils.hashPassword(newPassword)
        };

        // Update password
        await UserController.updatePassword(user);

        return res.send(Responses.success({}));
    });
});

router.post('/change-role', async(req, res) => {
    const id = req.body.id;
    const role = req.body.role;

    // Check the user id
    let validate = Utils.checkNumber(id, 'User id', Forbidden.user);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const user = {
        id: id,
        role: role
    };

    // Update role
    await UserController.updateRole(user);

    return res.send(Responses.success({}));
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
    let validate = Utils.checkNumber(id, 'User id', Forbidden.user);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check if the first name or last name has a length of zero
    validate = Utils.checkEmpty(check);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const user = {
        id: id,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        birthday: birthday,
        phone: phone,
        address: address,
        slogan: slogan,
        avatar: avatar
    };

    // Update user profile
    await UserController.updateProfile(user);

    return res.send(Responses.success({}));
});

router.post('/delete-user', async(req, res) => {
    const id = req.body.id;
    let validate;

    if (Array.isArray(id)) {
        // Check the array of user id
        validate = Utils.checkListNumber(id, 'User id', Forbidden.user);
    } else {
        // Check the user id
        validate = Utils.checkNumber(id, 'User id', Forbidden.user);
    }
    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Delete user
    await UserController.delete(id);

    return res.send(Responses.success({}));
});

router.post('/add-user-car', async(req, res) => {
    const userId = req.body.user_id;
    const carId = req.body.car_id;
    const modelId = req.body.model_id;

    // Check the user id
    let validate = Utils.checkNumber(userId, 'User id', Forbidden.user);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the car id
    validate = Utils.checkNumber(carId, 'Car id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the car model id
    validate = Utils.checkNumber(modelId, 'Car model id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const userCar = {
        userId: userId,
        carId: carId,
        modelId: modelId
    };

    // Add new user car relationship
    await UserController.addCar(userCar);

    return res.send(Responses.success({}));
});

router.post('/change-user-car', async(req, res) => {
    const id = req.body.id;
    const carId = req.body.car_id;
    const modelId = req.body.model_id;

    // Check the relationship id
    let validate = Utils.checkNumber(id, 'Relationship id', Forbidden.user_car);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the car id
    validate = Utils.checkNumber(carId, 'Car id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the car model id
    validate = Utils.checkNumber(modelId, 'Car model id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const userCar = {
        id: id,
        carId: carId,
        modelId: modelId
    };

    // Update user car relationship
    await UserController.updateCar(userCar);

    return res.send(Responses.success({}));
});

router.post('/delete-user-car', async(req, res) => {
    const id = req.body.id;
    let validate;

    if (Array.isArray(id)) {
        // Check the array of relationship id
        validate = Utils.checkListNumber(id, 'Relationship id', Forbidden.user_car);
    } else {
        // Check the relationship id
        validate = Utils.checkNumber(id, 'Relationship id', Forbidden.user_car);
    }
    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Delete user car relationship
    await UserController.deleteCar(id);

    return res.send(Responses.success({}));
});

router.post('/add-user-color', async(req, res) => {
    const userId = req.body.user_id;
    const colorId = req.body.color_id;

    // Check the user id
    let validate = Utils.checkNumber(userId, 'User id', Forbidden.user);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the color id
    validate = Utils.checkNumber(colorId, 'Color id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const userColor = {
        userId: userId,
        colorId: colorId
    };

    // Add new user color relationship
    await UserController.addColor(userColor);

    return res.send(Responses.success({}));
});

router.post('/change-user-color', async(req, res) => {
    const id = req.body.id;
    const colorId = req.body.color_id;

    // Check the relationship id
    let validate = Utils.checkNumber(id, 'Relationship id', Forbidden.user_color);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the color id
    validate = Utils.checkNumber(colorId, 'Color id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const userColor = {
        id: id,
        colorId: colorId
    };

    // Update user color relationship
    await UserController.updateColor(userColor);

    return res.send(Responses.success({}));
});

router.post('/delete-user-color', async(req, res) => {
    const id = req.body.id;
    let validate;

    if (Array.isArray(id)) {
        // Check the array of relationship id
        validate = Utils.checkListNumber(id, 'Relationship id', Forbidden.user_color);
    } else {
        // Check the relationship id
        validate = Utils.checkNumber(id, 'Relationship id', Forbidden.user_color);
    }
    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Delete user color relationship
    await UserController.deleteColor(id);

    return res.send(Responses.success({}));
});

router.post('/add-user-company', async(req, res) => {
    const userId = req.body.user_id;
    const companyId = req.body.company_id;

    // Check the user id
    let validate = Utils.checkNumber(userId, 'User id', Forbidden.user);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the company id
    validate = Utils.checkNumber(companyId, 'Company id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const userCompany = {
        userId: userId,
        companyId: companyId
    };

    // Add new user company relationship
    await UserController.addCompany(userCompany);

    return res.send(Responses.success({}));
});

router.post('/change-user-company', async(req, res) => {
    const id = req.body.id;
    const companyId = req.body.company_id;

    // Check the relationship id
    let validate = Utils.checkNumber(id, 'Relationship id', Forbidden.user_company);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the company id
    validate = Utils.checkNumber(companyId, 'Company id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const userCompany = {
        id: id,
        companyId: companyId
    };

    // Update user company relationship
    await UserController.updateCompany(userCompany);

    return res.send(Responses.success({}));
});

router.post('/delete-user-company', async(req, res) => {
    const id = req.body.id;
    let validate;

    if (Array.isArray(id)) {
        // Check the array of relationship id
        validate = Utils.checkListNumber(id, 'Relationship id', Forbidden.user_company);
    } else {
        // Check the relationship id
        validate = Utils.checkNumber(id, 'Relationship id', Forbidden.user_company);
    }
    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Delete user company relationship
    await UserController.deleteCompany(id);

    return res.send(Responses.success({}));
});

router.post('/add-user-country', async(req, res) => {
    const userId = req.body.user_id;
    const countryId = req.body.country_id;

    // Check the user id
    let validate = Utils.checkNumber(userId, 'User id', Forbidden.user);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the country id
    validate = Utils.checkNumber(countryId, 'Country id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const userCountry = {
        userId: userId,
        countryId: countryId
    };

    // Add new user country relationship
    await UserController.addCountry(userCountry);

    return res.send(Responses.success({}));
});

router.post('/change-user-country', async(req, res) => {
    const id = req.body.id;
    const countryId = req.body.country_id;

    // Check the relationship id
    let validate = Utils.checkNumber(id, 'Relationship id', Forbidden.user_country);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the country id
    validate = Utils.checkNumber(countryId, 'Country id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const userCountry = {
        id: id,
        countryId: countryId
    };

    // Update user country relationship
    await UserController.updateCountry(userCountry);

    return res.send(Responses.success({}));
});

router.post('/delete-user-country', async(req, res) => {
    const id = req.body.id;
    let validate;

    if (Array.isArray(id)) {
        // Check the array of relationship id
        validate = Utils.checkListNumber(id, 'Relationship id', Forbidden.user_country);
    } else {
        // Check the relationship id
        validate = Utils.checkNumber(id, 'Relationship id', Forbidden.user_country);
    }
    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Delete user country relationship
    await UserController.deleteCountry(id);

    return res.send(Responses.success({}));
});

router.post('/add-user-gener', async(req, res) => {
    const userId = req.body.user_id;
    const generId = req.body.gener_id;

    // Check the user id
    let validate = Utils.checkNumber(userId, 'User id', Forbidden.user);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the gener id
    validate = Utils.checkNumber(generId, 'Gener id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const userGener = {
        userId: userId,
        generId: generId
    };

    // Add new user gener relationship
    await UserController.addGener(userGener);

    return res.send(Responses.success({}));
});

router.post('/change-user-gener', async(req, res) => {
    const id = req.body.id;
    const generId = req.body.gener_id;

    // Check the relationship id
    let validate = Utils.checkNumber(id, 'Relationship id', Forbidden.user_gener);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the gener id
    validate = Utils.checkNumber(generId, 'Gener id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const userGener = {
        id: id,
        generId: generId
    };

    // Update user gener relationship
    await UserController.updateGener(userGener);

    return res.send(Responses.success({}));
});

router.post('/delete-user-gener', async(req, res) => {
    const id = req.body.id;
    let validate;

    if (Array.isArray(id)) {
        // Check the array of relationship id
        validate = Utils.checkListNumber(id, 'Relationship id', Forbidden.user_gener);
    } else {
        // Check the relationship id
        validate = Utils.checkNumber(id, 'Relationship id', Forbidden.user_gener);
    }
    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Delete user gener relationship
    await UserController.deleteGener(id);

    return res.send(Responses.success({}));
});

router.post('/add-user-job-title', async(req, res) => {
    const userId = req.body.user_id;
    const titleId = req.body.title_id;

    // Check the user id
    let validate = Utils.checkNumber(userId, 'User id', Forbidden.user);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the job title id
    validate = Utils.checkNumber(titleId, 'Job title id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const userJobTitle = {
        userId: userId,
        titleId: titleId
    };

    // Add new user job title relationship
    await UserController.addJobTitle(userJobTitle);

    return res.send(Responses.success({}));
});

router.post('/change-user-job-title', async(req, res) => {
    const id = req.body.id;
    const titleId = req.body.title_id;

    // Check the relationship id
    let validate = Utils.checkNumber(id, 'Relationship id', Forbidden.user_job_title);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the job title id
    validate = Utils.checkNumber(titleId, 'Job title id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const userJobTitle = {
        id: id,
        titleId: titleId
    };

    // Update user job title relationship
    await UserController.updateJobTitle(userJobTitle);

    return res.send(Responses.success({}));
});

router.post('/delete-user-job-title', async(req, res) => {
    const id = req.body.id;
    let validate;

    if (Array.isArray(id)) {
        // Check the array of relationship id
        validate = Utils.checkListNumber(id, 'Relationship id', Forbidden.user_job_title);
    } else {
        // Check the relationship id
        validate = Utils.checkNumber(id, 'Relationship id', Forbidden.user_job_title);
    }
    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Delete user job title relationship
    await UserController.deleteJobTitle(id);

    return res.send(Responses.success({}));
});

router.post('/add-user-movie', async(req, res) => {
    const userId = req.body.user_id;
    const movieId = req.body.movie_id;

    // Check the user id
    let validate = Utils.checkNumber(userId, 'User id', Forbidden.user);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the movie id
    validate = Utils.checkNumber(movieId, 'Movie id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const userMovie = {
        userId: userId,
        movieId: movieId
    };

    // Add new user movie relationship
    await UserController.addMovie(userMovie);

    return res.send(Responses.success({}));
});

router.post('/change-user-movie', async(req, res) => {
    const id = req.body.id;
    const movieId = req.body.movie_id;

    // Check the relationship id
    let validate = Utils.checkNumber(id, 'Relationship id', Forbidden.user_movie);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the movie id
    validate = Utils.checkNumber(movieId, 'Movie id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const userMovie = {
        id: id,
        movieId: movieId
    };

    // Update user movie relationship
    await UserController.updateMovie(userMovie);

    return res.send(Responses.success({}));
});

router.post('/delete-user-movie', async(req, res) => {
    const id = req.body.id;
    let validate;

    if (Array.isArray(id)) {
        // Check the array of relationship id
        validate = Utils.checkListNumber(id, 'Relationship id', Forbidden.user_movie);
    } else {
        // Check the relationship id
        validate = Utils.checkNumber(id, 'Relationship id', Forbidden.user_movie);
    }
    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Delete user movie relationship
    await UserController.deleteMovie(id);

    return res.send(Responses.success({}));
});

router.post('/add-user-university', async(req, res) => {
    const userId = req.body.user_id;
    const universityId = req.body.university_id;

    // Check the user id
    let validate = Utils.checkNumber(userId, 'User id', Forbidden.user);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the university id
    validate = Utils.checkNumber(universityId, 'University id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const userUniversity = {
        userId: userId,
        universityId: universityId
    };

    // Add new user university relationship
    await UserController.addUniversity(userUniversity);

    return res.send(Responses.success({}));
});

router.post('/change-user-university', async(req, res) => {
    const id = req.body.id;
    const universityId = req.body.university_id;

    // Check the relationship id
    let validate = Utils.checkNumber(id, 'Relationship id', Forbidden.user_university);

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }

    // Check the university id
    validate = Utils.checkNumber(universityId, 'University id');

    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    const userUniversity = {
        id: id,
        universityId: universityId
    };

    // Update user university relationship
    await UserController.updateUniversity(userUniversity);

    return res.send(Responses.success({}));
});

router.post('/delete-user-university', async(req, res) => {
    const id = req.body.id;
    let validate;

    if (Array.isArray(id)) {
        // Check the array of relationship id
        validate = Utils.checkListNumber(id, 'Relationship id', Forbidden.user_university);
    } else {
        // Check the relationship id
        validate = Utils.checkNumber(id, 'Relationship id', Forbidden.user_university);
    }
    if (validate.error) {
        return res.send(Responses.error(validate.message));
    }
    // Delete user university relationship
    await UserController.deleteUniversity(id);

    return res.send(Responses.success({}));
});

module.exports = router;