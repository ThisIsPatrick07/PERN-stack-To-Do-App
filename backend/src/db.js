const Pool = require('pg').Pool;
const { createTableQuery } = require('./queries.js');

const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: process.env.DB_NAME || "task_database",
	password: process.env.DM_PASSWORD || "admin",
	port: 5432,
});

const setupDatabase = async (req, res) => {
	try {
		await pool.query(createTableQuery);
		res.status(200).send(`Database successfully created!!`);
	} catch (error) {
		console.log(`Error occurred while creating table! Message: ${error.message}`);
		res.status(500).send(`ERROR`);
	}
}

module.exports = {
	pool,
	setupDatabase,
}