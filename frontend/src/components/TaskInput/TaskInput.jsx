/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import { useContext, useState } from "react";
import { TaskDispatchContext, TasksRemainingContext } from "../ToDoProvide.jsx";
import controller from "../../utils/utils.js";
import AddBtn from "./AddBtn.jsx";
import InputBar from "./InputBar.jsx";

export default function TaskInput(){
	const [title, setTitle] = useState("");
	const dispatch = useContext(TaskDispatchContext);

	const { handleSetTasksRemaining } = useContext(TasksRemainingContext);

	function handleAddTask(){
		if (title.trim() === ""){
			alert("You cannot add an empty task!");
		}
		else{
			controller.addTask(title)
			.then(() => controller.fetchData())
			.then((todos) => {
				console.log("Got your todos!:", todos);
				dispatch({
					type: "set",
					todos: todos,
				})
				handleSetTasksRemaining(todos);
			});

			// clearing the task input bar upon adding the task
			setTitle("");
		}
	}

	function handleTitleChange(e){
		setTitle(e.target.value);
	}

	return (
		<div className="w-full justify-center flex flex-wrap">
			<AddBtn handleAddTask={handleAddTask} />
			<InputBar title={title} handleTitleChange={handleTitleChange} handleAddTask={handleAddTask} />
		</div>
	);
}