/* eslint-disable react/prop-types */ // TODO: upgrade to latest eslint tooling

import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import TaskInput from "./components/TaskInput/TaskInput";
import TaskList from "./components/TaskList";
import { ToDoProvide } from "./components/ToDoProvide";

export default function App() {
	return (
		<ToDoProvide>
			<Main>
				<Header />
				<TaskInput />
				<TaskList />
			</Main>
		</ToDoProvide>
	)
}