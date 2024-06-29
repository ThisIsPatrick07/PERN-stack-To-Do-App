/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import { useContext, useState } from "react";
import { TaskDispatchContext } from "./ToDoProvide"
import controller from "../utils/utils.js";
import { flushSync } from "react-dom";

export default function Task({ id, todo }){

	const [editInput, setEditInput] = useState(false);
	const [completed, setCompleted] = useState(todo.completed);
	const [title, setTitle] = useState(todo.title);

	const dispatch = useContext(TaskDispatchContext);

	function handleEditTask(id, title, completed, showEditButton){
		setEditInput(showEditButton);

		if(title.trim() === ""){
			alert("You cannot add empty task!");
		} else{
			controller.updateTask(id, title, completed)
			.then(() => controller.fetchData())
			.then((todos) => {
				console.log("Got your todos!:", todos);
				dispatch({
					type: "set",
					todos: todos,
				})
			})
		}
	}

	function handleDeleteTask(id){
		controller.deleteTask(id)
		.then(() => controller.fetchData())
		.then((todos) => {
			console.log("Got your todos!:", todos);
			flushSync(() => {
				dispatch({
					type: "set",
					todos: todos,
				});
			})
		})
	}

	let todoContent;
	if (editInput){
		todoContent = (
			<>
				<input
					className="text-black px-1"
					type="text"
					value={title} 
					onChange={(event) => {setTitle(event.target.value)}}
					onKeyDown={(event) => {
						if(event.key === 'Enter'){
							// setEditInput(false);
							handleEditTask(id, title, completed, false);	
						}
					}}
				/>
				<button
					className="
					text-white 
					bg-blue-700
					px-2 py-1
					rounded-lg
					border-white
					font-semibold
					"
					onClick={() => {
						
						// setEditInput(false);
						handleEditTask(id, title, completed, false);
					}}
				>Save</button>
			</>
		);
	}
	else{
		todoContent = (
			<button 
				className="
				text-white 
				bg-blue-700
				px-2 py-1 
				mx-2
				rounded-lg
				border-white
				font-semibold
				"
				onClick={() => setEditInput(true)}>
				Edit
			</button>
		);
	}

	return (
		<div 
			className="w-full flex 
			justify-between items-center 
			border-solid border-white border-2 
			py-2 my-1 
			rounded-lg
			
		">
			<input 
				className="mx-2 focus:ring-blue-600"
				type="checkbox" 
				checked={completed}
				onChange={() => {
					setCompleted(!completed);
					handleEditTask(id, title, !completed, editInput);
				}}	
			/>
			<p>{!editInput && (completed ? <s>{todo.title}</s> : todo.title)}</p>
			{todoContent}
			<button 
				className="
				text-white 
				bg-blue-700
				px-2 py-1
				mx-2 
				rounded-lg
				border-white
				font-semibold
				"
				onClick={() => { handleDeleteTask(id) }}>
				Delete
			</button>
		</div>
	);
}
