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
     * Login
     *
     * @param email
     * @param callback
     */
    login(email, callback) {
        const query = 'SELECT * FROM users WHERE email = ?';

        Connection.query(query, [email], callback);
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
                genres_tmp.*,
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
                    user_car.id AS user_car_id, user_car.user_id,
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
                    user_color.id AS user_color_id, user_color.user_id,
                    colors.color_id, colors.color_name
                FROM user_color
                INNER JOIN colors
                    ON colors.color_id = user_color.color_id
                WHERE user_color.user_id = ?
            ) colors_tmp
                ON colors_tmp.user_id = users_tmp.user_id
            LEFT JOIN (
                SELECT
                    user_company.id AS user_company_id, user_company.user_id,
                    companies.company_id, companies.company_name
                FROM user_company
                INNER JOIN companies
                    ON companies.company_id = user_company.company_id
                WHERE user_company.user_id = ?
            ) companies_tmp
                ON companies_tmp.user_id = users_tmp.user_id
            LEFT JOIN (
                SELECT
                    user_country.id AS user_country_id, user_country.user_id,
                    countries.country_id, countries.country_name, countries.country_code
                FROM user_country
                INNER JOIN countries
                    ON countries.country_id = user_country.country_id
                WHERE user_country.user_id = ?
            ) countries_tmp
                ON countries_tmp.user_id = users_tmp.user_id
            LEFT JOIN (
                SELECT
                    user_genre.id AS user_genre_id, user_genre.user_id,
                    genres.genre_id, genres.genre_name
                FROM user_genre
                INNER JOIN genres
                    ON genres.genre_id = user_genre.genre_id
                WHERE user_genre.user_id = ?
            ) genres_tmp
                ON genres_tmp.user_id = users_tmp.user_id
            LEFT JOIN (
                SELECT
                    user_job_title.id AS user_job_title_id, user_job_title.user_id,
                    job_titles.job_title_id, job_titles.job_title_name
                FROM user_job_title
                INNER JOIN job_titles
                    ON job_titles.job_title_id = user_job_title.job_title_id
                WHERE user_job_title.user_id = ?
            ) job_titles_tmp
                ON job_titles_tmp.user_id = users_tmp.user_id
            LEFT JOIN (
                SELECT
                    user_movie.id AS user_movie_id, user_movie.user_id,
                    movies.movie_id, movies.movie_name
                FROM user_movie
                INNER JOIN movies
                    ON movies.movie_id = user_movie.movie_id
                WHERE user_movie.user_id = ?
            ) movies_tmp
                ON movies_tmp.user_id = users_tmp.user_id
            LEFT JOIN (
                SELECT
                    user_university.id AS user_university_id, user_university.user_id,
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
     * @returns {Promise<void>}
     */
    async updatePassword(data) {
        const query = 'UPDATE users SET password = ? WHERE user_id = ?';

        await Connection.query(query, [data.password, data.id]);
    }

    /**
     * Update role
     *
     * @param data
     * @returns {Promise<void>}
     */
    async updateRole(data) {
        const query = 'UPDATE users SET role = ? WHERE user_id = ?';

        await Connection.query(query, [data.role, data.id]);
    }

    /**
     * Update user profile
     *
     * @param data
     * @returns {Promise<void>}
     */
    async updateProfile(data) {
        const query = `
            UPDATE
                user_profile
            SET
                first_name = ?, last_name = ?, gender = ?, birthday = ?, phone_number = ?, address = ?, slogan = ?, avatar = ?
            WHERE user_id = ?`;

        await Connection.query(query, [data.firstName, data.lastName, data.gender, data.birthday, data.phone, data.address, data.slogan, data.avatar, data.id]);
    }

    /**
     * Delete user
     *
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
        let query = `
            DELETE
                users, user_profile, user_car, user_color, user_company, user_country, user_genre, user_job_title, user_movie, user_university
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
            INNER JOIN user_genre
                ON users.user_id = user_genre.user_id
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
        await Connection.query(query, [id]);
    }

    /**
     * Add new user car relationship
     *
     * @param data
     * @returns {Promise<void>}
     */
    async addCar(data) {
        const query = 'INSERT INTO user_car SET ?';

        await Connection.query(query, data);
    }

    /**
     * Update user car relationship
     *
     * @param data
     * @returns {Promise<void>}
     */
    async updateCar(data) {
        const query = 'UPDATE user_car SET car_id = ?, car_model_id = ? WHERE id = ?';

        await Connection.query(query, [data.carId, data.modelId, data.id]);
    }

    /**
     * Delete user car relationship
     *
     * @param id
     * @returns {Promise<void>}
     */
    async deleteCar(id) {
        let query = 'DELETE FROM user_car';

        if (Array.isArray(id)) {
            query += ' WHERE id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE id = ?';
        }
        await Connection.query(query, [id]);
    }

    /**
     * Add new user color relationship
     *
     * @param data
     * @returns {Promise<void>}
     */
    async addColor(data) {
        const query = 'INSERT INTO user_color SET ?';

        await Connection.query(query, data);
    }

    /**
     * Update user color relationship
     *
     * @param data
     * @returns {Promise<void>}
     */
    async updateColor(data) {
        const query = 'UPDATE user_color SET color_id = ? WHERE id = ?';

        await Connection.query(query, [data.colorId, data.id]);
    }

    /**
     * Delete user color relationship
     *
     * @param id
     * @returns {Promise<void>}
     */
    async deleteColor(id) {
        let query = 'DELETE FROM user_color';

        if (Array.isArray(id)) {
            query += ' WHERE id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE id = ?';
        }
        await Connection.query(query, [id]);
    }

    /**
     * Add new user company relationship
     *
     * @param data
     * @returns {Promise<void>}
     */
    async addCompany(data) {
        const query = 'INSERT INTO user_company SET ?';

        await Connection.query(query, data);
    }

    /**
     * Update user company relationship
     *
     * @param data
     * @returns {Promise<void>}
     */
    async updateCompany(data) {
        const query = 'UPDATE user_company SET company_id = ? WHERE id = ?';

        await Connection.query(query, [data.companyId, data.id]);
    }

    /**
     * Delete user company relationship
     *
     * @param id
     * @returns {Promise<void>}
     */
    async deleteCompany(id) {
        let query = 'DELETE FROM user_company';

        if (Array.isArray(id)) {
            query += ' WHERE id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE id = ?';
        }
        await Connection.query(query, [id]);
    }

    /**
     * Add new user country relationship
     *
     * @param data
     * @returns {Promise<void>}
     */
    async addCountry(data) {
        const query = 'INSERT INTO user_country SET ?';

        await Connection.query(query, data);
    }

    /**
     * Update user country relationship
     *
     * @param data
     * @returns {Promise<void>}
     */
    async updateCountry(data) {
        const query = 'UPDATE user_country SET country_id = ? WHERE id = ?';

        await Connection.query(query, [data.countryId, data.id]);
    }

    /**
     * Delete user country relationship
     *
     * @param id
     * @returns {Promise<void>}
     */
    async deleteCountry(id) {
        let query = 'DELETE FROM user_country';

        if (Array.isArray(id)) {
            query += ' WHERE id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE id = ?';
        }
        await Connection.query(query, [id]);
    }

    /**
     * Add new user genre relationship
     *
     * @param data
     * @returns {Promise<void>}
     */
    async addGenre(data) {
        const query = 'INSERT INTO user_genre SET ?';

        await Connection.query(query, data);
    }

    /**
     * Update user genre relationship
     *
     * @param data
     * @returns {Promise<void>}
     */
    async updateGenre(data) {
        const query = 'UPDATE user_genre SET genre_id = ? WHERE id = ?';

        await Connection.query(query, [data.genreId, data.id]);
    }

    /**
     * Delete user genre relationship
     *
     * @param id
     * @param callback
     * @returns {Promise<void>}
     */
    async deleteGenre(id, callback) {
        let query = 'DELETE FROM user_genre';

        if (Array.isArray(id)) {
            query += ' WHERE id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE id = ?';
        }
        await Connection.query(query, [id]);
    }

    /**
     * Add new user job title relationship
     *
     * @param data
     * @returns {Promise<void>}
     */
    async addJobTitle(data) {
        const query = 'INSERT INTO user_job_title SET ?';

        await Connection.query(query, data);
    }

    /**
     * Update user job title relationship
     *
     * @param data
     * @returns {Promise<void>}
     */
    async updateJobTitle(data) {
        const query = 'UPDATE user_job_title SET job_title_id = ? WHERE id = ?';

        await Connection.query(query, [data.titleId, data.id]);
    }

    /**
     * Delete user job title relationship
     *
     * @param id
     * @returns {Promise<void>}
     */
    async deleteJobTitle(id) {
        let query = 'DELETE FROM user_job_title';

        if (Array.isArray(id)) {
            query += ' WHERE id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE id = ?';
        }
        await Connection.query(query, [id]);
    }

    /**
     * Add new user movie relationship
     *
     * @param data
     * @returns {Promise<void>}
     */
    async addMovie(data) {
        const query = 'INSERT INTO user_movie SET ?';

        await Connection.query(query, data);
    }

    /**
     * Update user movie relationship
     *
     * @param data
     * @returns {Promise<void>}
     */
    async updateMovie(data) {
        const query = 'UPDATE user_movie SET movie_id = ? WHERE id = ?';

        await Connection.query(query, [data.movieId, data.id]);
    }

    /**
     * Delete user movie relationship
     *
     * @param id
     * @returns {Promise<void>}
     */
    async deleteMovie(id) {
        let query = 'DELETE FROM user_movie';

        if (Array.isArray(id)) {
            query += ' WHERE id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE id = ?';
        }
        await Connection.query(query, [id]);
    }

    /**
     * Add new user university relationship
     *
     * @param data
     * @returns {Promise<void>}
     */
    async addUniversity(data) {
        const query = 'INSERT INTO user_university SET ?';

        await Connection.query(query, data);
    }

    /**
     * Update user university relationship
     *
     * @param data
     * @returns {Promise<void>}
     */
    async updateUniversity(data) {
        const query = 'UPDATE user_university SET university_id = ? WHERE id = ?';

        await Connection.query(query, [data.universityId, data.id]);
    }

    /**
     * Delete user university relationship
     *
     * @param id
     * @returns {Promise<void>}
     */
    async deleteUniversity(id) {
        let query = 'DELETE FROM user_university';

        if (Array.isArray(id)) {
            query += ' WHERE id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE id = ?';
        }
        await Connection.query(query, [id]);
    }
}

module.exports = Users;