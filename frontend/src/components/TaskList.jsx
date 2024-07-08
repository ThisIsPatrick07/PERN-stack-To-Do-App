/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import { useContext, useState } from "react";
import Task from "./Task";
import { TodosContext, TasksRemainingContext } from "./ToDoProvide";

export default function TaskList(){
	const todos = useContext(TodosContext);
	const [incompleteOnly, setIncompleteOnly] = useState(false);

	const { tasksRemaining } = useContext(TasksRemainingContext);
		
	return (
		<>
			<div className="my-4 text-center align-text-top">
				<input 
					className="mx-2"
					type="checkbox" 
					name="incomplete-tasks-only" 
					id="incompleteOnly" 
					checked={incompleteOnly}
					onChange={() => { setIncompleteOnly(!incompleteOnly) }}

					style={{
						verticalAlign: "middle",
					}}
				/>
				<label htmlFor="incompleteOnly">Only Incomplete Tasks</label>
			</div>
			<div
				className="mx-auto text-2xl text-sky-400 text-center"
				style={{
					fontFamily: "Verdana",
				}}
			>
				{tasksRemaining !== 0 
					? <span>
						<span className="text-red-300">{tasksRemaining}</span> Tasks remaining
					</span> 
					: "Hurray! All tasks completed! 🥳"}
			</div>
			<ul className="w-full my-10">
				{todos.map(todo => (
					!(incompleteOnly && todo.completed) && (<li key={todo.id}>
						<Task 
							todo={todo}
							id={todo.id}
						/>
					</li>)
				))}
			</ul>
		</>
	);
}