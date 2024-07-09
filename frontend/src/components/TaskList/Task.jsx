/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import { useContext, useState } from "react";
import { TaskDispatchContext, TasksRemainingContext } from "../ToDoProvide/ToDoProvide.jsx"
import controller from "../../utils/utils.js";
import { flushSync } from "react-dom";

const btnStylingClassName = `text-white 
							bg-blue-700
							px-2 py-1
							mx-2
							rounded-lg
							border-white
							font-semibold`;

export default function Task({ id, todo }) {

	const [editInput, setEditInput] = useState(false);
	// const [showDesc, setShowDesc] = useState(false);

	const [completed, setCompleted] = useState(todo.completed);
	const [title, setTitle] = useState(todo.title);
	const [description, setDescription] = useState(todo.description || "");

	const dispatch = useContext(TaskDispatchContext);
	const { handleSetTasksRemaining } = useContext(TasksRemainingContext);

	const taskDivStyle = `w-full flex items-center py-1 my-1.5 border-solid border-2 
						${completed ? "border-green-600 bg-green-400 rounded-lg" : "border-yellow-600 bg-yellow-400 rounded-lg"}`;

	function handleEditTask(id, newCompleted = completed, showEditButton) {
		setEditInput(showEditButton);

		if (title.trim() === "") {
			alert("You cannot add empty task!");
		} else {
			controller.updateTask(id, title, newCompleted, description === "" ? null : description)
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

	function handleDeleteTask(id) {
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

	function handleCompleteTask(id) {
		setCompleted(!completed);
		handleEditTask(id, !completed, editInput);
	}

	return (
		<div className={taskDivStyle} style={{ color: "rgba(10, 0, 74, 0.912)", }}>
			<CompletedCheckbox
				completed={completed}
				id={id}
				handleCompleteTask={handleCompleteTask}
			/>
			<TodoTitleDisplay editInput={editInput} completed={completed} todo={todo} />
			<HelperButtonContainer>
				{editInput && (
					<EditModeContainerOuter>
						<EditModeContainerInner>
							<TitleEditInput
								id={id}
								title={title}
								completed={completed}
								description={description}
								setTitle={setTitle}
								handleEditTask={handleEditTask}
							/>
							<SaveBtn
								id={id}
								title={title}
								completed={completed}
								description={description}
								handleEditTask={handleEditTask}
							/>
							<CancelBtn
								setTitle={setTitle}
								setEditInput={setEditInput}
								setDescription={setDescription}
								todo={todo}
							/>
						</EditModeContainerInner>
						<Br />
						<DescriptionTextArea description={description} setDescription={setDescription} />
						<Br />
					</EditModeContainerOuter>
				)}
				{!editInput && (
					<>
						<NoteBtn />
						<EditBtn setEditInput={setEditInput} />
					</>
				)}
				<DeleteBtn id={id} handleDeleteTask={handleDeleteTask} />
			</HelperButtonContainer>
		</div>
	);
}

function EditBtn({ setEditInput }) {
	return (
		<button
			className={btnStylingClassName}
			onClick={() => setEditInput(true)}>
			Edit
		</button>
	);
}
function NoteBtn() {
	return (
		<button className={btnStylingClassName} >
			Note</button>
	);
}

function EditModeContainerOuter({ children }) {
	return (
		<div className="flex flex-col w-full">
			{children}
		</div>
	);
}
function EditModeContainerInner({ children }) {
	return (
		<div className="flex justify-between w-full">
			{children}
		</div>
	);
}

function SaveBtn({ id, handleEditTask }) {
	return (
		<button
			className={btnStylingClassName}
			onClick={() => {
				handleEditTask(id, false);
			}}
		>Save</button>
	);
}
function CancelBtn({ setEditInput, setTitle, setDescription, todo }) {
	return (
		<button className={btnStylingClassName} onClick={() => {
			setEditInput(false);

			// reset any changes made
			setDescription(todo.description);
			setTitle(todo.title);
		}}>
			Cancel
		</button>
	);
}
function DeleteBtn({ id, handleDeleteTask }) {
	return (
		<button
			className={btnStylingClassName + " bg-red-400"}
			onClick={() => { handleDeleteTask(id) }}>
			Delete
		</button>
	);
}

function TitleEditInput({ id, title, setTitle, handleEditTask }) {
	return (
		<input
			className="text-black px-2 mx-2 w-full"
			type="text"
			value={title}
			onChange={(event) => { setTitle(event.target.value) }}
			onKeyDown={(event) => {
				if (event.key === 'Enter') {
					handleEditTask(id, false);
				}
			}}
		/>
	);
}
function DescriptionTextArea({ description, setDescription }) {
	return (
		<textarea
			className="px-2 py-2 mx-2"
			name="taskDescription"
			id="task-description"
			value={description}
			onChange={(e) => { setDescription(e.target.value) }}
		>
		</textarea>
	);
}
function CompletedCheckbox({ completed, id, handleCompleteTask }) {
	return (
		<input
			className="mx-2 focus:ring-blue-600"
			type="checkbox"
			checked={completed}
			onChange={() => handleCompleteTask(id)}
		/>
	);
}
function HelperButtonContainer({ children }) {
	return (
		<div className="flex-wrap">
			{children}
		</div>
	);
}
function TodoTitleDisplay({ editInput, completed, todo }) {
	return (
		<p className="flex-1 mx-2">
			{!editInput && (completed ? <s>{todo.title}</s> : todo.title)}
		</p>
	);
}
function Br() {
	return <br />;
}