const Dao = require('./dao');

class ColorController {
    /**
     * Find all colors
     *
     * @returns {Promise<Array>}
     */
    async findAll() {
        try {
            // Find all colors
            const result = await Dao.baseFindAll();
            let colors = [];

            for (let color of result) {
                colors.push({
                    id: color.color_id,
                    name: color.color_name
                });
            }
            return colors;
        } catch (error) {
            throw error;
        }
    }

    /**
     * Find by color id
     *
     * @param id
     * @returns {Promise<*>}
     */
    async findById(id) {
        try {
            // Find by color id
            const result = await Dao.findById(id);

            if (result.length === 0) {
                return {};
            }
            return {
                id: result[0].color_id,
                name: result[0].color_name
            };
        } catch (error) {
            throw error;
        }
    }

    /**
     * Create new color
     *
     * @param name
     * @returns {Promise<*>}
     */
    async create(name) {
        try {
            // Create new color
            const result = await Dao.create({
                color_name: name
            });

            // Find by color id
            return await this.findById(result.insertId);
        } catch (error) {
            throw error;
        }
    }

    /**
     * Update color name
     *
     * @param params
     * @returns {Promise<*>}
     */
    async update(params) {
        try {
            // Update color name
            return await Dao.update({
                id: params.id,
                name: params.name
            });
        } catch (error) {
            throw error;
        }
    }

    /**
     * Delete color
     *
     * @param id
     * @returns {Promise<*>}
     */
    async delete(id) {
        try {
            // Delete color
            return await Dao.delete(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ColorController();