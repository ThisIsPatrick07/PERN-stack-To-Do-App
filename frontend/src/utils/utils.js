import axios from "axios";

async function setupTable(){
	try {
		const successMsg = await axios.get('/setup');
		console.log("nice", successMsg.data.message);
		return successMsg.data.message;
	} catch (error) {
		console.log(`Error occured while trying to create table! Message: ${error.message}`);
		throw error;
	}
}

async function fetchData(){
    try {
        const response = await axios.get("/api/tasks");
        const responseData = await response.data;
        return responseData;
    } catch (error) {
        console.log(`Error occurred while fetching data! Message: ${error.message}`);
        throw error;
    }
}

async function addTask(title){
	console.log("Adding title!: ", title);
	try {
		const successMsg = await axios.post("/api/tasks", {title: title});
		return successMsg.data.message;
	} catch (error) {
		console.log(`Error occurred while adding task! Message: ${error.message}`);
		throw error;
	}
}

async function deleteTask(id){
	try {
		const successMsg = await axios.delete(`/api/tasks/${id}`);
		return successMsg.data.message;
	} catch (error) {
		console.log(`Error occurred while deleting task! Message: ${error.message}`);
		throw error;
	}
}

async function updateTask(id, title, completed){
	try {
		const successMsg = await axios.put(`/api/tasks/${id}`, {
			title: title,
			completed: completed,
		});
		return successMsg.data.message;
	} catch (error) {
		console.log(`Error occurred while updating task! Message: ${error.message}`);
		throw error;
	}
}

export default {
	setupTable,
	fetchData,
	addTask,
	deleteTask,
	updateTask,
}