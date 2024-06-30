/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

import { createContext, useEffect, useReducer } from "react";
import controller from "../utils/utils.js";

export const TodosContext = createContext(null);
export const TaskDispatchContext = createContext(null);

// const initTasks = [
// 	{id: 0, title: "Get milk", completed: false},
// 	{id: 1, title: "Play basketball", completed: false},
// 	{id: 2, title: "Study for exam", completed: false},
// ];

export function ToDoProvide({ children }) {
	const [todos, dispatch] = useReducer(tasksReducer, []);

	useEffect(() => {
		// controller.setupTable()
		// .then(() => {
		// 	// fetching data
		// 	controller.fetchData()
		// })
		// .catch((error) => {
		// 	console.log(`error while creating table :(`, error);
		// })
		// .then((responseTodos) => {
		// 	dispatch({
		// 		type: "set",
		// 		todos: responseTodos,
		// 	})

		(async function(){
			try {
				await controller.setupTable();
				const responseTodos = await controller.fetchData();
				dispatch({
					type: "set",
					todos: responseTodos,
				});
			} catch (error) {
				console.log("Error occurred during initial setup! Message:", error);
			}
		})();
		// on cleanup, just clear the list again
		return () => { dispatch({ type: "clear" }) };
	}, []);

	return (
		<TodosContext.Provider value={todos}>
			<TaskDispatchContext.Provider value={dispatch}>
				{children}
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