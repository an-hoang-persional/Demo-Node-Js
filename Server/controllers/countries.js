const singleton = Symbol('singleton');

const Country = new (require('../daos/countries'))();

class CountryController {
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
     * Find all countries
     *
     * @param callback
     */
    findAll(callback) {
        // Find all countries
        Country.findAll(callback);
    }

    /**
     * Find by country id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        // Find by country id
        Country.findById(id, callback);
    }

    /**
     * Create new country
     *
     * @param params
     * @param callback
     */
    create(params, callback) {
        const data = {
            country_name: params.name,
            country_code: params.code
        };

        // Create new country
        Country.create(data, (error, result) => {
            if (error) {
                callback(error, null);
            }
            // Find by country id
            Country.findById(result.insertId, callback);
        });
    }

    /**
     * Update country
     *
     * @param params
     * @param callback
     */
    update(params, callback) {
        const data = {
            id: params.id,
            name: params.name,
            code: params.code
        };

        // Find by country id
        Country.findById(params.id, (error, result) => {
            if (error) {
                callback(error, null);
            }
            if (result.length === 0) {
                callback(null, []);
            } else {
                // Update country
                Country.update(data, callback);
            }
        });
    }

    /**
     * Delete country
     *
     * @param id
     * @param callback
     */
    delete(id, callback) {
        // Find by country id
        Country.findById(id, (error, result) => {
            if (error) {
                callback(error, null);
            }
            if (result.length === 0) {
                callback(null, []);
            } else {
                // Delete country
                Country.delete(id, callback);
            }
        });
    }
}

module.exports = CountryController;