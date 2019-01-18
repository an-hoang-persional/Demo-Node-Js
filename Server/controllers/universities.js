const singleton = Symbol('singleton');

const University = new (require('../daos/universities'))();

class UniversityController {
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
     * Find all universities
     *
     * @param callback
     */
    findAll(callback) {
        // Find all universities
        University.findAll(callback);
    }

    /**
     * Find by university id
     *
     * @param id
     * @param callback
     */
    findById(id, callback) {
        // Find by university id
        University.findById(id, callback);
    }

    /**
     * Create new university
     *
     * @param name
     * @param callback
     */
    create(name, callback) {
        const data = {
            university_name: name
        };

        // Create new university
        University.create(data, (error, result) => {
            if (error) {
                return callback(error, null);
            }
            // Find by university id
            University.findById(result.insertId, callback);
        });
    }

    /**
     * Update university name
     *
     * @param params
     * @returns {Promise<void>}
     */
    async update(params) {
        const data = {
            id: params.id,
            name: params.name
        };

        // Update university name
        await University.update(data);
    }

    /**
     * Delete university
     *
     * @param id
     * @returns {Promise<void>}
     */
    async delete(id) {
        // Delete university
        await University.delete(id);
    }
}

module.exports = UniversityController;