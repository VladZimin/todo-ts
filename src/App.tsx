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
        {id: v4(), title: 'TSX', isDone: false}]
    )

    const [filterValue, setFilterValue] = React.useState<FilterValueType>('all')

    const addTask = (value: string) => {
        const newTask = {id: v4(), title: value, isDone: false}
        setTasks([newTask, ...tasks])
    }

    const changeTaskStatus = (id: string, isDone: boolean) => {
        const task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
            setTasks([...tasks])
        }
    }

    const removeTask = (id: string) => {
        setTasks(tasks.filter(obj => obj.id !== id))
    }

    const changeFilter = (value: FilterValueType) => {
        setFilterValue(value)
    }

    let tasksForToDoList = tasks

    if (filterValue === 'active') {
        tasksForToDoList = tasksForToDoList.filter(obj => !obj.isDone)
    }
    if (filterValue === 'completed') {
        tasksForToDoList = tasksForToDoList.filter(obj => obj.isDone)
    }

    return (
        <div className='App'>
            <Todolist
                title='What to learn'
                tasks={tasksForToDoList}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                filter={filterValue}
            />
        </div>
    )
}

export default App
