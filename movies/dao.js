const BaseDao = require('../base/dao');

class MovieDao extends BaseDao {
    /**
     * Constructor
     */
    constructor() {
        super('movies');
    }

    /**
     * Find by movie id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        return await super.baseFindById({
            movie_id: id
        });
    }

    /**
     * Create new movie
     *
     * @param data
     * @returns {Promise<*>}
     */
    async create(data) {
        return await super.baseCreate(data);
    }

    /**
     * Update movie name
     *
     * @param data
     * @returns {Promise<*>}
     */
    async update(data) {
        return await super.baseUpdate({
            update: {
                movie_name: data.name
            },
            where: {
                movie_id: data.id
            }
        });
    }

    /**
     * Delete movie
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        return await super.baseDelete({
            movie_id: id
        });
    }
}

module.exports = new MovieDao();