import React from "react";
import PersonalAccounts from "./PersonalAccounts";
import { Settings } from "./Settings";
import { useNavigate } from "react-router-dom";
import { InProgress } from "../pattern-library/InProgress";


type DashboardBodyProps = {
    nav: number,
    navigate: Function
}

export const DashboardBody = (props: DashboardBodyProps) => {

    return (
        <div className="pt-24 pl-5 w-full">
            {props.nav === 0 ?
                <PersonalAccounts navigate={props.navigate}/> :
            props.nav === 1 ?
                <InProgress/> :
            props.nav === 2 ?
                <InProgress/> :
            props.nav === 3 ?
                <Settings navigate={props.navigate}/> : <></>
            }
        </div>
    )
}