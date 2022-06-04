import React from 'react'
import './App.css'
import {Todolist} from './Todolist'

export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = React.useState([
            {id: 1, title: 'HTML&CSS', isDone: true},
            {id: 2, title: 'JS', isDone: true},
            {id: 3, title: 'ReactJS', isDone: false},
            {id: 4, title: 'TSX', isDone: false}
        ]
    )

    const [filterValue, setFilterValue] = React.useState('all')

    const removeTask = (id: number) => {
        setTasks(tasks.filter(obj => obj.id !== id))
    }

    const changeFilter = (value: FilterValueType) => {
        setFilterValue(value)
        console.log(value)
    }

    let tasksForToDoList = tasks

    if (filterValue === 'active') {
        tasksForToDoList = tasksForToDoList.filter(obj => !obj.isDone)
    }
    if (filterValue === 'completed') {
        tasksForToDoList = tasksForToDoList.filter(obj => obj.isDone)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasksForToDoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}

export default App
