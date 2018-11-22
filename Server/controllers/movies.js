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
                callback(error, null);
            }
            // Find by movie id
            Movie.findById(result.insertId, callback);
        });
    }

    /**
     * Update movie name
     *
     * @param params
     * @param callback
     */
    update(params, callback) {
        const data = {
            id: params.id,
            name: params.name
        };

        // Find by movie id
        Movie.findById(params.id, (error, result) => {
            if (error) {
                callback(error, null);
            }
            if (result.length === 0) {
                callback(null, []);
            } else {
                // Update movie name
                Movie.update(data, callback);
            }
        });
    }

    /**
     * Delete movie
     *
     * @param id
     * @param callback
     */
    delete(id, callback) {
        // Find by movie id
        Movie.findById(id, (error, result) => {
            if (error) {
                callback(error, null);
            }
            if (result.length === 0) {
                callback(null, []);
            } else {
                // Delete movie
                Movie.delete(id, callback);
            }
        });
    }
}

module.exports = MovieController;