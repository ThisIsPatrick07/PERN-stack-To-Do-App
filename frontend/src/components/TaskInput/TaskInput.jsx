/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import { useContext, useState } from "react";
import { TaskDispatchContext, TasksRemainingContext } from "../ToDoProvide.jsx";
import controller from "../../utils/utils.js";

export default function TaskInput(){
	const [title, setTitle] = useState("");
	const dispatch = useContext(TaskDispatchContext);

	const { handleSetTasksRemaining } = useContext(TasksRemainingContext);

	function handleAddTask(title){
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

	return (
		<>
			<button 
				className="
					text-white 
					bg-blue-700
					px-4 py-2 
					rounded-tl-xl rounded-bl-xl 
					border-white
					font-semibold
					"
				style={{ height: '40px' }}
				onClick={() => { handleAddTask(title) }}
			>
				Add
			</button>
			<input className="
				w-80
				border-solid 
				border-black 
				px-2 py-2 
				text-black 
				rounded-tr rounded-br
				" 
				id="taskInput" 
				type="text" 
				value={title}
				style={{ height: '40px' }}
				onChange={(event) => {
					setTitle(event.target.value);
				}}
				onKeyDown={(event) => {
					// console.log(event.key);
					if(event.key === 'Enter'){
						handleAddTask(title);
					}
					// setEditInput(false);
					// handleEditTask(title, completed);
				}}
				/>
		</>
	);
}