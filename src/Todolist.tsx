import React from 'react'
import {FilterValueType} from './App'

type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: number) => void
    changeFilter: (value: FilterValueType) => void
}

export function Todolist(props: PropsType) {
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input/>
            <button>+</button>
        </div>
        <ul>
            {
                props.tasks.map((el, i) => <li key={i}>
                    <button onClick={() => props.removeTask(el.id)}>X</button>
                    <input onChange={() => (console.log(1))} type="checkbox" checked={el.isDone}/>
                    <span>{el.title}</span>
                </li>)
            }
        </ul>
        <div>
            <button onClick={() => props.changeFilter('all')}>All</button>
            <button onClick={() => props.changeFilter('active')}>Active</button>
            <button onClick={() => props.changeFilter('completed')}>Completed</button>
        </div>
    </div>
}
