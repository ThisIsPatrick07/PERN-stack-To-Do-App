const table_name = process.env.TASK_TABLE_NAME || "task_table";

const queries = {
	// create table
	createTableQuery : "CREATE TABLE task_table (id SERIAL PRIMARY KEY, title VARCHAR(255), completed BOOLEAN);",

	// display tasks
	getTask: "SELECT * FROM task_table ORDER BY id;",
	
	// display task by ID
	getTaskById: "SELECT * FROM task_table WHERE id=$1;",
	
	// add task
	addTask: "INSERT INTO task_table (title, completed) VALUES($1, FALSE)",
	
	// delete task
	removeTask: "DELETE FROM task_table WHERE id=$1",
	
	// update task title and/or completed status
	updateTask: "UPDATE task_table SET title=$1, completed=$2 WHERE id=$3",
}

module.exports = queries;