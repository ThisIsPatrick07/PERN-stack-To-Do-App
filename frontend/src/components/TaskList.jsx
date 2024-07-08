/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling
import { useContext } from "react";
import { TodosContext } from "./ToDoProvide";
import CompletedAccordion from "./CompletedAccordion";
import IncompleteTasks from "./IncompleteTasks";
import RemainingTaskCounter from "./RemainingTaskCounter";

export default function TaskList() {
	const todos = useContext(TodosContext);

	const todosEmpty = todos.length === 0;	
	const incompleteTasks = todos.filter(todo => !(todo.completed))
	const completedTasks = todos.filter(todo => todo.completed);

	return (
		<div>
			<RemainingTaskCounter todosEmpty={todosEmpty} />
			<IncompleteTasks incompleteTasks={incompleteTasks} />
			<CompletedAccordion completedTasks={completedTasks} todosEmpty={todosEmpty} />
		</div>
	);
}