const mysql = require('mysql');

const Database = require('../config/database');

module.exports = mysql.createPool({
    host: Database.host,
    user: Database.user,
    password: Database.password,
    database: Database.database
});