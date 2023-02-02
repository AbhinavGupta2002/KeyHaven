import React from "react";
import logo from '../img/logo1.png'
import secureLogin from '../img/secureLogin.svg'
import { Login } from "./Login";

export const LandingPage = () => {
    return (
        <div className="flex">
            <div className="bg-gray-200 w-1/2 h-screen">
                <Login/>
            </div>
            <div className="bg-default1 w-1/2 h-screen overflow-hidden">
                <div className="flex justify-center mt-14">
                    <img src={logo} className="w-custom1"/>
                </div>
                <div className="flex justify-center mt-32">
                    <div className="bg-gray-200 flex justify-center p-10 rounded-xl">
                        <img src={secureLogin} className="w-72"/>
                    </div>
                </div>
            </div>
        </div>
    )
}