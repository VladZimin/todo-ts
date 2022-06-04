import React, {ChangeEvent, KeyboardEvent, useState} from 'react'
import {FilterValueType} from './App'

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValueType) => void
    addTask: (value: string) => void
}

export function Todolist(props: PropsType) {

    const [inputValue, setInputValue] = useState('')

    const addTask = () => {
        if (inputValue) {
            props.addTask(inputValue)
        } else alert('Введите название таски :)')
        setInputValue('')
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value.trim())
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            addTask()
        }
    }
    const onClickAllHandler = () => props.changeFilter('all')
    const onClickActiveHandler = () => props.changeFilter('active')
    const onClickCompletedHandler = () => props.changeFilter('completed')

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                onChange={onChangeInputHandler}
                onKeyDown={onKeyDownHandler}
                value={inputValue}
                type='text'
                placeholder='Введите текст...'
            />
            <button onClick={addTask}>+</button>
        </div>
        <ul>
            {
                props.tasks.map( el => {
                    const onClickRemoveHandler = () => {props.removeTask(el.id)}
                     return <li key={el.id}>
                        <button onClick={onClickRemoveHandler}>X</button>
                        <input onChange={() => (console.log(1))} type="checkbox" checked={el.isDone}/>
                        <span>{el.title}</span>
                    </li>
                })
            }
        </ul>
        <div>
            <button onClick={onClickAllHandler}>All</button>
            <button onClick={onClickActiveHandler}>Active</button>
            <button onClick={onClickCompletedHandler}>Completed</button>
        </div>
    </div>
}
