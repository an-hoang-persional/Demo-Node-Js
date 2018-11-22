const singleton = Symbol('singleton');

const Connection = require('../database/database');

class Countries {
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
     * Find all countries
     *
     * @param callback
     */
    findAll(callback) {
        const query = 'SELECT * FROM countries';

        Connection.query(query, [], callback);
    }

    /**
     * Find by country id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        let query = 'SELECT * FROM countries';

        if (Array.isArray(id)) {
            query += ' WHERE country_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE country_id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Create new country
     *
     * @param data
     * @param callback
     */
    create(data, callback) {
        const query = 'INSERT INTO countries SET ?';

        Connection.query(query, data, callback);
    }

    /**
     * Update country
     *
     * @param data
     * @param callback
     */
    update(data, callback) {
        const query = 'UPDATE countries SET country_name = ?, country_code = ? WHERE country_id = ?';

        Connection.query(query, [data.name, data.code, data.id], callback);
    }

    /**
     * Delete country
     *
     * @param id
     * @param callback
     */
    delete(id, callback) {
        let query = 'DELETE FROM countries';

        if (Array.isArray(id)) {
            query += ' WHERE country_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE country_id = ?';
        }
        Connection.query(query, [id], callback);
    }
}

module.exports = Countries;