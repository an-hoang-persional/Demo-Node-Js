const Dao = require('./dao');

const Utils = require('../common/utils');

class UserController {
    /**
     * Login
     *
     * @param email
     * @param password
     * @returns {Promise<*>}
     */
    async login(email, password) {
        try {
            // Login
            const result = await Dao.login(email);

            if (result.length === 0) {
                return {};
            }
            if (result[0].role === 0) {
                return 'You don\'t have permission !';
            }
            // Check password
            const validate = Utils.checkPassword(password, result[0].password);

            if (!validate) {
                return 'Wrong password !';
            }
            return {
                id: result[0].user_id,
                username: result[0].username,
                email: result[0].email,
                role: result[0].role
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find all users
     *
     * @returns {Promise<Array>}
     */
    async findAll() {
        try {
            // Find all users
            const result = await Dao.baseFindAll();
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
            return users;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find by user id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        try {
            // Find by user id
            const result = await Dao.findById(id);

            if (result.length === 0) {
                return {};
            }
            let user = {};
            let cars = [];
            let colors = [];
            let companies = [];
            let countries = [];
            let genres = [];
            let jobTitles = [];
            let movies = [];
            let universities = [];

            for (let _data of result) {
                // User's profile
                const profile = {
                    id: _data.user_id,
                    username: _data.username,
                    email: _data.email,
                    role: _data.role,
                    firstName: _data.first_name,
                    lastName: _data.last_name,
                    gender: _data.gender,
                    birthday: _data.birthday,
                    phone: _data.phone_number,
                    address: _data.address,
                    slogan: _data.slogan,
                    avatar: _data.avatar
                };

                // Check if the property profile is already exist
                if (!user.hasOwnProperty('id')) {
                    user = profile;
                }

                // User's cars
                const car = {
                    relationshipId: _data.user_car_id,
                    car: {
                        id: _data.car_id,
                        name: _data.car_name
                    },
                    model: {
                        id: _data.car_model_id,
                        model: _data.car_model
                    }
                };
                // Check if the object car is already exist in array cars
                const checkCar = cars.find(_car => {
                    return _car.relationshipId === car.relationshipId && _car.car.id === car.car.id && _car.model.id === car.model.id;
                });

                if (!checkCar) {
                    cars.push(car);
                }

                // User's colors
                const color = {
                    relationshipId: _data.user_color_id,
                    id: _data.color_id,
                    name: _data.color_name
                };
                // Check if the object color is already exist in array colors
                const checkColor = colors.find(_color => {
                    return _color.relationshipId === color.relationshipId && _color.id === color.id;
                });

                if (!checkColor) {
                    colors.push(color);
                }

                // User's companies
                const company = {
                    relationshipId: _data.user_company_id,
                    id: _data.company_id,
                    name: _data.company_name
                };
                // Check if the object company is already exist in array companies
                const checkCompany = companies.find(_company => {
                    return _company.relationshipId === company.relationshipId && _company.id === company.id;
                });

                if (!checkCompany) {
                    companies.push(company);
                }

                // User's countries
                const country = {
                    relationshipId: _data.user_country_id,
                    id: _data.country_id,
                    name: _data.country_name,
                    code: _data.country_code
                };
                // Check if the object country is already exist in array countries
                const checkCountry = countries.find(_country => {
                    return _country.relationshipId === country.relationshipId && _country.id === country.id;
                });

                if (!checkCountry) {
                    countries.push(country);
                }

                // User's genres
                const genre = {
                    relationshipId: _data.user_genre_id,
                    id: _data.genre_id,
                    name: _data.genre_name
                };
                // Check if the object genre is already exist in array genres
                const checkGenre = genres.find(_genre => {
                    return _genre.relationshipId === genre.relationshipId && _genre.id === genre.id;
                });

                if (!checkGenre) {
                    genres.push(genre);
                }

                // User's job titles
                const jobTitle = {
                    relationshipId: _data.user_job_title_id,
                    id: _data.job_title_id,
                    name: _data.job_title_name
                };
                // Check if the object jobTitle is already exist in array jobTitles
                const checkJobTitle = jobTitles.find(_jobTitle => {
                    return _jobTitle.relationshipId === jobTitle.relationshipId && _jobTitle.id === jobTitle.id;
                });

                if (!checkJobTitle) {
                    jobTitles.push(jobTitle);
                }

                // User's movies
                const movie = {
                    relationshipId: _data.user_movie_id,
                    id: _data.movie_id,
                    name: _data.movie_name
                };
                // Check if the object movie is already exist in array movies
                const checkMovie = movies.find(_movie => {
                    return _movie.relationshipId === movie.relationshipId && _movie.id === movie.id;
                });

                if (!checkMovie) {
                    movies.push(movie);
                }

                // User's universities
                const university = {
                    relationshipId: _data.user_movie_id,
                    id: _data.movie_id,
                    name: _data.movie_name
                };
                // Check if the object university is already exist in array universities
                const checkUniversity = universities.find(_university => {
                    return _university.relationshipId === university.relationshipId && _university.id === university.id;
                });

                if (!checkUniversity) {
                    universities.push(university);
                }
            }
            user.cars = cars;
            user.colors = colors;
            user.companies = companies;
            user.countries = countries;
            user.genres = genres;
            user.jobTitles = jobTitles;
            user.movies = movies;
            user.universities = universities;

            return user;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create new user
     *
     * @param params
     * @returns {Promise<*>}
     */
    async create(params) {
        try {
            // Create new user
            const result = await Dao.create({
                username: params.username,
                email: params.email,
                password: params.password
            });

            // Create new user profile
            await Dao.createProfile({
                user_id: result.insertId,
                first_name: params.firstName,
                last_name: params.lastName,
                gender: params.gender
            });

            // Find by user id
            return await this.findById(result.insertId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Check exist by user id and if can change password
     *
     * @param id
     * @param password
     * @returns {Promise<*>}
     */
    async checkPassword(id, password) {
        try {
            // Check exist by user id
            const result = await Dao.checkById(id);

            // Check password
            const validate = Utils.checkPassword(password, result[0].password);

            if (!validate) {
                return 'Wrong password !';
            }
            return true;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update password
     *
     * @param params
     * @returns {Promise<*>}
     */
    async updatePassword(params) {
        try {
            // Update password
            return await Dao.updatePassword({
                id: params.id,
                password: params.password
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update role
     *
     * @param params
     * @returns {Promise<*>}
     */
    async updateRole(params) {
        try {
            // Update role
            return await Dao.updateRole({
                id: params.id,
                role: params.role
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update user profile
     *
     * @param params
     * @returns {Promise<*>}
     */
    async updateProfile(params) {
        try {
            // Update user profile
            return await Dao.updateProfile({
                id: params.id,
                firstName: params.firstName,
                lastName: params.lastName,
                gender: params.gender,
                birthday: params.birthday,
                phone: params.phone,
                address: params.address,
                slogan: params.slogan,
                avatar: params.avatar
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete user
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        try {
            // Delete user
            return await Dao.delete(id);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Add new user car relationship
     *
     * @param params
     * @returns {Promise<*>}
     */
    async addCar(params) {
        try {
            // Add new user car relationship
            return await Dao.addCar({
                user_id: params.userId,
                car_id: params.carId,
                car_model_id: params.modelId
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update user car relationship
     *
     * @param params
     * @returns {Promise<*>}
     */
    async updateCar(params) {
        try {
            // Update user car relationship
            return await Dao.updateCar({
                id: params.id,
                carId: params.carId,
                modelId: params.modelId
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete user car relationship
     *
     * @param id
     * @returns {Promise<*>}
     */
    async deleteCar(id) {
        try {
            // Delete user car relationship
            return await Dao.deleteCar(id);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Add new user color relationship
     *
     * @param params
     * @returns {Promise<*>}
     */
    async addColor(params) {
        try {
            // Add new user color relationship
            return await Dao.addColor({
                user_id: params.userId,
                color_id: params.colorId
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update user color relationship
     *
     * @param params
     * @returns {Promise<*>}
     */
    async updateColor(params) {
        try {
            // Update user color relationship
            return await Dao.updateColor({
                id: params.id,
                colorId: params.colorId
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete user color relationship
     *
     * @param id
     * @returns {Promise<*>}
     */
    async deleteColor(id) {
        try {
            // Delete user color relationship
            return await Dao.deleteColor(id);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Add new user company relationship
     *
     * @param params
     * @returns {Promise<*>}
     */
    async addCompany(params) {
        try {
            // Add new user company relationship
            return await Dao.addCompany({
                user_id: params.userId,
                company_id: params.companyId
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update user company relationship
     *
     * @param params
     * @returns {Promise<*>}
     */
    async updateCompany(params) {
        try {
            // Update user company relationship
            return await Dao.updateCompany({
                id: params.id,
                companyId: params.companyId
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete user company relationship
     *
     * @param id
     * @returns {Promise<*>}
     */
    async deleteCompany(id) {
        try {
            // Delete user company relationship
            return await Dao.deleteCompany(id);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Add new user country relationship
     *
     * @param params
     * @returns {Promise<*>}
     */
    async addCountry(params) {
        try {
            // Add new user country relationship
            return await Dao.addCountry({
                user_id: params.userId,
                country_id: params.countryId
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update user country relationship
     *
     * @param params
     * @returns {Promise<*>}
     */
    async updateCountry(params) {
        try {
            // Update user country relationship
            return await Dao.updateCountry({
                id: params.id,
                countryId: params.countryId
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete user country relationship
     *
     * @param id
     * @returns {Promise<*>}
     */
    async deleteCountry(id) {
        try {
            // Delete user country relationship
            return await Dao.deleteCountry(id);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Add new user genre relationship
     *
     * @param params
     * @returns {Promise<*>}
     */
    async addGenre(params) {
        try {
            // Add new user genre relationship
            return await Dao.addGenre({
                user_id: params.userId,
                genre_id: params.genreId
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update user genre relationship
     *
     * @param params
     * @returns {Promise<*>}
     */
    async updateGenre(params) {
        try {
            // Update user genre relationship
            return await Dao.updateGenre({
                id: params.id,
                genreId: params.genreId
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete user genre relationship
     *
     * @param id
     * @returns {Promise<*>}
     */
    async deleteGenre(id) {
        try {
            // Delete user genre relationship
            return await Dao.deleteGenre(id);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Add new user job title relationship
     *
     * @param params
     * @returns {Promise<*>}
     */
    async addJobTitle(params) {
        try {
            // Add new user job title relationship
            return await Dao.addJobTitle({
                user_id: params.userId,
                job_title_id: params.titleId
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update user job title relationship
     *
     * @param params
     * @returns {Promise<*>}
     */
    async updateJobTitle(params) {
        try {
            // Update user job title relationship
            return await Dao.updateJobTitle({
                id: params.id,
                titleId: params.titleId
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete user job title relationship
     *
     * @param id
     * @returns {Promise<*>}
     */
    async deleteJobTitle(id) {
        try {
            // Delete user job title relationship
            return await Dao.deleteJobTitle(id);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Add new user movie relationship
     *
     * @param params
     * @returns {Promise<*>}
     */
    async addMovie(params) {
        try {
            // Add new user movie relationship
            return await Dao.addMovie({
                user_id: params.userId,
                movie_id: params.movieId
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update user movie relationship
     *
     * @param params
     * @returns {Promise<*>}
     */
    async updateMovie(params) {
        try {
            // Update user movie relationship
            return await Dao.updateMovie({
                id: params.id,
                movieId: params.movieId
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete user movie relationship
     *
     * @param id
     * @returns {Promise<*>}
     */
    async deleteMovie(id) {
        try {
            // Delete user movie relationship
            return await Dao.deleteMovie(id);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Add new user university relationship
     *
     * @param params
     * @returns {Promise<*>}
     */
    async addUniversity(params) {
        try {
            // Add new user university relationship
            return await Dao.addUniversity({
                user_id: params.userId,
                university_id: params.universityId
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update user university relationship
     *
     * @param params
     * @returns {Promise<*>}
     */
    async updateUniversity(params) {
        try {
            // Update user university relationship
            return await Dao.updateUniversity({
                id: params.id,
                universityId: params.universityId
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete user university relationship
     *
     * @param id
     * @returns {Promise<*>}
     */
    async deleteUniversity(id) {
        try {
            // Delete user university relationship
            return await Dao.deleteUniversity(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UserController();