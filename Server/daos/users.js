const singleton = Symbol('singleton');

const Connection = require('../database/database');

class Users {
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new this;
        }
        return this[singleton];
    }

    /**
     * Constructor
     */
    constructor() {
        let Class = new.target;

        if (!Class[singleton]) {
            Class[singleton] = this;
        }
        return Class[singleton];
    }

    /**
     * Sign in
     *
     * @param account
     * @param callback
     */
    signIn(account, callback) {
        const query = 'SELECT * FROM users WHERE username = ? OR email = ?';

        Connection.query(query, [account, account], callback);
    }

    /**
     * Sign up
     *
     * @param data
     * @param callback
     */
    signUp(data, callback) {
        const query = 'INSERT INTO users SET ?';

        Connection.query(query, data, callback);
    }

    /**
     * Find all users
     *
     * @param callback
     */
    findAll(callback) {
        const query = `
            SELECT
                users.user_id, users.username, users.email, users.role,
                user_profile.first_name, user_profile.last_name, user_profile.gender, user_profile.birthday, user_profile.phone_number, user_profile.address, user_profile.slogan, user_profile.avatar
            FROM users
            LEFT JOIN user_profile
                ON users.user_id = user_profile.user_id`;

        Connection.query(query, [], callback);
    }

    /**
     * Find by user id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        const query = `
            SELECT
                users_tmp.*,
                cars_tmp.*,
                colors_tmp.*,
                companies_tmp.*,
                countries_tmp.*,
                geners_tmp.*,
                job_titles_tmp.*,
                movies_tmp.*,
                universities_tmp.*
            FROM (
                SELECT
                    users.user_id, users.username, users.email, users.role,
                    user_profile.first_name, user_profile.last_name, user_profile.gender, user_profile.birthday, user_profile.phone_number, user_profile.address, user_profile.slogan, user_profile.avatar
                FROM users
                LEFT JOIN user_profile
                    ON user_profile.user_id = users.user_id
                WHERE users.user_id = ?
            ) users_tmp
            LEFT JOIN (
                SELECT
                    user_car.id, user_car.user_id,
                    cars.car_id, cars.car_name,
                    cars_model.car_model_id, cars_model.car_model
                FROM user_car
                INNER JOIN cars
                    ON cars.car_id = user_car.car_id
                INNER JOIN cars_model
                    ON cars_model.car_model_id = user_car.car_model_id
                WHERE user_car.user_id = ?
            ) cars_tmp
                ON cars_tmp.user_id = users_tmp.user_id
            LEFT JOIN (
                SELECT
                    user_color.id, user_color.user_id,
                    colors.color_id, colors.color_name
                FROM user_color
                INNER JOIN colors
                    ON colors.color_id = user_color.color_id
                WHERE user_color.user_id = ?
            ) colors_tmp
                ON colors_tmp.user_id = users_tmp.user_id
            LEFT JOIN (
                SELECT
                    user_company.id, user_company.user_id,
                    companies.company_id, companies.company_name
                FROM user_company
                INNER JOIN companies
                    ON companies.company_id = user_company.company_id
                WHERE user_company.user_id = ?
            ) companies_tmp
                ON companies_tmp.user_id = users_tmp.user_id
            LEFT JOIN (
                SELECT
                    user_country.id, user_country.user_id,
                    countries.country_id, countries.country_name, countries.country_code
                FROM user_country
                INNER JOIN countries
                    ON countries.country_id = user_country.country_id
                WHERE user_country.user_id = ?
            ) countries_tmp
                ON countries_tmp.user_id = users_tmp.user_id
            LEFT JOIN (
                SELECT
                    user_gener.id, user_gener.user_id,
                    geners.gener_id, geners.gener_name
                FROM user_gener
                INNER JOIN geners
                    ON geners.gener_id = user_gener.gener_id
                WHERE user_gener.user_id = ?
            ) geners_tmp
                ON geners_tmp.user_id = users_tmp.user_id
            LEFT JOIN (
                SELECT
                    user_job_title.id, user_job_title.user_id,
                    job_titles.job_title_id, job_titles.job_title_name
                FROM user_job_title
                INNER JOIN job_titles
                    ON job_titles.job_title_id = user_job_title.job_title_id
                WHERE user_job_title.user_id = ?
            ) job_titles_tmp
                ON job_titles_tmp.user_id = users_tmp.user_id
            LEFT JOIN (
                SELECT
                    user_movie.id, user_movie.user_id,
                    movies.movie_id, movies.movie_name
                FROM user_movie
                INNER JOIN movies
                    ON movies.movie_id = user_movie.movie_id
                WHERE user_movie.user_id = ?
            ) movies_tmp
                ON movies_tmp.user_id = users_tmp.user_id
            LEFT JOIN (
                SELECT
                    user_university.id, user_university.user_id,
                    universities.university_id, universities.university_name
                FROM user_university
                INNER JOIN universities
                    ON universities.university_id = user_university.university_id
                WHERE user_university.user_id = ?
            ) universities_tmp
                ON universities_tmp.user_id = users_tmp.user_id
        `;

        Connection.query(query, [id, id, id, id, id, id, id, id, id], callback);
    }

    /**
     * Check exist by user id
     *
     * @param id
     * @param callback
     */
    checkById(id, callback) {
        let query = 'SELECT * FROM users';

        if (Array.isArray(id)) {
            query += ' WHERE user_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE user_id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Create new user
     *
     * @param data
     * @param callback
     */
    create(data, callback) {
        const query = 'INSERT INTO users SET ?';

        Connection.query(query, data, callback);
    }

    /**
     * Create new user profile
     *
     * @param data
     * @param callback
     */
    createProfile(data, callback) {
        const query = 'INSERT INTO user_profile SET ?';

        Connection.query(query, data, callback);
    }

    /**
     * Update password
     *
     * @param data
     * @param callback
     */
    updatePassword(data, callback) {
        const query = 'UPDATE users SET password = ? WHERE user_id = ?';

        Connection.query(query, [data.password, data.id], callback);
    }

    /**
     * Update role
     *
     * @param data
     * @param callback
     */
    updateRole(data, callback) {
        const query = 'UPDATE users SET role = ? WHERE user_id = ?';

        Connection.query(query, [data.role, data.id], callback);
    }

    /**
     * Update user profile
     *
     * @param data
     * @param callback
     */
    updateProfile(data, callback) {
        const query = `
            UPDATE
                user_profile
            SET
                first_name = ?, last_name = ?, gender = ?, birthday = ?, phone_number = ?, address = ?, slogan = ?, avatar = ?
            WHERE user_id = ?`;

        Connection.query(query, [data.fname, data.lname, data.gender, data.birthday, data.phone, data.address, data.slogan, data.avatar, data.id], callback);
    }

    /**
     * Delete user
     *
     * @param id
     * @param callback
     */
    delete(id, callback) {
        let query = `
            DELETE
                users, user_profile, user_car, user_color, user_company, user_country, user_gener, user_job_title, user_movie, user_university
            FROM users
            INNER JOIN user_profile
                ON users.user_id = user_profile.user_id
            INNER JOIN user_car
                ON users.user_id = user_car.user_id
            INNER JOIN user_color
                ON users.user_id = user_color.user_id
            INNER JOIN user_company
                ON users.user_id = user_company.user_id
            INNER JOIN user_country
                ON users.user_id = user_country.user_id
            INNER JOIN user_gener
                ON users.user_id = user_gener.user_id
            INNER JOIN user_job_title
                ON users.user_id = user_job_title.user_id
            INNER JOIN user_movie
                ON users.user_id = user_movie.user_id
            INNER JOIN user_university
                ON users.user_id = user_university.user_id`;

        if (Array.isArray(id)) {
            query += ' WHERE users.user_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE users.user_id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Add new user car relationship
     *
     * @param data
     * @param callback
     */
    addCar(data, callback) {
        const query = 'INSERT INTO user_car (user_id, car_id, car_model_id) VALUES ?';

        Connection.query(query, [data], callback);
    }

    /**
     * Update user car relationship
     *
     * @param data
     * @param callback
     */
    updateCar(data, callback) {
        const query = 'UPDATE user_car SET car_id = ?, car_model_id = ? WHERE id = ?';

        Connection.query(query, [data.carId, data.modelId, data.id], callback);
    }

    /**
     * Delete user car relationship
     *
     * @param id
     * @param callback
     */
    deleteCar(id, callback) {
        let query = 'DELETE FROM user_car';

        if (Array.isArray(id)) {
            query += ' WHERE id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Add new user color relationship
     *
     * @param data
     * @param callback
     */
    addColor(data, callback) {
        const query = 'INSERT INTO user_color (user_id, color_id) VALUES ?';

        Connection.query(query, [data], callback);
    }

    /**
     * Update user color relationship
     *
     * @param data
     * @param callback
     */
    updateColor(data, callback) {
        const query = 'UPDATE user_color SET color_id = ? WHERE id = ?';

        Connection.query(query, [data.colorId, data.id], callback);
    }

    /**
     * Delete user color relationship
     *
     * @param id
     * @param callback
     */
    deleteColor(id, callback) {
        let query = 'DELETE FROM user_color';

        if (Array.isArray(id)) {
            query += ' WHERE id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Add new user company relationship
     *
     * @param data
     * @param callback
     */
    addCompany(data, callback) {
        const query = 'INSERT INTO user_company (user_id, company_id) VALUES ?';

        Connection.query(query, [data], callback);
    }

    /**
     * Update user company relationship
     *
     * @param data
     * @param callback
     */
    updateCompany(data, callback) {
        const query = 'UPDATE user_company SET company_id = ? WHERE id = ?';

        Connection.query(query, [data.companyId, data.id], callback);
    }

    /**
     * Delete user company relationship
     *
     * @param id
     * @param callback
     */
    deleteCompany(id, callback) {
        let query = 'DELETE FROM user_company';

        if (Array.isArray(id)) {
            query += ' WHERE id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Add new user country relationship
     *
     * @param data
     * @param callback
     */
    addCountry(data, callback) {
        const query = 'INSERT INTO user_country (user_id, country_id) VALUES ?';

        Connection.query(query, [data], callback);
    }

    /**
     * Update user country relationship
     *
     * @param data
     * @param callback
     */
    updateCountry(data, callback) {
        const query = 'UPDATE user_country SET country_id = ? WHERE id = ?';

        Connection.query(query, [data.countryId, data.id], callback);
    }

    /**
     * Delete user country relationship
     *
     * @param id
     * @param callback
     */
    deleteCountry(id, callback) {
        let query = 'DELETE FROM user_country';

        if (Array.isArray(id)) {
            query += ' WHERE id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Add new user gener relationship
     *
     * @param data
     * @param callback
     */
    addGener(data, callback) {
        const query = 'INSERT INTO user_gener (user_id, gener_id) VALUES ?';

        Connection.query(query, [data], callback);
    }

    /**
     * Update user gener relationship
     *
     * @param data
     * @param callback
     */
    updateGener(data, callback) {
        const query = 'UPDATE user_gener SET gener_id = ? WHERE id = ?';

        Connection.query(query, [data.generId, data.id], callback);
    }

    /**
     * Delete user gener relationship
     *
     * @param id
     * @param callback
     */
    deleteGener(id, callback) {
        let query = 'DELETE FROM user_gener';

        if (Array.isArray(id)) {
            query += ' WHERE id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Add new user job title relationship
     *
     * @param data
     * @param callback
     */
    addJobTitle(data, callback) {
        const query = 'INSERT INTO user_job_title (user_id, job_title_id) VALUES ?';

        Connection.query(query, [data], callback);
    }

    /**
     * Update user job title relationship
     *
     * @param data
     * @param callback
     */
    updateJobTitle(data, callback) {
        const query = 'UPDATE user_job_title SET job_title_id = ? WHERE id = ?';

        Connection.query(query, [data.titleId, data.id], callback);
    }

    /**
     * Delete user job title relationship
     *
     * @param id
     * @param callback
     */
    deleteJobTitle(id, callback) {
        let query = 'DELETE FROM user_job_title';

        if (Array.isArray(id)) {
            query += ' WHERE id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Add new user movie relationship
     *
     * @param data
     * @param callback
     */
    addMovie(data, callback) {
        const query = 'INSERT INTO user_movie (user_id, movie_id) VALUES ?';

        Connection.query(query, [data], callback);
    }

    /**
     * Update user movie relationship
     *
     * @param data
     * @param callback
     */
    updateMovie(data, callback) {
        const query = 'UPDATE user_movie SET movie_id = ? WHERE id = ?';

        Connection.query(query, [data.movieId, data.id], callback);
    }

    /**
     * Delete user movie relationship
     *
     * @param id
     * @param callback
     */
    deleteMovie(id, callback) {
        let query = 'DELETE FROM user_movie';

        if (Array.isArray(id)) {
            query += ' WHERE id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Add new user university relationship
     *
     * @param data
     * @param callback
     */
    addUniversity(data, callback) {
        const query = 'INSERT INTO user_university (user_id, university_id) VALUES ?';

        Connection.query(query, [data], callback);
    }

    /**
     * Update user university relationship
     *
     * @param data
     * @param callback
     */
    updateUniversity(data, callback) {
        const query = 'UPDATE user_university SET university_id = ? WHERE id = ?';

        Connection.query(query, [data.universityId, data.id], callback);
    }

    /**
     * Delete user university relationship
     *
     * @param id
     * @param callback
     */
    deleteUniversity(id, callback) {
        let query = 'DELETE FROM user_university';

        if (Array.isArray(id)) {
            query += ' WHERE id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE id = ?';
        }
        Connection.query(query, [id], callback);
    }
}

module.exports = Users;