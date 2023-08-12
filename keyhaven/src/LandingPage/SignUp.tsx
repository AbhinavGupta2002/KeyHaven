import React, { useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import { Button } from "../pattern-library/Button";
import { InputField } from "../pattern-library/InputField";
import { Account } from "../APIrequests";
import { Loader } from "../pattern-library/Loader";
import { MyAlert } from "../pattern-library/MyAlert";

type SignUpProps = {
    setIsLogin: Function,
    navigate: Function
}

export const SignUp = ({setIsLogin, navigate}: SignUpProps) => {
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
                Account.reqSignUp({email, password}).then(res => {
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
            <div className="absolute w-full flex justify-center top-10 -ml-4" style={{zIndex: '999999'}}><MyAlert isVisible={showInvalidAlert} setInvisible={() => setShowInvalidAlert(false)} content="Email is Already Taken!" severity="warning"/></div>
            <div className="flex justify-center h-full">
                <div className="my-auto px-24 py-5 h_xs:py-10 text-center bg-gray-100 rounded-xl shadow-xl w-login_signup border border-default1">
                    <label className="font-bold text-2xl mb-5 h_xs:mb-10">Sign Up</label>
                    <div className="text-start mb-4 h_xs:mb-8">
                        <div className="mb-1 text-lg">Email</div>
                        <InputField value={email} setValue={setEmail} type=''/>
                    </div>
                    <div className="text-start mb-5 h_xs:mb-12">
                        <Tooltip
                        title={<span className="text-lg">The master key is what you use to access everything else. Make sure to store this somewhere!</span>}
                        placement="bottom"
                        arrow
                        componentsProps={{
                            tooltip: {
                                sx: {
                                bgcolor: '#010536',
                                '& .MuiTooltip-arrow': {
                                    color: '#010536',
                                },
                                },
                            },
                        }}
                        >
                            <div className="mb-1 text-lg">Master Password</div>
                        </Tooltip>
                        <InputField type='password' value={password} setValue={setPassword}/>
                    </div>
                    <div className="flex gap-5 justify-center">
                        <Button value='Submit' disabled={isLoading} action={() => setIsLoading(true)}/>
                        {isLoading ? <Loader/> : <></>}
                    </div>
                    <div className="mt-5 h_xs:mt-10 text-sm">Already have an account? <span className="text-default1 font-bold cursor-pointer" onClick={() => setIsLogin(true)}>Login</span></div>
                </div>
            </div>
        </>
    );
}