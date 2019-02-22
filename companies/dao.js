const BaseDao = require('../base/dao');

class CompanyDao extends BaseDao {
    /**
     * Constructor
     */
    constructor() {
        super('companies');
    }

    /**
     * Find by company id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        return await super.baseFindById({
            company_id: id
        });
    }

    /**
     * Create new company
     *
     * @param data
     * @returns {Promise<*>}
     */
    async create(data) {
        return await super.baseCreate(data);
    }

    /**
     * Update company name
     *
     * @param data
     * @returns {Promise<*>}
     */
    async update(data) {
        return await super.baseUpdate({
            update: {
                company_name: data.name
            },
            where: {
                company_id: data.id
            }
        });
    }

    /**
     * Delete company
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        return await super.baseDelete({
            company_id: id
        });
    }
}

module.exports = new CompanyDao();