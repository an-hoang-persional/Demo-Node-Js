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
                callback(error, null);
            }
            // Find by company id
            Company.findById(result.insertId, callback);
        });
    }

    /**
     * Update company name
     *
     * @param params
     * @param callback
     */
    update(params, callback) {
        const data = {
            id: params.id,
            name: params.name
        };

        // Find by company id
        Company.findById(params.id, (error, result) => {
            if (error) {
                callback(error, null);
            }
            if (result.length === 0) {
                callback(null, []);
            } else {
                // Update company name
                Company.update(data, callback);
            }
        });
    }

    /**
     * Delete company
     *
     * @param id
     * @param callback
     */
    delete(id, callback) {
        // Find by company id
        Company.findById(id, (error, result) => {
            if (error) {
                callback(error, null);
            }
            if (result.length === 0) {
                callback(null, []);
            } else {
                // Delete company
                Company.delete(id, callback);
            }
        });
    }
}

module.exports = CompanyController;