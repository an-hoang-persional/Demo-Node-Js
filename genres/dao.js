const BaseDao = require('../base/dao');

class GenreDao extends BaseDao {
    /**
     * Constructor
     */
    constructor() {
        super('genres');
    }

    /**
     * Find by genre id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        return await super.baseFindById({
            genre_id: id
        });
    }

    /**
     * Create new genre
     *
     * @param data
     * @returns {Promise<*>}
     */
    async create(data) {
        return await super.baseCreate(data);
    }

    /**
     * Update genre name
     *
     * @param data
     * @returns {Promise<*>}
     */
    async update(data) {
        return await super.baseUpdate({
            update: {
                genre_name: data.name
            },
            where: {
                genre_id: data.id
            }
        });
    }

    /**
     * Delete genre
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        return await super.baseDelete({
            genre_id: id
        });
    }
}

module.exports = new GenreDao();