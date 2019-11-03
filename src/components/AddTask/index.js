import React from 'react'

import './style.css'

class AddTask extends React.Component {
  state = {
    taskName: null
  }

  handleChange = e => {
    this.setState({
      // [e.target.id] (when transpiled will be ['name']) below is a dynamic way
      // to use only one function to add into different properties of the array
      [e.target.id] : e.target.value
      // OR name: e.target.value because here I only have one input field
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.props.addTask(this.state)
  }
  
  render() {
    return (
      <form id="container-new-task" onSubmit={this.handleSubmit}>
        <label htmlFor="taskName">Task name:</label>
        <input type="text" id="taskName" onChange={this.handleChange}></input>

        <button id="btn-add-task"></button>
      </form>
    )
  }
}

export default AddTask