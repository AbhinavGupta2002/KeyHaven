import React from "react";

type ButtonProps = {
    value: String,
    action: Function
}

export const Button = (props: ButtonProps) => {
    return (
        <button type='submit' className="bg-gray-200 px-6 py-2 rounded-md border border-default1 hover:bg-gray-300 active:bg-gray-400" onClick={() => props.action()}>{props.value}</button>
    )
}