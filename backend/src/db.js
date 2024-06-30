const { Pool } = require('pg');
const { createTableQuery } = require('./queries.js');

const pool = new Pool({
    host: "db",
    port: 5432,
    user: "user123",
    password: process.env.DM_PASSWORD || "password123",
    database: process.env.DB_NAME || "task_database",
});

const setupDatabase = async (req, res) => {
    try {
		await pool.query(createTableQuery);
		res.status(200).send(`Database successfully created!!`);
	} catch (error) {
        console.error(`Error occurred while creating table! Message: ${error.message}`);
        res.status(500).send(`ERROR`);
    }
};

module.exports = {
    pool,
    setupDatabase,
};
