/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import { useContext } from "react";
import Task from "./Task";
import { TodosContext } from "./ToDoProvide";

export default function TaskList(){
	const todos = useContext(TodosContext);

	return (
		<ul className="w-full my-10 border-blue-600 border-2">
			{todos.map(todo => (
				<li key={todo.id}>
					<Task 
						todo={todo}
						id={todo.id}
					/>
				</li>
			))}
		</ul>
	);
}
