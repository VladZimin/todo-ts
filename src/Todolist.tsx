import React, {ChangeEvent, KeyboardEvent, useState} from 'react'

import {FilterValueType} from './App'
import {Button} from './components/Button'


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
    changeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValueType
}

export function Todolist(props: PropsType) {

    const [inputValue, setInputValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const addTask = () => {
        if (inputValue.trim() !== '') {
            props.addTask(inputValue.trim())
        } else {
            setError('Title is required!')
        }
        setInputValue('')
    }
    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        setError(null)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            addTask()
        }
    }
    const onClickFilterTasksHandler = (value: FilterValueType) => props.changeFilter(value)

    const renderedTasksList = props.tasks.map(el => {
        const onClickRemoveHandler = () => {
            props.removeTask(el.id)
        }
        const onChangeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(el.id, e.currentTarget.checked)
        }

        return <li key={el.id}>
            <Button name={'x'} callBack={onClickRemoveHandler}/>
            <input onChange={onChangeTaskStatusHandler} type='checkbox' checked={el.isDone}/>
            <span className={el.isDone ? 'is-done' : ''}>{el.title}</span>
        </li>
    })

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                className={error ? 'error' : ''}
                onChange={onChangeInputHandler}
                onKeyDown={onKeyDownHandler}
                value={inputValue}
                type='text'
                placeholder='Введите текст...'
            />
            <Button name={'+'} callBack={addTask}/>
            {error && <div className='error-message'>{error}</div>}
        </div>
        <ul>
            {renderedTasksList}
        </ul>
        <div>
            <Button name={'All'} callBack={() => onClickFilterTasksHandler('all')}
                    styleClass={props.filter === 'all' ? 'active-filter' : ''}/>
            <Button name={'Active'} callBack={() => onClickFilterTasksHandler('active')}
                    styleClass={props.filter === 'active' ? 'active-filter' : ''}/>
            <Button name={'Completed'} callBack={() => onClickFilterTasksHandler('completed')}
                    styleClass={props.filter === 'completed' ? 'active-filter' : ''}/>
        </div>
    </div>
}
