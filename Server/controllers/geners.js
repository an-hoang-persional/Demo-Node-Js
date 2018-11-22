const singleton = Symbol('singleton');

const Gener = new (require('../daos/geners'))();

class GenerController {
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
     * Find all geners
     *
     * @param callback
     */
    findAll(callback) {
        // Find all geners
        Gener.findAll(callback);
    }

    /**
     * Find by gener id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        // Find by gener id
        Gener.findById(id, callback);
    }

    /**
     * Create new gener
     *
     * @param name
     * @param callback
     */
    create(name, callback) {
        const data = {
            gener_name: name
        };

        // Create new gener
        Gener.create(data, (error, result) => {
            if (error) {
                callback(error, null);
            }
            // Find by gener id
            Gener.findById(result.insertId, callback);
        });
    }

    /**
     * Update gener name
     *
     * @param params
     * @param callback
     */
    update(params, callback) {
        const data = {
            id: params.id,
            name: params.name
        };

        // Find by gener id
        Gener.findById(params.id, (error, result) => {
            if (error) {
                callback(error, null);
            }
            if (result.length === 0) {
                callback(null, []);
            } else {
                // Update gener name
                Gener.update(data, callback);
            }
        });
    }

    /**
     * Delete gener
     *
     * @param id
     * @param callback
     */
    delete(id, callback) {
        // Find by gener id
        Gener.findById(id, (error, result) => {
            if (error) {
                callback(error, null);
            }
            if (result.length === 0) {
                callback(null, []);
            } else {
                // Delete gener
                Gener.delete(id, callback);
            }
        });
    }
}

module.exports = GenerController;