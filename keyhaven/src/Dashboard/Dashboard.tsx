import React, { useEffect, useState } from "react";
import { Header } from "../pattern-library/Header";
import { Footer } from "../pattern-library/Footer";
import { NavBar } from "./NavBar";
import { DashboardBody } from "./DashboardBody";
import { useNavigate } from "react-router-dom";
import { Account } from "../APIrequests";

export const Dashboard = () => {
    const [nav, setNav] = useState(0)
    const navigate = useNavigate()
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        !isLoggedIn && Account.getLoggedIn().then(res => {
            if (res.type === 'FAIL') {
                navigate('/');
            } else {
                setIsLoggedIn(true)
            }
        })
    }, [isLoggedIn]);
    
    return (
        isLoggedIn ?
        <>
            <Header/>
            <div className="flex">
                <NavBar nav={nav} setNav={setNav}/>
                <DashboardBody nav={nav} navigate={navigate}/>
            </div>
            <Footer isAbsolute/>
        </> : <></>
    )
}