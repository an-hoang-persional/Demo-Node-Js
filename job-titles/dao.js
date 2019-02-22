const BaseDao = require('../base/dao');

class JobTitleDao extends BaseDao {
    /**
     * Constructor
     */
    constructor() {
        super('job_titles');
    }

    /**
     * Find by job title id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        return await super.baseFindById({
            job_title_id: id
        });
    }

    /**
     * Create new job title
     *
     * @param data
     * @returns {Promise<*>}
     */
    async create(data) {
        return await super.baseCreate(data);
    }

    /**
     * Update job title name
     *
     * @param data
     * @returns {Promise<*>}
     */
    async update(data) {
        return await super.baseUpdate({
            update: {
                job_title_name: data.name
            },
            where: {
                job_title_id: data.id
            }
        });
    }

    /**
     * Delete job title
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        return await super.baseDelete({
            job_title_id: id
        });
    }
}

module.exports = new JobTitleDao();