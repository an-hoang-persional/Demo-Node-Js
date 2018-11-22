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
     * @param callback
     */
    update(data, callback) {
        const query = 'UPDATE geners SET gener_name = ? WHERE gener_id = ?';

        Connection.query(query, [data.name, data.id], callback);
    }

    /**
     * Delete gener
     *
     * @param id
     * @param callback
     */
    delete(id, callback) {
        let query = 'DELETE FROM geners';

        if (Array.isArray(id)) {
            query += ' WHERE gener_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE gener_id = ?';
        }
        Connection.query(query, [id], callback);
    }
}

module.exports = Geners;