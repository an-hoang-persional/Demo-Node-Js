const singleton = Symbol('singleton');

const Connection = require('../database/database');

class Genres {
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
        const query = 'SELECT * FROM genres';

        Connection.query(query, [], callback);
    }

    /**
     * Find by genre id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        let query = 'SELECT * FROM genres';

        if (Array.isArray(id)) {
            query += ' WHERE genre_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE genre_id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Create new genre
     *
     * @param data
     * @param callback
     */
    create(data, callback) {
        const query = 'INSERT INTO genres SET ?';

        Connection.query(query, data, callback);
    }

    /**
     * Update genre name
     *
     * @param data
     * @returns {Promise<void>}
     */
    async update(data) {
        const query = 'UPDATE genres SET genre_name = ? WHERE genre_id = ?';

        await Connection.query(query, [data.name, data.id]);
    }

    /**
     * Delete genre
     *
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
        let query = 'DELETE FROM genres';

        if (Array.isArray(id)) {
            query += ' WHERE genre_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE genre_id = ?';
        }
        await Connection.query(query, [id]);
    }
}

module.exports = Genres;