/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import { useContext, useState } from "react";
import Task from "./Task";
import { TodosContext } from "./ToDoProvide";

export default function TaskList(){
	const todos = useContext(TodosContext);
	const [incompleteOnly, setIncompleteOnly] = useState(false);

	const tasksRemaining = todos.filter(todo => todo.completed === false).length;

	return (
		<>
			<div className="bg-white my-4 text-center">
				<input 
					type="checkbox" 
					name="incomplete-tasks-only" 
					id="incompleteOnly" 
					checked={incompleteOnly}
					onChange={() => { setIncompleteOnly(!incompleteOnly) }}
				/>
				<label htmlFor="incompleteOnly">Only Incomplete Tasks</label>
			</div>
			<span
				className="mx-auto"
			>{tasksRemaining !== 0 ? `${tasksRemaining} Tasks remaining` : "Hurray! All tasks completed 🥳"}</span>
			<ul className="w-full my-10 border-blue-600 border-2">
				{todos.map(todo => (
					!(incompleteOnly & todo.completed) && (<li key={todo.id}>
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