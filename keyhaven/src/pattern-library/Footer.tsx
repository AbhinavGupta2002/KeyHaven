import React from "react";
import logo from '../img/logo-side-bg-blank1.png'
import { useNavigate } from "react-router-dom";

export const Footer = ({isAbsolute=false}) => {
    const navigate = useNavigate()

    return (
        <footer aria-label="Site Footer" className={`bg-default1 ${isAbsolute ? 'absolute bottom-0 w-full' : ''}`}>
            <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                <div className="flex justify-center sm:justify-start" onClick={() => navigate('/')}>
                    <img src={logo} className="w-56 cursor-pointer"/>
                </div>
                <p className="mt-4 text-center text-sm text-gray-400 md:mt-0">
                    <div>Copyright &copy; 2023. All rights reserved.</div>
                    <div className="mt-1">Developed by Abhinav Gupta.</div>
                </p>
                </div>
            </div>
        </footer>

    )
}