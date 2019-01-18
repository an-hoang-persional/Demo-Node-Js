const singleton = Symbol('singleton');

const Connection = require('../database/database');

class Geners {
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
     * Find all geners
     *
     * @param callback
     */
    findAll(callback) {
        const query = 'SELECT * FROM geners';

        Connection.query(query, [], callback);
    }

    /**
     * Find by gener id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        let query = 'SELECT * FROM geners';

        if (Array.isArray(id)) {
            query += ' WHERE gener_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE gener_id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Create new gener
     *
     * @param data
     * @param callback
     */
    create(data, callback) {
        const query = 'INSERT INTO geners SET ?';

        Connection.query(query, data, callback);
    }

    /**
     * Update gener name
     *
     * @param data
     * @returns {Promise<void>}
     */
    async update(data) {
        const query = 'UPDATE geners SET gener_name = ? WHERE gener_id = ?';

        await Connection.query(query, [data.name, data.id]);
    }

    /**
     * Delete gener
     *
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
        let query = 'DELETE FROM geners';

        if (Array.isArray(id)) {
            query += ' WHERE gener_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE gener_id = ?';
        }
        await Connection.query(query, [id]);
    }
}

module.exports = Geners;