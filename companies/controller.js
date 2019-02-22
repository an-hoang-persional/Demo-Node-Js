const Dao = require('./dao');

class CompanyController {
    /**
     * Find all companies
     *
     * @returns {Promise<Array>}
     */
    async findAll() {
        try {
            // Find all companies
            const result = await Dao.baseFindAll();
            let companies = [];

            for (let company of result) {
                companies.push({
                    id: company.company_id,
                    name: company.company_name
                });
            }
            return companies;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find by company id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        try {
            // Find by company id
            const result = await Dao.findById(id);

            if (result.length === 0) {
                return {};
            }
            return {
                id: result[0].company_id,
                name: result[0].company_name
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create new company
     *
     * @param name
     * @returns {Promise<*>}
     */
    async create(name) {
        try {
            // Create new company
            const result = await Dao.create({
                company_name: name
            });

            // Find by company id
            return await this.findById(result.insertId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update company name
     *
     * @param params
     * @returns {Promise<*>}
     */
    async update(params) {
        try {
            // Update company name
            return await Dao.update({
                id: params.id,
                name: params.name
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete company
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        try {
            // Delete company
            return await Dao.delete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CompanyController();