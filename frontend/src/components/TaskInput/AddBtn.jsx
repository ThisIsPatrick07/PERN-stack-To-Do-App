/* eslint-disable */
function AddBtn({ handleAddTask }) {
	return (
		<button
			className="
					text-white 
					bg-blue-700
					px-4 py-2 
					rounded-tl-xl rounded-bl-xl 
					border-white
					font-semibold
					"
			style={{ height: '40px' }}
			onClick={() => { handleAddTask() }}
		>
			Add
		</button>
	)
}

export default AddBtn