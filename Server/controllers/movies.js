const singleton = Symbol('singleton');

const Movie = new (require('../daos/movies'))();

class MovieController {
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
     * Find all movies
     *
     * @param callback
     */
    findAll(callback) {
        // Find all movies
        Movie.findAll(callback);
    }

    /**
     * Find by movie id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        // Find by movie id
        Movie.findById(id, callback);
    }

    /**
     * Create new movie
     *
     * @param name
     * @param callback
     */
    create(name, callback) {
        const data = {
            movie_name: name
        };

        // Create new movie
        Movie.create(data, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            // Find by movie id
            Movie.findById(result.insertId, callback);
        });
    }

    /**
     * Update movie name
     *
     * @param params
     * @returns {Promise<void>}
     */
    async update(params) {
        const data = {
            id: params.id,
            name: params.name
        };

        // Update movie name
        await Movie.update(data);
    }

    /**
     * Delete movie
     *
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
        // Delete movie
        await Movie.delete(id);
    }
}

module.exports = MovieController;