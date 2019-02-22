const BaseDao = require('../base/dao');

class ColorDao extends BaseDao {
    /**
     * Constructor
     */
    constructor() {
        super('colors');
    }

    /**
     * Find by color id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        return await super.baseFindById({
            color_id: id
        });
    }

    /**
     * Create new color
     *
     * @param data
     * @returns {Promise<*>}
     */
    async create(data) {
        return await super.baseCreate(data);
    }

    /**
     * Update color name
     *
     * @param data
     * @returns {Promise<*>}
     */
    async update(data) {
        return await super.baseUpdate({
            update: {
                color_name: data.name
            },
            where: {
                color_id: data.id
            }
        });
    }

    /**
     * Delete color
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        return await super.baseDelete({
            color_id: id
        });
    }
}

module.exports = new ColorDao();