const singleton = Symbol('singleton');

const Connection = require('../database/database');

class Cars {
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
        const query = 'SELECT * FROM cars';

        Connection.query(query, [], callback);
    }

    /**
     * Find by car id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        let query = 'SELECT * FROM cars';

        if (Array.isArray(id)) {
            query += ' WHERE car_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE car_id = ?';
        }
        Connection.query(query, [id], callback);
    }

    /**
     * Create new car
     *
     * @param data
     * @param callback
     */
    create(data, callback) {
        const query = 'INSERT INTO cars SET ?';

        Connection.query(query, data, callback);
    }

    /**
     * Update car name
     *
     * @param data
     * @param callback
     */
    update(data, callback) {
        const query = 'UPDATE cars SET car_name = ? WHERE car_id = ?';

        Connection.query(query, [data.name, data.id], callback);
    }

    /**
     * Delete car
     *
     * @param id
     * @param callback
     */
    delete(id, callback) {
        let query = 'DELETE FROM cars';

        if (Array.isArray(id)) {
            query += ' WHERE car_id IN (?)';
            id = id.join(', ');
        } else {
            query += ' WHERE car_id = ?';
        }
        Connection.query(query, [id], callback);
    }
}

module.exports = Cars;