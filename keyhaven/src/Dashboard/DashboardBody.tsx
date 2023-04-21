import React from "react";
import PersonalAccounts from "./PersonalAccounts";


type DashboardBodyProps = {
    nav: number
}

export const DashboardBody = ({nav}: DashboardBodyProps) => {
    return (
        <div className="pt-20 pl-5">
            {nav === 0 ?
                <PersonalAccounts/>
                : <></>
            }
        </div>
    )
}