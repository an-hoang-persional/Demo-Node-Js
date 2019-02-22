const Dao = require('./dao');

class JobTitleController {
    /**
     * Find all job titles
     *
     * @returns {Promise<Array>}
     */
    async findAll() {
        try {
            // Find all job titles
            const result = await Dao.baseFindAll();
            let titles = [];

            for (let title of result) {
                titles.push({
                    id: title.job_title_id,
                    name: title.job_title_name
                });
            }
            return titles;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find by job title id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        try {
            // Find by job title id
            const result = await Dao.findById(id);

            if (result.length === 0) {
                return {};
            }
            return {
                id: result[0].job_title_id,
                name: result[0].job_title_name
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create new job title
     *
     * @param name
     * @returns {Promise<*>}
     */
    async create(name) {
        try {
            // Create new job title
            const result = await Dao.create({
                job_title_name: name
            });

            // Find by job title id
            return await this.findById(result.insertId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update job title name
     *
     * @param params
     * @returns {Promise<*>}
     */
    async update(params) {
        try {
            // Update job title name
            return await Dao.update({
                id: params.id,
                name: params.name
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete job title
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        try {
            // Delete job title
            return await Dao.delete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new JobTitleController();