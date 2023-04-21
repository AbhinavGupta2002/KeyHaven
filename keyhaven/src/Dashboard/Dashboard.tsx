import React, { useState } from "react";
import { Header } from "../pattern-library/Header";
import { Footer } from "../pattern-library/Footer";
import { NavBar } from "./NavBar";
import { DashboardBody } from "./DashboardBody";

export const Dashboard = () => {
    const [nav, setNav] = useState(0)
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