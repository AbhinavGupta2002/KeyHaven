import React, { useEffect, useState } from "react";
import { Header } from "../pattern-library/Header";
import { Footer } from "../pattern-library/Footer";
import { NavBar } from "./NavBar";
import { DashboardBody } from "./DashboardBody";
import { useNavigate } from "react-router-dom";
import { Account } from "../APIrequests";

export const Dashboard = () => {
    const [nav, setNav] = useState(0)
    const pageNavigate = useNavigate()

    useEffect(() => {
        Account.getLoggedIn().then(res => {
            if (res.type === 'FAIL') {
                pageNavigate('/');
            }
        })
    }, []);
    
    return (
        <>
            <Header/>
            <div className="flex">
                <NavBar nav={nav} setNav={setNav}/>
                <DashboardBody nav={nav}/>
            </div>
            <Footer isAbsolute/>
        </>
    )
}