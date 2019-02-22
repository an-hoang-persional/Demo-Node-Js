const Dao = require('./dao');

class UniversityController {
    /**
     * Find all universities
     *
     * @returns {Promise<Array>}
     */
    async findAll() {
        try {
            // Find all universities
            const result = await Dao.baseFindAll();
            let universities = [];

            for (let university of result) {
                universities.push({
                    id: university.university_id,
                    name: university.university_name
                });
            }
            return universities;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find by university id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        try {
            // Find by university id
            const result = await Dao.findById(id);

            if (result.length === 0) {
                return {};
            }
            return {
                id: result[0].university_id,
                name: result[0].university_name
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create new university
     *
     * @param name
     * @returns {Promise<*>}
     */
    async create(name) {
        try {
            // Create new university
            const result = await Dao.create({
                university_name: name
            });

            // Find by university id
            return await this.findById(result.insertId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update university name
     *
     * @param params
     * @returns {Promise<*>}
     */
    async update(params) {
        try {
            // Update university name
            return await Dao.update({
                id: params.id,
                name: params.name
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete university
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        try {
            // Delete university
            return await Dao.delete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new UniversityController();