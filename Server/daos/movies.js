const singleton = Symbol('singleton');

const Connection = require('../database/database');

class Movies {
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
        const query = 'SELECT * FROM movies';

        Connection.query(query, [], callback);
    }

    /**
     * Find by movie id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        let query = 'SELECT * FROM movies';

        if (Array.isArray(id)) {
            query += ' WHERE movie_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE movie_id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Create new movie
     *
     * @param data
     * @param callback
     */
    create(data, callback) {
        const query = 'INSERT INTO movies SET ?';

        Connection.query(query, data, callback);
    }

    /**
     * Update movie name
     *
     * @param data
     * @returns {Promise<void>}
     */
    async update(data) {
        const query = 'UPDATE movies SET movie_name = ? WHERE movie_id = ?';

        await Connection.query(query, [data.name, data.id]);
    }

    /**
     * Delete movie
     *
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
        let query = 'DELETE FROM movies';

        if (Array.isArray(id)) {
            query += ' WHERE movie_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE movie_id = ?';
        }
        await Connection.query(query, [id]);
    }
}

module.exports = Movies;