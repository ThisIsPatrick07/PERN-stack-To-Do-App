/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

import { createContext, useEffect, useReducer, useState } from "react";
import controller from "../utils/utils.js";

export const TodosContext = createContext(null);
export const TaskDispatchContext = createContext(null);
export const TasksRemainingContext = createContext(null);

export function ToDoProvide({ children }) {
	const [todos, dispatch] = useReducer(tasksReducer, []);

	const [tasksRemaining, setTasksRemaining] = useState(0);
	function handleSetTasksRemaining(todos) { setTasksRemaining(todos.filter(todo => !todo.completed).length); }

	useEffect(() => {
		// fetching data
		controller.fetchData()
		.then((responseTodos) => {
			dispatch({
				type: "set",
				todos: responseTodos,
			})
			handleSetTasksRemaining(responseTodos);
		});
		// on cleanup, just clear the list again
		return () => { dispatch({ type: "clear" }) };
	}, []);

	return (
		<TodosContext.Provider value={todos}>
			<TaskDispatchContext.Provider value={dispatch}>
				<TasksRemainingContext.Provider value={{ tasksRemaining, handleSetTasksRemaining }}>
					{children}
				</TasksRemainingContext.Provider>
			</TaskDispatchContext.Provider>
		</TodosContext.Provider>
	);
}

function tasksReducer(tasks, action) {
	switch (action.type) {
		case "clear": {
			return [];
		}
		case "set": {
			return action.todos;
		}
		default: {
			throw Error("Unknown Action!");
		}
	}
}