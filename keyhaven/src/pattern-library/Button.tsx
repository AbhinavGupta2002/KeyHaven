import React from "react";

type ButtonProps = {
    value: String,
    action: Function,
    disabled: Boolean
}

export const Button = (props: ButtonProps) => {
    return (
        <button type="submit" disabled={props.disabled ? true : false} className={`${props.disabled ? 'bg-gray-300 text-gray-500' : 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400'} px-6 py-2 rounded-md border border-default1`} onClick={() => props.action()}>{props.value}</button>
    )
}