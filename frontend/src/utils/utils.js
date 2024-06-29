import axios from "axios";

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
		console.log(`Error occurred!`);
		throw error;
	}
}

async function deleteTask(id){
	try {
		const successMsg = await axios.delete(`/api/tasks/${id}`);
		return successMsg.data.message;
	} catch (error) {
		console.log(`Error occurred!`);
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
		console.log(`Error occurred!`);
		throw error;
	}
}

export default {
	fetchData,
	addTask,
	deleteTask,
	updateTask,
}