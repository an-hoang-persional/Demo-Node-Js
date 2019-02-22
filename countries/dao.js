const BaseDao = require('../base/dao');

class CountryDao extends BaseDao {
    /**
     * Constructor
     */
    constructor() {
        super('countries');
    }

    /**
     * Find by country id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        return await super.baseFindById({
            country_id: id
        });
    }

    /**
     * Create new country
     *
     * @param data
     * @returns {Promise<*>}
     */
    async create(data) {
        return await super.baseCreate(data);
    }

    /**
     * Update country
     *
     * @param data
     * @returns {Promise<*>}
     */
    async update(data) {
        return await super.baseUpdate({
            update: {
                country_name: data.name,
                country_code: data.code
            },
            where: {
                country_id: data.id
            }
        });
    }

    /**
     * Delete country
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        return await super.baseDelete({
            country_id: id
        });
    }
}

module.exports = new CountryDao();