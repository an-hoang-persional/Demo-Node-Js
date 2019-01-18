const singleton = Symbol('singleton');

const Connection = require('../database/database');

class CarsModel {
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
        const query = 'SELECT * FROM cars_model';

        Connection.query(query, [], callback);
    }

    /**
     * Find by car model id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        let query = 'SELECT * FROM cars_model';

        if (Array.isArray(id)) {
            query += ' WHERE car_model_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE car_model_id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Create new car model
     *
     * @param data
     * @param callback
     */
    create(data, callback) {
        const query = 'INSERT INTO cars_model SET ?';

        Connection.query(query, data, callback);
    }

    /**
     * Update car model
     *
     * @param data
     * @returns {Promise<void>}
     */
    async update(data) {
        const query = 'UPDATE cars_model SET car_model = ? WHERE car_model_id = ?';

        await Connection.query(query, [data.model, data.id]);
    }

    /**
     * Delete car model
     *
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
        let query = 'DELETE FROM cars_model';

        if (Array.isArray(id)) {
            query += ' WHERE car_model_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE car_model_id = ?';
        }
        await Connection.query(query, [id]);
    }
}

module.exports = CarsModel;