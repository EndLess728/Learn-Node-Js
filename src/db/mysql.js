const mysql = require("mysql2/promise");
const env = require("../config/env");

const pool = mysql.createPool(env.databaseUrl);

module.exports = pool;
