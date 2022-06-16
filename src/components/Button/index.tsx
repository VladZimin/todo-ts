import React from 'react'

type ButtonPropsType = {
    name: string
    callBack: () => void
    styleClass?: string
}

export const Button = (props: ButtonPropsType) => {
    const onClickHandler = () => {
        props.callBack()
    }

    return (<button className={props.styleClass} onClick={onClickHandler}>
        {props.name}
    </button>)
}
