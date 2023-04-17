import React, { useEffect, useState } from "react";
import { Button } from "../pattern-library/Button";
import { InputField } from "../pattern-library/InputField";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { reqLogin } from "../APIrequests";
import { Loader } from "../pattern-library/Loader";

type LoginProps = {
    setIsLogin: Function
  }
  

export const Login = ({setIsLogin}: LoginProps) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<Boolean>(false)
    const navigate: NavigateFunction = useNavigate()
    useEffect(() => {
        if (isLoading) {
            const payload = {
                email: email,
                password: password
            }
            Promise.resolve(reqLogin(payload)).then(res => {
                setIsLoading(false)
                res.type === 'SUCCESS' && navigate('/dashboard')
            })
        }
    }, [isLoading])
    return (
        <div className="flex justify-center h-full">
            <div className="my-auto px-24 py-10 text-center bg-gray-100 rounded-xl shadow-xl w-login_signup border border-default1">
                <div className="font-bold text-2xl mb-10">Login</div>
                <div className="text-start mb-8">
                    <div className="mb-1 text-lg">Email</div>
                    <InputField value={email} setValue={setEmail} type=''/>
                </div>
                <div className="text-start mb-12">
                    <div className="mb-1 text-lg">Master Password</div>
                    <InputField type='password' value={password} setValue={setPassword}/>
                </div>
                <div className="flex gap-5 justify-center">
                    <Button value='Submit' disabled={isLoading} action={() => setIsLoading(true)}/>
                    {isLoading ? <Loader/> : <></>}
                </div>
                <div className="mt-10 text-sm">Don't have an account? <span className="text-default1 font-bold cursor-pointer" onClick={() => setIsLogin(false)}>Sign Up</span></div>
            </div>
        </div>
    );
}