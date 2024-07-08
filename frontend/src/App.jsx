/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import { ToDoProvide } from "./components/ToDoProvide";

export default function App() {
	return (
		<ToDoProvide>
			<div className="w-full max-w-md mx-auto">
				<h1 className="mx-auto my-8 text-center text-6xl font-mono">
					To-Do List
				</h1>
				<div className="w-full justify-center flex flex-wrap">
					<TaskInput					/>
				</div>
				<div className="w-full flex-wrap my-5">
					<TaskList/>
				</div>
			</div>
		</ToDoProvide>
	)
}