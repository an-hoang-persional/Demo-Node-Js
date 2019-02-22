const Dao = require('./dao');

class MovieController {
    /**
     * Find all movies
     *
     * @returns {Promise<Array>}
     */
    async findAll() {
        try {
            // Find all movies
            const result = await Dao.baseFindAll();
            let movies = [];

            for (let movie of result) {
                movies.push({
                    id: movie.movie_id,
                    name: movie.movie_name
                });
            }
            return movies;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find by movie id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        try {
            // Find by movie id
            const result = await Dao.findById(id);

            if (result.length === 0) {
                return {};
            }
            return {
                id: result[0].movie_id,
                name: result[0].movie_name
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create new movie
     *
     * @param name
     * @returns {Promise<*>}
     */
    async create(name) {
        try {
            // Create new movie
            const result = await Dao.create({
                movie_name: name
            });

            // Find by movie id
            return await this.findById(result.insertId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update movie name
     *
     * @param params
     * @returns {Promise<*>}
     */
    async update(params) {
        try {
            // Update movie name
            return await Dao.update({
                id: params.id,
                name: params.name
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete movie
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        try {
            // Delete movie
            return await Dao.delete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new MovieController();