const BaseDao = require('../base/dao');

class UserDao extends BaseDao {
    /**
     * Constructor
     */
    constructor() {
        super('users');
        this.user_profile = 'user_profile';
        this.user_car = 'user_car';
        this.user_color = 'user_color';
        this.user_company = 'user_company';
        this.user_country = 'user_country';
        this.user_genre = 'user_genre';
        this.user_job_title = 'user_job_title';
        this.user_movie = 'user_movie';
        this.user_university = 'user_university';
    }

    /**
     * Login
     *
     * @param email
     * @returns {Promise<*>}
     */
    async login(email) {
        return await super.baseFindById({ email });
    }

    /**
     * Find all users
     *
     * @returns {Promise<*>}
     */
    async findAll() {
        const query = `
            SELECT
                users.user_id, users.username, users.email, users.role,
                user_profile.first_name, user_profile.last_name, user_profile.gender, user_profile.birthday, user_profile.phone_number, user_profile.address, user_profile.slogan, user_profile.avatar
            FROM users
            LEFT JOIN user_profile
                ON users.user_id = user_profile.user_id`;

        return await super.query(query);
    }

    /**
     * Find by user id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
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

        return await super.query(query, [id, id, id, id, id, id, id, id, id]);
    }

    /**
     * Check exist by user id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async checkById(id) {
        return await super.baseFindById({
            user_id: id
        });
    }

    /**
     * Create new user
     *
     * @param data
     * @returns {Promise<*>}
     */
    async create(data) {
        return await super.baseCreate(data);
    }

    /**
     * Create new user profile
     *
     * @param data
     * @returns {Promise<*>}
     */
    async createProfile(data) {
        return await super.baseCreate(data, this.user_profile);
    }

    /**
     * Update password
     *
     * @param data
     * @returns {Promise<*>}
     */
    async updatePassword(data) {
        return await super.baseUpdate({
            update: {
                password: data.password
            },
            where: {
                user_id: data.id
            }
        });
    }

    /**
     * Update role
     *
     * @param data
     * @returns {Promise<*>}
     */
    async updateRole(data) {
        return await super.baseUpdate({
            update: {
                role: data.role
            },
            where: {
                user_id: data.id
            }
        });
    }

    /**
     * Update user profile
     *
     * @param data
     * @returns {Promise<*>}
     */
    async updateProfile(data) {
        return await super.baseUpdate({
            update: {
                first_name: data.firstName,
                last_name: data.lastName,
                gender: data.gender,
                birthday: data.birthday,
                phone_number: data.phone,
                address: data.address,
                slogan: data.slogan,
                avatar: data.avatar
            },
            where: {
                user_id: data.id
            }
        }, this.user_profile);
    }

    /**
     * Delete user
     *
     * @param id
     * @returns {Promise<*>}
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
        return await super.query(query, [id]);
    }

    /**
     * Add new user car relationship
     *
     * @param data
     * @returns {Promise<*>}
     */
    async addCar(data) {
        return await super.baseCreate(data, this.user_car);
    }

    /**
     * Update user car relationship
     *
     * @param data
     * @returns {Promise<*>}
     */
    async updateCar(data) {
        return await super.baseUpdate({
            update: {
                car_id: data.carId,
                car_model_id: data.modelId
            },
            where: {
                id: data.id
            }
        }, this.user_car);
    }

    /**
     * Delete user car relationship
     *
     * @param id
     * @returns {Promise<*>}
     */
    async deleteCar(id) {
        return await super.baseDelete({ id }, this.user_car);
    }

    /**
     * Add new user color relationship
     *
     * @param data
     * @returns {Promise<*>}
     */
    async addColor(data) {
        return await super.baseCreate(data, this.user_color);
    }

    /**
     * Update user color relationship
     *
     * @param data
     * @returns {Promise<*>}
     */
    async updateColor(data) {
        return await super.baseUpdate({
            update: {
                color_id: data.colorId
            },
            where: {
                id: data.id
            }
        }, this.user_color);
    }

    /**
     * Delete user color relationship
     *
     * @param id
     * @returns {Promise<*>}
     */
    async deleteColor(id) {
        return await super.baseDelete({ id }, this.user_color);
    }

    /**
     * Add new user company relationship
     *
     * @param data
     * @returns {Promise<*>}
     */
    async addCompany(data) {
        return await super.baseCreate(data, this.user_company);
    }

    /**
     * Update user company relationship
     *
     * @param data
     * @returns {Promise<*>}
     */
    async updateCompany(data) {
        return await super.baseUpdate({
            update: {
                company_id: data.companyId
            },
            where: {
                id: data.id
            }
        }, this.user_company);
    }

    /**
     * Delete user company relationship
     *
     * @param id
     * @returns {Promise<*>}
     */
    async deleteCompany(id) {
        return await super.baseDelete({ id }, this.user_company);
    }

    /**
     * Add new user country relationship
     *
     * @param data
     * @returns {Promise<*>}
     */
    async addCountry(data) {
        return await super.baseCreate(data, this.user_country);
    }

    /**
     * Update user country relationship
     *
     * @param data
     * @returns {Promise<*>}
     */
    async updateCountry(data) {
        return await super.baseUpdate({
            update: {
                country_id: data.countryId
            },
            where: {
                id: data.id
            }
        }, this.user_country);
    }

    /**
     * Delete user country relationship
     *
     * @param id
     * @returns {Promise<*>}
     */
    async deleteCountry(id) {
        return await super.baseDelete({ id }, this.user_country);
    }

    /**
     * Add new user genre relationship
     *
     * @param data
     * @returns {Promise<*>}
     */
    async addGenre(data) {
        return await super.baseCreate(data, this.user_genre);
    }

    /**
     * Update user genre relationship
     *
     * @param data
     * @returns {Promise<*>}
     */
    async updateGenre(data) {
        return await super.baseUpdate({
            update: {
                genre_id: data.genreId
            },
            where: {
                id: data.id
            }
        }, this.user_genre);
    }

    /**
     * Delete user genre relationship
     *
     * @param id
     * @returns {Promise<*>}
     */
    async deleteGenre(id) {
        return await super.baseDelete({ id }, this.user_genre);
    }

    /**
     * Add new user job title relationship
     *
     * @param data
     * @returns {Promise<*>}
     */
    async addJobTitle(data) {
        return await super.baseCreate(data, this.user_job_title);
    }

    /**
     * Update user job title relationship
     *
     * @param data
     * @returns {Promise<*>}
     */
    async updateJobTitle(data) {
        return await super.baseUpdate({
            update: {
                job_title_id: data.titleId
            },
            where: {
                id: data.id
            }
        }, this.user_job_title);
    }

    /**
     * Delete user job title relationship
     *
     * @param id
     * @returns {Promise<*>}
     */
    async deleteJobTitle(id) {
        return await super.baseDelete({ id }, this.user_job_title);
    }

    /**
     * Add new user movie relationship
     *
     * @param data
     * @returns {Promise<*>}
     */
    async addMovie(data) {
        return await super.baseCreate(data, this.user_movie);
    }

    /**
     * Update user movie relationship
     *
     * @param data
     * @returns {Promise<*>}
     */
    async updateMovie(data) {
        return await super.baseUpdate({
            update: {
                movie_id: data.movieId
            },
            where: {
                id: data.id
            }
        }, this.user_movie);
    }

    /**
     * Delete user movie relationship
     *
     * @param id
     * @returns {Promise<*>}
     */
    async deleteMovie(id) {
        return await super.baseDelete({ id }, this.user_movie);
    }

    /**
     * Add new user university relationship
     *
     * @param data
     * @returns {Promise<*>}
     */
    async addUniversity(data) {
        return await super.baseCreate(data, this.user_university);
    }

    /**
     * Update user university relationship
     *
     * @param data
     * @returns {Promise<*>}
     */
    async updateUniversity(data) {
        return await super.baseUpdate({
            update: {
                university_id: data.universityId
            },
            where: {
                id: data.id
            }
        }, this.user_university);
    }

    /**
     * Delete user university relationship
     *
     * @param id
     * @returns {Promise<*>}
     */
    async deleteUniversity(id) {
        return await super.baseDelete({ id }, this.user_university);
    }
}

module.exports = new UserDao();