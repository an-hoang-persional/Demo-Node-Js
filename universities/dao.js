const BaseDao = require('../base/dao');

class UniversityDao extends BaseDao {
    /**
     * Constructor
     */
    constructor() {
        super('universities');
    }

    /**
     * Find by university id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        return await super.baseFindById({
            university_id: id
        });
    }

    /**
     * Create new university
     *
     * @param data
     * @returns {Promise<*>}
     */
    async create(data) {
        return await super.baseCreate(data);
    }

    /**
     * Update university name
     *
     * @param data
     * @returns {Promise<*>}
     */
    async update(data) {
        return await super.baseUpdate({
            update: {
                university_name: data.name
            },
            where: {
                university_id: data.id
            }
        });
    }

    /**
     * Delete university
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        return await super.baseDelete({
            university_id: id
        });
    }
}

module.exports = new UniversityDao();