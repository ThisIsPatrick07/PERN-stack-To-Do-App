const Pool = require('pg').Pool;

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: process.env.DB_NAME || "task_database",
	password: process.env.DM_PASSWORD || "admin",
	port: 5432,
});

module.exports = pool;