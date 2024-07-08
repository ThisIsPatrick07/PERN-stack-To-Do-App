/* eslint-disable */
import Task from "./Task"

function IncompleteTasks({ incompleteTasks }) {
	return (
		<div>
			<ul className="w-full my-10">
				{incompleteTasks.map(todo => (
					(<li key={todo.id}>
						<Task
							todo={todo}
							id={todo.id}
						/>
					</li>)
				))}
			</ul>
		</div>
	)
}

export default IncompleteTasks