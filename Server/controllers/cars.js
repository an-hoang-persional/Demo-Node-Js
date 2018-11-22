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
                callback(error, null);
            }
            // Find by car id
            Car.findById(result.insertId, callback);
        });
    }

    /**
     * Update car name
     *
     * @param params
     * @param callback
     */
    update(params, callback) {
        const data = {
            id: params.id,
            name: params.name
        };

        // Find by car id
        Car.findById(params.id, (error, result) => {
            if (error) {
                callback(error, null);
            }
            if (result.length === 0) {
                callback(null, []);
            } else {
                // Update car name
                Car.update(data, callback);
            }
        });
    }

    /**
     * Delete car
     *
     * @param id
     * @param callback
     */
    delete(id, callback) {
        // Find by car id
        Car.findById(id, (error, result) => {
            if (error) {
                callback(error, null);
            }
            if (result.length === 0) {
                callback(null, []);
            } else {
                // Delete car
                Car.delete(id, callback);
            }
        });
    }
}

module.exports = CarController;