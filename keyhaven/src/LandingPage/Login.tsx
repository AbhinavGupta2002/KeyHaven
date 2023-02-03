import React from "react";
import { Button } from "../pattern-library/Button";

type LoginProps = {
    setIsLogin: Function
  }
  

export const Login = ({setIsLogin}: LoginProps) => {
    return (
        <div className="flex justify-center h-full">
            <div className="my-auto px-24 py-10 text-center bg-gray-100 rounded-xl shadow-xl w-login_signup border border-default1">
                <form>
                    <div className="font-bold text-2xl mb-10">Login</div>
                    <div className="text-start mb-8">
                        <div className="mb-1 text-lg">Email</div>
                        <input className="px-2 py-1 rounded-sm border-default1 border bg-gray-200 w-full text-sm"/>
                    </div>
                    <div className="text-start mb-12">
                        <div className="mb-1 text-lg">Master Password</div>
                        <input className="px-2 py-1 rounded-sm border-default1 border bg-gray-200 w-full text-sm" type='password'/>
                    </div>
                    <Button value='Submit' action={() => null}/>
                </form>
                <div className="mt-10">Don't have an account? <span className="text-default1 font-bold cursor-pointer" onClick={() => setIsLogin(false)}>Sign Up</span></div>
            </div>
        </div>
    );
}