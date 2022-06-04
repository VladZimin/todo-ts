import React from 'react'
import './App.css'
import {Todolist} from './Todolist'
import {v4} from 'uuid'


export type FilterValueType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = React.useState([
            {id: v4(), title: 'HTML&CSS', isDone: true},
            {id: v4(), title: 'JS', isDone: true},
            {id: v4(), title: 'ReactJS', isDone: false},
            {id: v4(), title: 'TSX', isDone: false}
        ]
    )

    const [filterValue, setFilterValue] = React.useState('all')

    const addTask = (value: string) => {
        const newTask = {id: v4(), title: value, isDone: false}
        console.log(newTask)
        setTasks([newTask, ...tasks])
    }

    const removeTask = (id: string) => {
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
                addTask={addTask}
            />
        </div>
    )
}

export default App
