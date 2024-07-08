/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import { useContext, useState } from "react";
import { TaskDispatchContext, TasksRemainingContext } from "./ToDoProvide"
import controller from "../utils/utils.js";
import { flushSync } from "react-dom";

const btnStylingClassName = `text-white 
							bg-blue-700
							px-2 py-1
							mx-2
							rounded-lg
							border-white
							font-semibold`;

export default function Task({ id, todo }){

	const [editInput, setEditInput] = useState(false);
	// const [showDesc, setShowDesc] = useState(false);

	const [completed, setCompleted] = useState(todo.completed);
	const [title, setTitle] = useState(todo.title);
	const [description, setDescription] = useState(todo.description);

	const dispatch = useContext(TaskDispatchContext);
	const { handleSetTasksRemaining } = useContext(TasksRemainingContext);

	function handleEditTask(id, title, completed, description, showEditButton){
		setEditInput(showEditButton);

		if(title.trim() === ""){
			alert("You cannot add empty task!");
		} else{
			controller.updateTask(id, title, completed, description === "" ? null : description)
			.then(() => controller.fetchData())
			.then((todos) => {
				console.log("Got your todos!:", todos);
				dispatch({
					type: "set",
					todos: todos,
				})
				handleSetTasksRemaining(todos);
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
			});
			handleSetTasksRemaining(todos);
		})
	}

	let todoContent;
	if (editInput){
		todoContent = (
			<div className="flex flex-col w-full">
				<div className="flex justify-between w-full">
					<input
						className="text-black px-2 mx-2 w-full"
						type="text"
						value={title} 
						onChange={(event) => {setTitle(event.target.value)}}
						onKeyDown={(event) => {
							if(event.key === 'Enter'){
								handleEditTask(id, title, completed, description, false);	
							}
						}}
					/>
					<button
						className={btnStylingClassName}
						onClick={() => {
							handleEditTask(id, title, completed, description,  false);
						}}
					>Save</button>
					<button className={btnStylingClassName} onClick={() => {
						setEditInput(false);
						
						// reset any changes made
						setDescription(todo.description);
						setTitle(todo.title);
					}}>
						Cancel
					</button>
				</div>
				<br />
				<textarea 
					className="px-2 py-2 mx-2"
					name="taskDescription" 
					id="task-description" 
					value={description}
					onChange={(e) => { setDescription(e.target.value) }}
				>
				</textarea>
				<br />
			</div>
		);
	}
	else{
		todoContent = (
			<>
				<button
					className={btnStylingClassName}

				>
					Note</button>
				<button 
					className={btnStylingClassName}
					onClick={() => setEditInput(true)}>
					Edit
				</button>
			</>
		);
	}

	return (
		<div 
			className="w-full flex items-center py-1 my-1.5 border-solid border-yellow-600 border-2 bg-yellow-400 rounded-lg"
			style={{ color: "rgba(10, 0, 74, 0.912)", }}
		>
			<input 
				className="mx-2 focus:ring-blue-600"
				type="checkbox" 
				checked={completed}
				onChange={() => {
					setCompleted(!completed);
					handleEditTask(id, title, !completed, description, editInput);
				}}
			/>
			<p className="flex-1 mx-2">
				{!editInput && (completed ? <s>{todo.title}</s> : todo.title)}
			</p>
			<div className="flex-wrap">
				{todoContent}
				<button 
					className={btnStylingClassName + " bg-red-400"}
					onClick={() => { handleDeleteTask(id) }}>
					Delete
				</button>
			</div>
		</div>
	);
}
