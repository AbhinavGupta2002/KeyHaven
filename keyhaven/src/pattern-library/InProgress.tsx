import React from "react";
import { BoxTypeA } from "./BoxTypeA";
import progress from '../img/progress.svg'

export const InProgress = () => {
    return (
        <BoxTypeA classname='flex flex-col gap-10 w-1/2 nav:w-1/3 ml-auto mr-auto mt-20 p-16'>
            <label className='font-semibold text-xl nav:text-3xl self-center text-center'>Work In Progress</label>
            <img src={progress} className='w-1/2bg-red-600 self-center'/>
        </BoxTypeA>
    )
}