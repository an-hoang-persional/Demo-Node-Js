const Dao = require('./dao');

class CountryController {
    /**
     * Find all countries
     *
     * @returns {Promise<Array>}
     */
    async findAll() {
        try {
            // Find all countries
            const result = await Dao.baseFindAll();
            let countries = [];

            for (let country of result) {
                countries.push({
                    id: country.country_id,
                    name: country.country_name,
                    code: country.country_code
                });
            }
            return countries;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find by country id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        try {
            // Find by country id
            const result = await Dao.findById(id);

            if (result.length === 0) {
                return {};
            }
            return {
                id: result[0].country_id,
                name: result[0].country_name,
                code: result[0].country_code
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create new country
     *
     * @param params
     * @returns {Promise<*>}
     */
    async create(params) {
        try {
            // Create new country
            const result = await Dao.create({
                country_name: params.name,
                country_code: params.code
            });

            // Find by country id
            return await this.findById(result.insertId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update country
     *
     * @param params
     * @returns {Promise<*>}
     */
    async update(params) {
        try {
            // Update country
            return await Dao.update({
                id: params.id,
                name: params.name,
                code: params.code
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete country
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        try {
            // Delete country
            return await Dao.delete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CountryController();