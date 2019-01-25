const singleton = Symbol('singleton');

const User = new (require('../daos/users'))();

class UserController {
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
        // Login
        User.login(email, callback);
    }

    /**
     * Find all users
     *
     * @param callback
     */
    findAll(callback) {
        // Find all users
        User.findAll(callback);
    }

    /**
     * Find by user id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        // Find by user id
        User.findById(id, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            if (result.length === 0) {
                return callback(null, []);
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
                const checkCar = cars.filter(_car => {
                    return _car.relationshipId === car.relationshipId && _car.car.id === car.car.id && _car.model.id === car.model.id;
                });

                if (checkCar.length === 0) {
                    cars.push(car);
                }

                // User's colors
                const color = {
                    relationshipId: _data.user_color_id,
                    id: _data.color_id,
                    name: _data.color_name
                };
                // Check if the object color is already exist in array colors
                const checkColor = colors.filter(_color => {
                    return _color.relationshipId === color.relationshipId && _color.id === color.id;
                });

                if (checkColor.length === 0) {
                    colors.push(color);
                }

                // User's companies
                const company = {
                    relationshipId: _data.user_company_id,
                    id: _data.company_id,
                    name: _data.company_name
                };
                // Check if the object company is already exist in array companies
                const checkCompany = companies.filter(_company => {
                    return _company.relationshipId === company.relationshipId && _company.id === company.id;
                });

                if (checkCompany.length === 0) {
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
                const checkCountry = countries.filter(_country => {
                    return _country.relationshipId === country.relationshipId && _country.id === country.id;
                });

                if (checkCountry.length === 0) {
                    countries.push(country);
                }

                // User's genres
                const genre = {
                    relationshipId: _data.user_genre_id,
                    id: _data.genre_id,
                    name: _data.genre_name
                };
                // Check if the object genre is already exist in array genres
                const checkGenre = genres.filter(_genre => {
                    return _genre.relationshipId === genre.relationshipId && _genre.id === genre.id;
                });

                if (checkGenre.length === 0) {
                    genres.push(genre);
                }

                // User's job titles
                const jobTitle = {
                    relationshipId: _data.user_job_title_id,
                    id: _data.job_title_id,
                    name: _data.job_title_name
                };
                // Check if the object jobTitle is already exist in array jobTitles
                const checkJobTitle = jobTitles.filter(_jobTitle => {
                    return _jobTitle.relationshipId === jobTitle.relationshipId && _jobTitle.id === jobTitle.id;
                });

                if (checkJobTitle.length === 0) {
                    jobTitles.push(jobTitle);
                }

                // User's movies
                const movie = {
                    relationshipId: _data.user_movie_id,
                    id: _data.movie_id,
                    name: _data.movie_name
                };
                // Check if the object movie is already exist in array movies
                const checkMovie = movies.filter(_movie => {
                    return _movie.relationshipId === movie.relationshipId && _movie.id === movie.id;
                });

                if (checkMovie.length === 0) {
                    movies.push(movie);
                }

                // User's universities
                const university = {
                    relationshipId: _data.user_movie_id,
                    id: _data.movie_id,
                    name: _data.movie_name
                };
                // Check if the object university is already exist in array universities
                const checkUniversity = universities.filter(_university => {
                    return _university.relationshipId === university.relationshipId && _university.id === university.id;
                });

                if (checkUniversity.length === 0) {
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

            return callback(null, user);
        });
    }

    /**
     * Check exist by user id
     *
     * @param id
     * @param callback
     */
    checkById(id, callback) {
        // Check exist by user id
        User.checkById(id, callback);
    }

    /**
     * Create new user
     *
     * @param params
     * @param callback
     */
    create(params, callback) {
        const data = {
            username: params.username,
            email: params.email,
            password: params.password
        };

        // Create new user
        User.create(data, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            const userId = result.insertId;
            const data = {
                user_id: userId,
                first_name: params.firstName,
                last_name: params.lastName,
                gender: params.gender
            };

            // Create new user profile
            User.createProfile(data, error => {
                if (error) {
                    return callback(error, null);
                }
                // Find by user id
                this.findById(userId, callback);
            });
        });
    }

    /**
     * Update password
     *
     * @param params
     * @returns {Promise<void>}
     */
    async updatePassword(params) {
        const data = {
            id: params.id,
            password: params.password
        };

        // Update password
        await User.updatePassword(data);
    }

    /**
     * Update role
     *
     * @param params
     * @returns {Promise<void>}
     */
    async updateRole(params) {
        const data = {
            id: params.id,
            role: params.role
        };

        // Update role
        await User.updateRole(data);
    }

    /**
     * Update user profile
     *
     * @param params
     * @returns {Promise<void>}
     */
    async updateProfile(params) {
        const data = {
            id: params.id,
            firstName: params.firstName,
            lastName: params.lastName,
            gender: params.gender,
            birthday: params.birthday,
            phone: params.phone,
            address: params.address,
            slogan: params.slogan,
            avatar: params.avatar
        };

        // Update user profile
        await User.updateProfile(data);
    }

    /**
     * Delete user
     *
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
        // Delete user
        await User.delete(id);
    }

    /**
     * Add new user car relationship
     *
     * @param params
     * @returns {Promise<void>}
     */
    async addCar(params) {
        const data = {
            user_id: params.userId,
            car_id: params.carId,
            car_model_id: params.modelId
        };

        // Add new user car relationship
        await User.addCar(data);
    }

    /**
     * Update user car relationship
     *
     * @param params
     * @returns {Promise<void>}
     */
    async updateCar(params) {
        const data = {
            id: params.id,
            carId: params.carId,
            modelId: params.modelId
        };

        // Update user car relationship
        await User.updateCar(data);
    }

    /**
     * Delete user car relationship
     *
     * @param id
     * @returns {Promise<void>}
     */
    async deleteCar(id) {
        // Delete user car relationship
        await User.deleteCar(id);
    }

    /**
     * Add new user color relationship
     *
     * @param params
     * @returns {Promise<void>}
     */
    async addColor(params) {
        const data = {
            user_id: params.userId,
            color_id: params.colorId
        };

        // Add new user color relationship
        await User.addColor(data);
    }

    /**
     * Update user color relationship
     *
     * @param params
     * @returns {Promise<void>}
     */
    async updateColor(params) {
        const data = {
            id: params.id,
            colorId: params.colorId
        };

        // Update user color relationship
        await User.updateColor(data);
    }

    /**
     * Delete user color relationship
     *
     * @param id
     * @returns {Promise<void>}
     */
    async deleteColor(id) {
        // Delete user color relationship
        await User.deleteColor(id);
    }

    /**
     * Add new user company relationship
     *
     * @param params
     * @returns {Promise<void>}
     */
    async addCompany(params) {
        const data = {
            user_id: params.userId,
            company_id: params.companyId
        };

        // Add new user company relationship
        await User.addCompany(data);
    }

    /**
     * Update user company relationship
     *
     * @param params
     * @returns {Promise<void>}
     */
    async updateCompany(params) {
        const data = {
            id: params.id,
            companyId: params.companyId
        };

        // Update user company relationship
        await User.updateCompany(data);
    }

    /**
     * Delete user company relationship
     *
     * @param id
     * @returns {Promise<void>}
     */
    async deleteCompany(id) {
        // Delete user company relationship
        await User.deleteCompany(id);
    }

    /**
     * Add new user country relationship
     *
     * @param params
     * @returns {Promise<void>}
     */
    async addCountry(params) {
        const data = {
            user_id: params.userId,
            country_id: params.countryId
        };

        // Add new user country relationship
        await User.addCountry(data);
    }

    /**
     * Update user country relationship
     *
     * @param params
     * @returns {Promise<void>}
     */
    async updateCountry(params) {
        const data = {
            id: params.id,
            countryId: params.countryId
        };

        // Update user country relationship
        await User.updateCountry(data);
    }

    /**
     * Delete user country relationship
     *
     * @param id
     * @returns {Promise<void>}
     */
    async deleteCountry(id) {
        // Delete user country relationship
        await User.deleteCountry(id);
    }

    /**
     * Add new user genre relationship
     *
     * @param params
     * @returns {Promise<void>}
     */
    async addGenre(params) {
        const data = {
            user_id: params.userId,
            genre_id: params.genreId
        };

        // Add new user genre relationship
        await User.addGenre(data);
    }

    /**
     * Update user genre relationship
     *
     * @param params
     * @returns {Promise<void>}
     */
    async updateGenre(params) {
        const data = {
            id: params.id,
            genreId: params.genreId
        };

        // Update user genre relationship
        await User.updateGenre(data);
    }

    /**
     * Delete user genre relationship
     *
     * @param id
     * @returns {Promise<void>}
     */
    async deleteGenre(id) {
        // Delete user genre relationship
        await User.deleteGenre(id);
    }

    /**
     * Add new user job title relationship
     *
     * @param params
     * @returns {Promise<void>}
     */
    async addJobTitle(params) {
        const data = {
            user_id: params.userId,
            job_title_id: params.titleId
        };

        // Add new user job title relationship
        await User.addJobTitle(data);
    }

    /**
     * Update user job title relationship
     *
     * @param params
     * @returns {Promise<void>}
     */
    async updateJobTitle(params) {
        const data = {
            id: params.id,
            titleId: params.titleId
        };

        // Update user job title relationship
        await User.updateJobTitle(data);
    }

    /**
     * Delete user job title relationship
     *
     * @param id
     * @returns {Promise<void>}
     */
    async deleteJobTitle(id) {
        // Delete user job title relationship
        await User.deleteJobTitle(id);
    }

    /**
     * Add new user movie relationship
     *
     * @param params
     * @returns {Promise<void>}
     */
    async addMovie(params) {
        const data = {
            user_id: params.userId,
            movie_id: params.movieId
        };

        // Add new user movie relationship
        await User.addMovie(data);
    }

    /**
     * Update user movie relationship
     *
     * @param params
     * @returns {Promise<void>}
     */
    async updateMovie(params) {
        const data = {
            id: params.id,
            movieId: params.movieId
        };

        // Update user movie relationship
        await User.updateMovie(data);
    }

    /**
     * Delete user movie relationship
     *
     * @param id
     * @returns {Promise<void>}
     */
    async deleteMovie(id) {
        // Delete user movie relationship
        await User.deleteMovie(id);
    }

    /**
     * Add new user university relationship
     *
     * @param params
     * @returns {Promise<void>}
     */
    async addUniversity(params) {
        const data = {
            user_id: params.userId,
            university_id: params.universityId
        };

        // Add new user university relationship
        await User.addUniversity(data);
    }

    /**
     * Update user university relationship
     *
     * @param params
     * @returns {Promise<void>}
     */
    async updateUniversity(params) {
        const data = {
            id: params.id,
            universityId: params.universityId
        };

        // Update user university relationship
        await User.updateUniversity(data);
    }

    /**
     * Delete user university relationship
     *
     * @param id
     * @returns {Promise<void>}
     */
    async deleteUniversity(id) {
        // Delete user university relationship
        await User.deleteUniversity(id);
    }
}

module.exports = UserController;