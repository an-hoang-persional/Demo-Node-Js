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
                return callback(error, null);
            }
            // Find by color id
            Color.findById(result.insertId, callback);
        });
    }

    /**
     * Update color name
     *
     * @param params
     * @returns {Promise<void>}
     */
    async update(params) {
        const data = {
            id: params.id,
            name: params.name
        };

        // Update color name
        await Color.update(data);
    }

    /**
     * Delete color
     *
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
        // Delete color
        await Color.delete(id);
    }
}

module.exports = ColorController;