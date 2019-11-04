import React from 'react';
import AddTask from './components/AddTask'
import Tasks from './components/Tasks'

import './style.css'

class App extends React.Component {
  state = {
    idNumber: 0,// global property that controls the value of the id's
    tasksTODO: [],
    tasksDOING: [],
    tasksDONE: []
  }

  idGenerator = (task, letterCode) => {
    // format: x = for card-todo, y = card-doing, z = card-done + idNumber => x0, x1, ..., xN
    task.id = letterCode + this.state.idNumber

    // increment idNumber value by 1
    this.setState({
      idNumber: this.state.idNumber + 1
    })
  }

  // used to communicate from child to parent
  // change the state of parent based on the new task coming from the child (./AddTask)
  addTask = (task, letterCode) => {
    // generate a different ID every time
    this.idGenerator(task, letterCode)

    // the right way to change the state in this case is to:
    // first, create a copy of the current array, so we are not editing it
    // second, add the task to the copy of that array
    // third, and then take that new array and asign to this thing below
    // this way, we will be changing the state INSIDE the setState method and that is good practice
    let tasksTODO = [...this.state.tasksTODO, task]

    this.setState({
      tasksTODO: tasksTODO
    })
  }

  // change the task from one card to the other, or remove if it is the last one
  changeTaskCard = (id) => {
    let newTask = null

    if (id[0] === 'x') {
      console.log('todo -> doing')
      // filter out the task with the corresponding id at the origin card
      let tasksTODO = this.state.tasksTODO.filter(task => {
        // get the task name based on the id
        if (task.id === id) {
          newTask = task
        }
        return task.id !== id
      })
      // add the task to the correct card with the new card id, which in this case is DOING
      this.idGenerator(newTask, 'y')
      // create new array with the newly added task
      let tasksDOING = [...this.state.tasksDOING, newTask]
      // update state of the cards that were modified
      this.setState({
        tasksTODO: tasksTODO,
        tasksDOING: tasksDOING
      })
    }
    else if (id[0] === 'y') {
      console.log('doing -> done')
      // filter out the task with the corresponding id at the origin card
      let tasksDOING = this.state.tasksDOING.filter(task => {
        // get the task name based on the id
        if (task.id === id) {
          newTask = task
        }
        return task.id !== id
      })
      // add the task to the correct card with the new card id, which in this case is DOING
      this.idGenerator(newTask, 'z')
      // create new array with the newly added task
      let tasksDONE = [...this.state.tasksDONE, newTask]
      // update state of the cards that were modified
      this.setState({
        tasksDOING: tasksDOING,
        tasksDONE: tasksDONE
      })
    }
    else if (id[0] === 'z') {
      // filter out the task with the corresponding id
      let tasksDONE = this.state.tasksDONE.filter(task => { return task.id !== id })

      this.setState({
        tasksDONE: tasksDONE
      })
    }
  }

  render() {
    return (
      <div className="App">
        <header id="main-header">
          <h1>uTask</h1>
          
          <AddTask addTask={this.addTask} />
        </header>

        <div id="interface">
          <section id="container-cards">
            {/* CARD TO DO */}
            <div id="card-todo" className="cards">
              <div className="inner-card">
                <div className="card-title">
                  <h2>To Do</h2>
                </div>

                {/* returns an UL .task-list filled with the tasks items as LIs */}
                <Tasks changeTaskCard={this.changeTaskCard} tasks={this.state.tasksTODO} />
              </div>
            </div>

            {/* CARD DOING */}
            <div id="card-doing" className="cards">
              <div className="inner-card">
                <div className="card-title">
                  <h2>Doing</h2>
                </div>

                {/* returns an UL .task-list filled with the tasks items as LIs */}
                <Tasks changeTaskCard={this.changeTaskCard} tasks={this.state.tasksDOING} />
              </div>
            </div>

            {/* CARD DONE */}
            <div id="card-done" className="cards">
              <div className="inner-card">
                <div className="card-title">
                  <h2>Done</h2>
                </div>

                {/* returns an UL .task-list filled with the tasks items as LIs */}
                <Tasks changeTaskCard={this.changeTaskCard} tasks={this.state.tasksDONE} />
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default App;
