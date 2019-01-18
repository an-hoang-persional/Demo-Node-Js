const singleton = Symbol('singleton');

const Car = new (require('../daos/cars'))();

class CarController {
    static get instance() {
        if (!this[singleton]) {
            this[singleton] = new this;
        }
        return this[singleton];
    }

    /**
     * Constructor
     */
    constructor() {
        let Class = new.target;

        if (!Class[singleton]) {
            Class[singleton] = this;
        }
        return Class[singleton];
    }

    /**
     * Find all cars
     *
     * @param callback
     */
    findAll(callback) {
        // Find all cars
        Car.findAll(callback);
    }

    /**
     * Find by car id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        // Find by car id
        Car.findById(id, callback);
    }

    /**
     * Create new car
     *
     * @param name
     * @param callback
     */
    create(name, callback) {
        const data = {
            car_name: name
        };

        // Create new car
        Car.create(data, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            // Find by car id
            Car.findById(result.insertId, callback);
        });
    }

    /**
     * Update car name
     *
     * @param params
     * @returns {Promise<void>}
     */
    async update(params) {
        const data = {
            id: params.id,
            name: params.name
        };

        // Update car name
        await Car.update(data);
    }

    /**
     * Delete car
     *
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
        // Delete car
        await Car.delete(id);
    }
}

module.exports = CarController;