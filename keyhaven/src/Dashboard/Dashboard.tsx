import React, {useState} from "react";
import { Header } from "../pattern-library/Header";
import { Footer } from "../pattern-library/Footer";
import { NavBar } from "./NavBar";
import { DashboardBody } from "./DashboardBody";

export const Dashboard = () => {
    return (
        <>
            <Header/>
            <div className="flex">
                <NavBar/>
                <DashboardBody/>
            </div>
            <Footer isAbsolute/>
        </>
    )
}