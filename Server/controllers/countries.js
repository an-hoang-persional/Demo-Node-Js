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
                return callback(error, null);
            }
            // Find by country id
            Country.findById(result.insertId, callback);
        });
    }

    /**
     * Update country
     *
     * @param params
     * @returns {Promise<void>}
     */
    async update(params) {
        const data = {
            id: params.id,
            name: params.name,
            code: params.code
        };

        // Update country
        await Country.update(data);
    }

    /**
     * Delete country
     *
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
        // Delete country
        await Country.delete(id);
    }
}

module.exports = CountryController;