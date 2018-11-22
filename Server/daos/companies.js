const singleton = Symbol('singleton');

const Connection = require('../database/database');

class Companies {
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
     * Find all companies
     *
     * @param callback
     */
    findAll(callback) {
        const query = 'SELECT * FROM companies';

        Connection.query(query, [], callback);
    }

    /**
     * Find by company id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        let query = 'SELECT * FROM companies';

        if (Array.isArray(id)) {
            query += ' WHERE company_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE company_id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Create new company
     *
     * @param data
     * @param callback
     */
    create(data, callback) {
        const query = 'INSERT INTO companies SET ?';

        Connection.query(query, data, callback);
    }

    /**
     * Update company name
     *
     * @param data
     * @param callback
     */
    update(data, callback) {
        const query = 'UPDATE companies SET company_name = ? WHERE company_id = ?';

        Connection.query(query, [data.name, data.id], callback);
    }

    /**
     * Delete company
     *
     * @param id
     * @param callback
     */
    delete(id, callback) {
        let query = 'DELETE FROM companies';

        if (Array.isArray(id)) {
            query += ' WHERE company_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE company_id = ?';
        }
        Connection.query(query, [id], callback);
    }
}

module.exports = Companies;