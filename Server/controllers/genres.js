const singleton = Symbol('singleton');

const Genre = new (require('../daos/genres'))();

class GenreController {
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
     * Find all genres
     *
     * @param callback
     */
    findAll(callback) {
        // Find all genres
        Genre.findAll(callback);
    }

    /**
     * Find by genre id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        // Find by genre id
        Genre.findById(id, callback);
    }

    /**
     * Create new genre
     *
     * @param name
     * @param callback
     */
    create(name, callback) {
        const data = {
            genre_name: name
        };

        // Create new genre
        Genre.create(data, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            // Find by genre id
            Genre.findById(result.insertId, callback);
        });
    }

    /**
     * Update genre name
     *
     * @param params
     * @returns {Promise<void>}
     */
    async update(params) {
        const data = {
            id: params.id,
            name: params.name
        };

        // Update genre name
        await Genre.update(data);
    }

    /**
     * Delete genre
     *
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
        // Delete genre
        await Genre.delete(id);
    }
}

module.exports = GenreController;