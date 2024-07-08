/* eslint-disable */

function InputBar({ title, handleTitleChange, handleAddTask }) {
	return (
		<input className="
				w-80
				border-solid 
				border-black 
				px-2 py-2 
				text-black 
				rounded-tr rounded-br
				"
			id="taskInput"
			type="text"
			value={title}
			style={{ height: '40px' }}
			onChange={handleTitleChange}
			onKeyDown={(event) => {
				if (event.key === 'Enter') {
					handleAddTask();
				}
			}}
		/>)
}

export default InputBar