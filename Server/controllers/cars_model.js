const singleton = Symbol('singleton');

const CarModel = new (require('../daos/cars_model'))();

class CarModelController {
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
     * Find all cars model
     *
     * @param callback
     */
    findAll(callback) {
        // Find all cars model
        CarModel.findAll(callback);
    }

    /**
     * Find by car model id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        // Find by car model id
        CarModel.findById(id, callback);
    }

    /**
     * Create new car model
     *
     * @param model
     * @param callback
     */
    create(model, callback) {
        const data = {
            car_model: model
        };

        // Create new car model
        CarModel.create(data, (error, result) => {
            if (error) {
                callback(error, null);
            }
            // Find by car model id
            CarModel.findById(result.insertId, callback);
        });
    }

    /**
     * Update car model
     *
     * @param params
     * @param callback
     */
    update(params, callback) {
        const data = {
            id: params.id,
            model: params.model
        };

        // Find by car model id
        CarModel.findById(params.id, (error, result) => {
            if (error) {
                callback(error, null);
            }
            if (result.length === 0) {
                callback(null, []);
            } else {
                // Update car model
                CarModel.update(data, callback);
            }
        });
    }

    /**
     * Delete car model
     *
     * @param id
     * @param callback
     */
    delete(id, callback) {
        // Find by car model id
        CarModel.findById(id, (error, result) => {
            if (error) {
                callback(error, null);
            }
            if (result.length === 0) {
                callback(null, []);
            } else {
                // Delete car model
                CarModel.delete(id, callback);
            }
        });
    }
}

module.exports = CarModelController;