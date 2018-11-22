const singleton = Symbol('singleton');

const Color = new (require('../daos/colors'))();

class ColorController {
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
     * Find all colors
     *
     * @param callback
     */
    findAll(callback) {
        // Find all colors
        Color.findAll(callback);
    }

    /**
     * Find by color id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        // Find by color id
        Color.findById(id, callback);
    }

    /**
     * Create new color
     *
     * @param name
     * @param callback
     */
    create(name, callback) {
        const data = {
            color_name: name
        };

        // Create new color
        Color.create(data, (error, result) => {
            if (error) {
                callback(error, null);
            }
            // Find by color id
            Color.findById(result.insertId, callback);
        });
    }

    /**
     * Update color name
     *
     * @param params
     * @param callback
     */
    update(params, callback) {
        const data = {
            id: params.id,
            name: params.name
        };

        // Find by color id
        Color.findById(params.id, (error, result) => {
            if (error) {
                callback(error, null);
            }
            if (result.length === 0) {
                callback(null, []);
            } else {
                // Update color name
                Color.update(data, callback);
            }
        });
    }

    /**
     * Delete color
     *
     * @param id
     * @param callback
     */
    delete(id, callback) {
        // Find by color id
        Color.findById(id, (error, result) => {
            if (error) {
                callback(error, null);
            }
            if (result.length === 0) {
                callback(null, []);
            } else {
                // Delete color
                Color.delete(id, callback);
            }
        });
    }
}

module.exports = ColorController;