const Dao = require('./dao');

class CarModelController {
    /**
     * Find all cars model
     *
     * @returns {Promise<Array>}
     */
    async findAll() {
        try {
            // Find all cars model
            const result = await Dao.baseFindAll();
            let models = [];

            for (let model of result) {
                models.push({
                    id: model.car_model_id,
                    model: model.car_model
                });
            }
            return models;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find by car model id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        try {
            // Find by car model id
            const result = await Dao.findById(id);

            if (result.length === 0) {
                return {};
            }
            return {
                id: result[0].car_model_id,
                model: result[0].car_model
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create new car model
     *
     * @param model
     * @returns {Promise<*>}
     */
    async create(model) {
        try {
            // Create new car model
            const result = await Dao.create({
                car_model: model
            });

            // Find by car model id
            return await this.findById(result.insertId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update car model
     *
     * @param params
     * @returns {Promise<*>}
     */
    async update(params) {
        try {
            // Update car model
            return await Dao.update({
                id: params.id,
                model: params.model
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete car model
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        try {
            // Delete car model
            return await Dao.delete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CarModelController();