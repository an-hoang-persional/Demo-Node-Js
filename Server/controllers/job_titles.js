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
                return callback(error, null);
            }
            // Find by job title id
            JobTitle.findById(result.insertId, callback);
        });
    }

    /**
     * Update job title name
     *
     * @param params
     * @returns {Promise<void>}
     */
    async update(params) {
        const data = {
            id: params.id,
            name: params.name
        };

        // Update job title name
        await JobTitle.update(data);
    }

    /**
     * Delete job title
     *
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
        // Delete job title
        await JobTitle.delete(id);
    }
}

module.exports = JobTitleController;