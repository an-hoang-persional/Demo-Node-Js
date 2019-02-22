const BaseDao = require('../base/dao');

class CarDao extends BaseDao {
    /**
     * Constructor
     */
    constructor() {
        super('cars');
    }

    /**
     * Find by car id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        return await super.baseFindById({
            car_id: id
        });
    }

    /**
     * Create new car
     *
     * @param data
     * @returns {Promise<*>}
     */
    async create(data) {
        return await super.baseCreate(data);
    }

    /**
     * Update car name
     *
     * @param data
     * @returns {Promise<*>}
     */
    async update(data) {
        return await super.baseUpdate({
            update: {
                car_name: data.name
            },
            where: {
                car_id: data.id
            }
        });
    }

    /**
     * Delete car
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        return await super.baseDelete({
            car_id: id
        });
    }
}

module.exports = new CarDao();