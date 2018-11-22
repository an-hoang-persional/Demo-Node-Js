const singleton = Symbol('singleton');

const Connection = require('../database/database');

class Universities {
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
     * Find all universities
     *
     * @param callback
     */
    findAll(callback) {
        const query = 'SELECT * FROM universities';

        Connection.query(query, [], callback);
    }

    /**
     * Find by university id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        let query = 'SELECT * FROM universities';

        if (Array.isArray(id)) {
            query += ' WHERE university_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE university_id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Create new university
     *
     * @param data
     * @param callback
     */
    create(data, callback) {
        const query = 'INSERT INTO universities SET ?';

        Connection.query(query, data, callback);
    }

    /**
     * Update university name
     *
     * @param data
     * @param callback
     */
    update(data, callback) {
        const query = 'UPDATE universities SET university_name = ? WHERE university_id = ?';

        Connection.query(query, [data.name, data.id], callback);
    }

    /**
     * Delete university
     *
     * @param id
     * @param callback
     */
    delete(id, callback) {
        let query = 'DELETE FROM universities';

        if (Array.isArray(id)) {
            query += ' WHERE university_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE university_id = ?';
        }
        Connection.query(query, [id], callback);
    }
}

module.exports = Universities;