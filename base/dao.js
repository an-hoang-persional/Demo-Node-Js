const Connection = require('../middleware/database');

class BaseDao {
    /**
     * Constructor
     *
     * @param table
     */
    constructor(table) {
        this.table = table;
    }

    /**
     * Find all records in table
     *
     * @returns {Promise<*>}
     */
    async baseFindAll() {
        return await Connection.query(`SELECT * FROM ${this.table}`);
    }

    /**
     * Find record by id
     *
     * @param data
     * @returns {Promise<*>}
     */
    async baseFindById(data) {
        const condition = _getCondition(data);

        return await Connection.query(`SELECT * FROM ${this.table} ${condition.query}`, [condition.id]);
    }

    /**
     * Create new record
     *
     * @param data
     * @param secondTable
     * @returns {Promise<*>}
     */
    async baseCreate(data, secondTable = '') {
        const table = secondTable === '' ? this.table : secondTable;

        return await Connection.query(`INSERT INTO ${table} SET ?`, data);
    }

    /**
     * Update exist record
     *
     * @param data
     * @param secondTable
     * @returns {Promise<*>}
     */
    async baseUpdate(data, secondTable = '') {
        const table = secondTable === '' ? this.table : secondTable;
        const condition = _getUpdate(data);

        return await Connection.query(`UPDATE ${table} ${condition.query}`, condition.values);
    }

    /**
     * Delete exist record
     *
     * @param data
     * @param secondTable
     * @returns {Promise<*>}
     */
    async baseDelete(data, secondTable = '') {
        const table = secondTable === '' ? this.table : secondTable;
        const condition = _getCondition(data);

        return await Connection.query(`DELETE FROM ${table} ${condition.query}`, [condition.id]);
    }

    /**
     * Custom query
     *
     * @param query
     * @param data
     * @returns {Promise<*>}
     */
    async query(query, data = []) {
        return await Connection.query(query, data);
    }
}

const _getCondition = (data) => {
    const field = Object.entries(data)[0];
    let query = `WHERE ${field[0]} = ?`;
    let id = field[1];

    if (Array.isArray(id)) {
        query = `WHERE ${field[0]} IN (?)`;
        id = id.join(', ');
    }
    return {
        query,
        id
    };
};
const _getUpdate = (data) => {
    const updateFields = Object.entries(data.update);
    const whereField = Object.entries(data.where)[0];
    let fields = [];
    let values = [];

    for (let field of updateFields) {
        fields.push(`${field[0]} = ?`);
        values.push(field[1]);
    }
    fields = fields.join(', ');
    values.push(whereField[1]);

    let query = `SET ${fields} WHERE ${whereField[0]} = ?`;

    return {
        query,
        values
    };
};
module.exports = BaseDao;