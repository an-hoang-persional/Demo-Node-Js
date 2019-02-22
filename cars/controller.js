const Dao = require('./dao');

class CarController {
    /**
     * Find all cars
     *
     * @returns {Promise<Array>}
     */
    async findAll() {
        try {
            // Find all cars
            const result = await Dao.baseFindAll();
            let cars = [];

            for (let car of result) {
                cars.push({
                    id: car.car_id,
                    name: car.car_name
                });
            }
            return cars;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find by car id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        try {
            // Find by car id
            const result = await Dao.findById(id);

            if (result.length === 0) {
                return {};
            }
            return {
                id: result[0].car_id,
                name: result[0].car_name
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create new car
     *
     * @param name
     * @returns {Promise<*>}
     */
    async create(name) {
        try {
            // Create new car
            const result = await Dao.create({
                car_name: name
            });

            // Find by car id
            return await this.findById(result.insertId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update car name
     *
     * @param params
     * @returns {Promise<*>}
     */
    async update(params) {
        try {
            // Update car name
            return await Dao.update({
                id: params.id,
                name: params.name
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete car
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        try {
            // Delete car
            return await Dao.delete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CarController();