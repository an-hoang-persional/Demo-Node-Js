const Dao = require('./dao');

class GenreController {
    /**
     * Find all genres
     *
     * @returns {Promise<Array>}
     */
    async findAll() {
        try {
            // Find all genres
            const result = await Dao.baseFindAll();
            let genres = [];

            for (let genre of result) {
                genres.push({
                    id: genre.genre_id,
                    name: genre.genre_name
                });
            }
            return genres;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find by genre id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        try {
            // Find by genre id
            const result = await Dao.findById(id);

            if (result.length === 0) {
                return {};
            }
            return {
                id: result[0].genre_id,
                name: result[0].genre_name
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create new genre
     *
     * @param name
     * @returns {Promise<*>}
     */
    async create(name) {
        try {
            // Create new genre
            const result = await Dao.create({
                genre_name: name
            });

            // Find by genre id
            return await this.findById(result.insertId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update genre name
     *
     * @param params
     * @returns {Promise<*>}
     */
    async update(params) {
        try {
            // Update genre name
            return await Dao.update({
                id: params.id,
                name: params.name
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete genre
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        try {
            // Delete genre
            return await Dao.delete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new GenreController();