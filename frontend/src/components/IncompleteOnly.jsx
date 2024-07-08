/* eslint-disable */
import { useState } from "react";

function IncompleteOnly({ incompleteOnly, handleIncompleteOnly }) {	
	return (
		<div className="my-4 text-center align-text-top">
			<input
				className="mx-2"
				type="checkbox"
				name="incomplete-tasks-only"
				id="incompleteOnly"
				checked={incompleteOnly}
				onChange={() => handleIncompleteOnly()}

				style={{
					verticalAlign: "middle",
				}}
			/>
			<label htmlFor="incompleteOnly">Only Incomplete Tasks</label>
		</div>
	)
}

export default IncompleteOnly