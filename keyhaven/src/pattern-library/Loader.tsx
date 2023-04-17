import React from "react";
import {SpinnerCircular} from 'spinners-react'

export const Loader = () => {
    return <SpinnerCircular size={30} thickness={100} speed={100} color="rgba(255, 255, 0, 1)" secondaryColor="rgba(1, 5, 54, 1)"/>
}