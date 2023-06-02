import React, { Children, ReactNode } from "react";

type BoxTypeAProps = {
    children: ReactNode
    classname?: String
}

export const BoxTypeA = (props: BoxTypeAProps) => {
    return (
        <div className={`bg-gray-100 border-gray-400 border p-2 rounded-md ${props.classname}`}>
            {props.children}
        </div>
    )
}