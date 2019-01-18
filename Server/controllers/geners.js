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
                return callback(error, null);
            }
            // Find by gener id
            Gener.findById(result.insertId, callback);
        });
    }

    /**
     * Update gener name
     *
     * @param params
     * @returns {Promise<void>}
     */
    async update(params) {
        const data = {
            id: params.id,
            name: params.name
        };

        // Update gener name
        await Gener.update(data);
    }

    /**
     * Delete gener
     *
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
        // Delete gener
        await Gener.delete(id);
    }
}

module.exports = GenerController;