/* eslint-disable */
import { useContext } from "react";
import { TasksRemainingContext } from "../ToDoProvide/ToDoProvide";

function RemainingTaskCounter({ todosEmpty }) {
	const { tasksRemaining } = useContext(TasksRemainingContext);

	function getDisplayMessage(tasksRemaining) {

		let displayMessage;

		if (todosEmpty) {
			displayMessage = (<p>Add some tasks to get started! <span>☝️</span></p>)
		}

		else if (tasksRemaining === 0) {
			displayMessage = (<p>Hurray! All tasks completed! <span>🥳</span></p>);
		} else if (tasksRemaining <= 3) {
			if (tasksRemaining === 1) {
				displayMessage = (<><span className="text-red-300">{tasksRemaining}</span> Task remaining (Almost There!)</>)
			} else {
				displayMessage = (<><span className="text-red-300">{tasksRemaining}</span> Tasks remaining (Almost There!)</>)
			}
		} else {
			displayMessage = (<><span className="text-red-300">{tasksRemaining}</span> Tasks remaining</>);
		}

		return displayMessage;
	}

	return (
		<div
			className="mx-auto text-2xl text-sky-400 font-mono text-center"
		>
			{getDisplayMessage(tasksRemaining)}
		</div>
	)
}

export default RemainingTaskCounter