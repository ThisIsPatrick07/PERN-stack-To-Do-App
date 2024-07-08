const pool  = require('./db.js');
const queries = require('./queries.js');
const table_name = require("./constants.js");

const getTasks = async (req, res) => {
	try {
		const results = await pool.query(queries.getTask);
		res.status(200).json(results.rows);
	} catch (error) {
		console.log(`Error occurred while getting tasks! Message: ${error.message}`);
		res.status(500).send(`ERROR`);
	}
};

const getTaskById = async (req, res) => {
	const id = parseInt(req.params.id);
	try {
		const results = await pool.query(queries.getTaskById, [id]);
		
		// results empty --> user not found
		if(!results.rows.length){
			res.status(400).send(`User not found!`);
		}

		// sending the user
		res.status(200).json(results.rows);
	} catch (error) {
		console.log(`Error occurred while getting task of id: ${id}! Message: ${error.message}`);
		res.status(500).send(`ERROR`);
	}
};

const addTask = async (req, res) => {
	const { title } = req.body;
	try {
		await pool.query(queries.addTask, [title]);
		res.status(200).json({
			success: true,
			message: `Successfully added task!`,
		});
	} catch (error) {
		console.log(`Error occurred while adding task "${title}" ! Message: ${error.message}`);
		res.status(500).send(`ERROR`);
	}
};

/**NOTE- 
 * i am not checking if the id exists or not because user will only be displayed tasks with an ID
 * Thus, user will only be able to delete the tasks with a certain ID.
 * This is a small application so i have omitted the usage of ID checks here.
 */
const removeTask = async (req, res) => {
	const id = parseInt(req.params.id);
	try {
		await pool.query(queries.removeTask, [id]);
		res.status(200).json({
			success: true,
			message: "Successfully deleted task!",
		})
	} catch (error) {
		console.log(`Error occurred while deleting task of id: "${id}" ! Message: ${error.message}`);
		res.status(500).send(`ERROR`);
	}
};

const updateTask = async (req, res) => {
	const id = parseInt(req.params.id);

	const { title, completed, description } = req.body;
	try {
		await pool.query(queries.updateTask, [id, title, completed, description]);
		res.status(200).json({
			success: true,
			message: "Successfully updated task!"
		});
	} catch (error) {
		console.log(`Error occurred while updating task of id: "${id}" ! Message: ${error.message}`);
		res.status(500).send(`ERROR`);
	}
}

const setupDatabase = async (req, res) => {
	try {
		await pool.query(queries.createTableQuery);
		res.status(200).send(`Database successfully created!!`);
	} catch (error) {
		console.log(`Error occurred while creating table! Message: ${error.message}`);
		res.status(500).send(`ERROR`);
	}
}

module.exports = {
	getTasks,
	getTaskById,
	addTask,
	removeTask,
	updateTask,
	// addColumn,
	setupDatabase,
}