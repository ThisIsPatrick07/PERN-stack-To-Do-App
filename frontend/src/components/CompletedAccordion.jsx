/* eslint-disable */

import { useEffect, useState } from "react"
import Task from "./Task";
import CompletedHeader from "./CompletedHeader";
import CompletedTasks from "./CompletedTasks";

function CompletedAccordion({ completedTasks, todosEmpty }) {
	const isEmpty = completedTasks.length === 0;
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() =>{
		if(todosEmpty){
			setIsOpen(false);
		}
	}, [todosEmpty]);

	function handleOpen(){
		setIsOpen(!isOpen);
	}

	// console.log(isOpen);
	return (
		<div>
			{!todosEmpty && <CompletedHeader handleOpen={handleOpen} isEmpty={isEmpty} />}
			{!isEmpty && isOpen && <CompletedTasks completedTasks={completedTasks} />}
		</div>
	)
}

export default CompletedAccordion