import React from "react";
import PersonalAccounts from "./PersonalAccounts";
import { Settings } from "./Settings";


type DashboardBodyProps = {
    nav: number
}

export const DashboardBody = ({nav}: DashboardBodyProps) => {
    return (
        <div className="pt-24 pl-5 w-full">
            {nav === 0 ?
                <PersonalAccounts/> :
            nav === 3 ? 
                <Settings/> : <></>
            }
        </div>
    )
}