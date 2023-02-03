import React, {useState} from "react";
import logo from '../img/logo1.png'
import logo1 from '../img/logo-bg-blank1.png'
import secureLogin from '../img/secureLogin.svg'
import { Login } from "./Login";
import { SignUp } from "./SignUp";

export const Header = () => {
    const [isLogin, setIsLogin] = useState<Boolean>(false)
    return (
        <div className="flex">
            <div className="bg-gray-200 w-1/2 h-screen">
                {isLogin ? <Login setIsLogin={setIsLogin}/> : <SignUp setIsLogin={setIsLogin}/>}
            </div>
            <div className="bg-default1 w-1/2 h-screen overflow-hidden">
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
    );
}