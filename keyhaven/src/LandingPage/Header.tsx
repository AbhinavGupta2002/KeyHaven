import React, {useEffect, useState} from "react";
import logo from '../img/logo1.png'
import logo1 from '../img/logo-bg-blank1.png'
import secureLogin from '../img/secureLogin.svg'
import { Login } from "./Login";
import { SignUp } from "./SignUp";
import { Account } from "../APIrequests";
import { RedirectDashboard } from "./RedirectDashboard";

interface HeaderProps {
    navigate: Function,
    isLoading: boolean,
    setIsLoading: Function
}

export const Header = (props: HeaderProps) => {
    const [isLogin, setIsLogin] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    useEffect(() => {
        Account.getLoggedIn().then(res => {
            if (res.type !== 'FAIL') {
                setIsLoggedIn(true)
            }
            props.setIsLoading(false)
        })
    }, [isLoggedIn]);

    return (
        !props.isLoading ?
            <div className="flex">
                <div className="bg-gray-200 h-screen w-full lg:w-1/2 flex-col flex px-4">
                    <img src={logo} className="max-w-xs xs:max-w-sm lg:hidden self-center mt-10 rounded-lg"/>
                    {isLoggedIn ?
                        <RedirectDashboard navigate={props.navigate}/> :
                        isLogin ? <Login setIsLogin={setIsLogin} navigate={props.navigate}/> : <SignUp setIsLogin={setIsLogin} navigate={props.navigate}/>
                    }
                </div>
                <div className="bg-default1 w-0 h-screen overflow-hidden lg:w-1/2">
                    <div className="flex justify-center mt-20">
                        <img src={logo1} className="w-1/2"/>
                    </div>
                    <div className="flex justify-center mt-32">
                        <div className="bg-gray-200 flex justify-center p-10 rounded-xl">
                            <img src={secureLogin} className="w-72"/>
                        </div>
                    </div>
                </div>
            </div>
        : <></>
    );
}