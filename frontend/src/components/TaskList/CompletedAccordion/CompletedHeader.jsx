/* eslint-disable */
function CompletedHeader({ handleOpen, isEmpty }) {
	return (
	  <button
		className={`w-full
					bg-sky-600 text-green-200 
					px-2 py-2 
					rounded-lg 
					border-2 border-transparent
					${isEmpty ? "hover:cursor-not-allowed" : `hover:cursor-pointer 
															 hover:bg-sky-500 
															 hover:border-blue-700
															 active:bg-sky-600`}
					font-mono
					text-center
					text-xl`}
		onClick={handleOpen}
		disabled={isEmpty}
	  >
		{!isEmpty 
		  ? <h2>Completed</h2>
		  : <h2>No Tasks completed yet!</h2>
		}
	  </button>
	)
  }
  
  export default CompletedHeader;
  