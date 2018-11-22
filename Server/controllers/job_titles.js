const singleton = Symbol('singleton');

const JobTitle = new (require('../daos/job_titles'))();

class JobTitleController {
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
        // Find all job titles
        JobTitle.findAll(callback);
    }

    /**
     * Find by job title id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        // Find by job title id
        JobTitle.findById(id, callback);
    }

    /**
     * Create new job title
     *
     * @param name
     * @param callback
     */
    create(name, callback) {
        const data = {
            job_title_name: name
        };

        // Create new job title
        JobTitle.create(data, (error, result) => {
            if (error) {
                callback(error, null);
            }
            // Find by job title id
            JobTitle.findById(result.insertId, callback);
        });
    }

    /**
     * Update job title name
     *
     * @param params
     * @param callback
     */
    update(params, callback) {
        const data = {
            id: params.id,
            name: params.name
        };

        // Find by job title id
        JobTitle.findById(params.id, (error, result) => {
            if (error) {
                callback(error, null);
            }
            if (result.length === 0) {
                callback(null, []);
            } else {
                // Update job title name
                JobTitle.update(data, callback);
            }
        });
    }

    /**
     * Delete job title
     *
     * @param id
     * @param callback
     */
    delete(id, callback) {
        // Find by job title id
        JobTitle.findById(id, (error, result) => {
            if (error) {
                callback(error, null);
            }
            if (result.length === 0) {
                callback(null, []);
            } else {
                // Delete job title
                JobTitle.delete(id, callback);
            }
        });
    }
}

module.exports = JobTitleController;