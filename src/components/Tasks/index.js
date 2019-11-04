import React from 'react'

import './style.css'

const Tasks = (props) => {
  // destructuring
  // could be more variables like { name, age, belt } = props
  const { tasks, changeTaskCard } = props

  // How to loop through data? 
  // We get the origial array, which is 'tasks' (coming from this.props.tasks)
  // then, we map through that array, we receive the individual task (1 for each index of the array)
  // then, we perform a function for each individual task and inside the function we return a bit of JSX
  // which we want to output for each individual task, so it cycles through those
  // stores that JSX in a NEW ARRAY CALLED 'taskList'
  // and finally, we output the 'taskList' at the div.task-list
  const taskList = tasks.map(task => {
    return (
      <li onClick={() => {changeTaskCard(task.id)}} key={task.id}>
        { task.taskName }
      </li>
    )
  })

  return (
    <ul className="task-list">
      { taskList }
    </ul >
  )
}

export default Tasks