import React, { useEffect, useState } from "react";
import { Button } from "../pattern-library/Button";
import { InputField } from "../pattern-library/InputField";
import { Account } from "../APIrequests";
import { Loader } from "../pattern-library/Loader";
import { MyAlert } from "../pattern-library/MyAlert";

type LoginProps = {
    setIsLogin: Function,
    navigate: Function
}
  

export const Login = ({setIsLogin, navigate}: LoginProps) => {
    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<Boolean>(false)
    const [showInvalidAlert, setShowInvalidAlert] = useState(false)

    useEffect(() => {
        if (isLoading) {
            setShowInvalidAlert(false)
            if (!email.length || !password.length) {
                setIsLoading(false)
                setShowInvalidAlert(true)
            } else {
                const payload = {
                    email: email,
                    password: password
                }
                Account.reqLogin(payload).then(res => {
                    setIsLoading(false)
                    if (res.type === 'SUCCESS') {
                        navigate('/dashboard')
                    } else {
                        setEmail('')
                        setPassword('')
                        setShowInvalidAlert(true)
                    }
                })
            }
        }
    }, [isLoading])

    return (
        <>
            <div className="absolute w-full flex justify-center top-10 -ml-4" style={{zIndex: '999999'}}><MyAlert isVisible={showInvalidAlert} setInvisible={() => setShowInvalidAlert(false)} content="Login Credentials are Invalid!" severity="warning"/></div>
            <div className="flex justify-center h-full">
                <div className="my-auto px-24 py-5 h_xs:py-10 text-center bg-gray-100 rounded-xl shadow-xl w-login_signup border border-default1">
                    <label className="font-bold text-2xl mb-5 h_xs:mb-10">Login</label>
                    <div className="text-start mb-4 h_xs:mb-8">
                        <div className="mb-1 text-lg">Email</div>
                        <InputField value={email} setValue={setEmail} type=''/>
                    </div>
                    <div className="text-start mb-5 h_xs:mb-12">
                        <div className="mb-1 text-lg">Master Password</div>
                        <InputField type='password' value={password} setValue={setPassword}/>
                    </div>
                    <div className="flex gap-5 justify-center">
                        <Button value='Submit' disabled={isLoading} action={() => setIsLoading(true)}/>
                        {isLoading ? <Loader/> : <></>}
                    </div>
                    <div className="mt-5 h_xs:mt-10 text-sm">Don't have an account? <span className="text-default1 font-bold cursor-pointer" onClick={() => setIsLogin(false)}>Sign Up</span></div>
                </div>
            </div>
        </>
    );
}