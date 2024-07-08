/* eslint-disable */
import Task from "./Task"

function CompletedTasks({ completedTasks }) {
	return (
		<div>
			{
				<ul className="w-full my-2">
					{completedTasks.map(todo => (
						(<li key={todo.id}>
							<Task
								todo={todo}
								id={todo.id}
							/>
						</li>)
					))}
				</ul>
			}
		</div>)
}

export default CompletedTasks