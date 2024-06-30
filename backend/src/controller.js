const { pool } = require('./db.js');
const queries = require('./queries.js');

const getTasks = async (req, res) => {
	try {
		const results = await pool.query(queries.getTask);
		res.status(200).json(results.rows);
	} catch (error) {
		console.log(`Error occured while getting tasks! Message: ${error.message}`);
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
		console.log(`Error occured while getting task of id: ${id}! Message: ${error.message}`);
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
		console.log(`Error occured while adding task "${title}" ! Message: ${error.message}`);
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
		console.log(`Error occured while deleting task of id: "${id}" ! Message: ${error.message}`);
		res.status(500).send(`ERROR`);
	}
};

const updateTask = async (req, res) => {
	const id = parseInt(req.params.id);

	const { title, completed } = req.body;
	try {
		await pool.query(queries.updateTask, [title, completed, id]);
		res.status(200).json({
			success: true,
			message: "Successfully updated task!"
		});
	} catch (error) {
		console.log(`Error occured while deleting task of id: "${id}" ! Message: ${error.message}`);
		res.status(500).send(`ERROR`);
	}
}

module.exports = {
	getTasks,
	getTaskById,
	addTask,
	removeTask,
	updateTask,
}