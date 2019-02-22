const mysql = require('mysql');
const util = require('util');

const Database = require('../config/database');

const pool = mysql.createPool({
    host: Database.host,
    user: Database.user,
    password: Database.password,
    database: Database.database
});

pool.getConnection((error, connection) => {
    if (error) {
        console.log(error.message);
    }
    if (connection) {
        connection.release();
    }
});

pool.query = util.promisify(pool.query);

module.exports = pool;