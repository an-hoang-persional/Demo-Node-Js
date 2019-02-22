const BaseDao = require('../base/dao');

class CarModelDao extends BaseDao {
    /**
     * Constructor
     */
    constructor() {
        super('cars_model');
    }

    /**
     * Find by car model id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        return await super.baseFindById({
            car_model_id: id
        });
    }

    /**
     * Create new car model
     *
     * @param data
     * @returns {Promise<*>}
     */
    async create(data) {
        return await super.baseCreate(data);
    }

    /**
     * Update car model
     *
     * @param data
     * @returns {Promise<*>}
     */
    async update(data) {
        return await super.baseUpdate({
            update: {
                car_model: data.model
            },
            where: {
                car_model_id: data.id
            }
        });
    }

    /**
     * Delete car model
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        return await super.baseDelete({
            car_model_id: id
        });
    }
}

module.exports = new CarModelDao();