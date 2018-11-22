const singleton = Symbol('singleton');

const User = new (require('../daos/users'))();

class UserController {
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
     * Find by user id
     *
     * @param id
     * @param callback
     */
    findByUserId(id, callback) {
        // Find by user id
        University.findByUserId(id, callback);
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
                callback(error, null);
            }
            // Find by university id
            University.findById(result.insertId, callback);
        });
    }

    /**
     * Update university name
     *
     * @param params
     * @param callback
     */
    update(params, callback) {
        const data = {
            id: params.id,
            name: params.name
        };

        // Find by university id
        University.findById(params.id, (error, result) => {
            if (error) {
                callback(error, null);
            }
            if (result.length === 0) {
                callback(null, []);
            } else {
                // Update university name
                University.update(data, callback);
            }
        });
    }

    /**
     * Delete university
     *
     * @param id
     * @param callback
     */
    delete(id, callback) {
        // Find by university id
        University.findById(id, (error, result) => {
            if (error) {
                callback(error, null);
            }
            if (result.length === 0) {
                callback(null, []);
            } else {
                // Delete university
                University.delete(id, callback);
            }
        });
    }
}

module.exports = UniversityController;