const { table_name } = require("./constants.js");


const queries = {
	// create table
	createTableQuery : `CREATE TABLE ${table_name} (id SERIAL PRIMARY KEY, title VARCHAR(100) NOT NULL, completed BOOLEAN NOT NULL, description VARCHAR(500));`,

	// display tasks
	getTask: `SELECT * FROM ${table_name} ORDER BY id;`,
	
	// display task by ID
	getTaskById: `SELECT * FROM ${table_name} WHERE id=$1;`,
	
	// add task
	addTask: `INSERT INTO ${table_name} (title, completed) VALUES($1, FALSE);`,
	
	// delete task
	removeTask: `DELETE FROM ${table_name} WHERE id=$1;`,
	
	// update task title and/or completed status
	updateTask: `UPDATE ${table_name} SET title=$2, completed=$3, description=$4 WHERE id=$1;`,
}

module.exports = queries;