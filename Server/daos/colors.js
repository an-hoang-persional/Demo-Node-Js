const singleton = Symbol('singleton');

const Connection = require('../database/database');

class Colors {
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
     * Find all colors
     *
     * @param callback
     */
    findAll(callback) {
        const query = 'SELECT * FROM colors';

        Connection.query(query, [], callback);
    }

    /**
     * Find by color id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        let query = 'SELECT * FROM colors';

        if (Array.isArray(id)) {
            query += ' WHERE color_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE color_id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Create new color
     *
     * @param data
     * @param callback
     */
    create(data, callback) {
        const query = 'INSERT INTO colors SET ?';

        Connection.query(query, data, callback);
    }

    /**
     * Update color name
     *
     * @param data
     * @param callback
     */
    update(data, callback) {
        const query = 'UPDATE colors SET color_name = ? WHERE color_id = ?';

        Connection.query(query, [data.name, data.id], callback);
    }

    /**
     * Delete color
     *
     * @param id
     * @param callback
     */
    delete(id, callback) {
        let query = 'DELETE FROM colors';

        if (Array.isArray(id)) {
            query += ' WHERE color_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE color_id = ?';
        }
        Connection.query(query, [id], callback);
    }
}

module.exports = Colors;