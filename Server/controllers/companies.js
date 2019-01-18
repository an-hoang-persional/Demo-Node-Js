const singleton = Symbol('singleton');

const Company = new (require('../daos/companies'))();

class CompanyController {
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
        // Find all companies
        Company.findAll(callback);
    }

    /**
     * Find by company id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        // Find by company id
        Company.findById(id, callback);
    }

    /**
     * Create new company
     *
     * @param name
     * @param callback
     */
    create(name, callback) {
        const data = {
            company_name: name
        };

        // Create new company
        Company.create(data, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            // Find by company id
            Company.findById(result.insertId, callback);
        });
    }

    /**
     * Update company name
     *
     * @param params
     * @returns {Promise<void>}
     */
    async update(params) {
        const data = {
            id: params.id,
            name: params.name
        };

        // Update company name
        await Company.update(data);
    }

    /**
     * Delete company
     *
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
        // Delete company
        await Company.delete(id);
    }
}

module.exports = CompanyController;