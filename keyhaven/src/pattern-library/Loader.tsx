import React from "react";
import {SpinnerCircular} from 'spinners-react'

interface LoaderProps {
    variant?: string;
    size?: number;
}

export const Loader = (props: LoaderProps) => {
    return <SpinnerCircular size={props.size ?? 30} thickness={100} speed={100} color="rgba(255, 255, 0, 1)" secondaryColor={props.variant === 'secondary' ? 'gray' : 'rgba(1, 5, 54, 1)'}/>
}