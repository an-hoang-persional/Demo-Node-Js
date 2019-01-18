const singleton = Symbol('singleton');

const Connection = require('../database/database');

class JobTitles {
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
     * Find all job titles
     *
     * @param callback
     */
    findAll(callback) {
        const query = 'SELECT * FROM job_titles';

        Connection.query(query, [], callback);
    }

    /**
     * Find by job title id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        let query = 'SELECT * FROM job_titles';

        if (Array.isArray(id)) {
            query += ' WHERE job_title_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE job_title_id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Create new job title
     *
     * @param data
     * @param callback
     */
    create(data, callback) {
        const query = 'INSERT INTO job_titles SET ?';

        Connection.query(query, data, callback);
    }

    /**
     * Update job title name
     *
     * @param data
     * @returns {Promise<void>}
     */
    async update(data) {
        const query = 'UPDATE job_titles SET job_title_name = ? WHERE job_title_id = ?';

        await Connection.query(query, [data.name, data.id]);
    }

    /**
     * Delete job title
     *
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
        let query = 'DELETE FROM job_titles';

        if (Array.isArray(id)) {
            query += ' WHERE job_title_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE job_title_id = ?';
        }
        await Connection.query(query, [id]);
    }
}

module.exports = JobTitles;