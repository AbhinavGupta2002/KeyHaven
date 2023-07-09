import { useNavigate, useParams } from "react-router-dom";
import logo from '../img/logo-bg-blank1.png'
import React, { useEffect, useState } from "react";
import { BoxTypeA } from "../pattern-library/BoxTypeA";
import { InputField } from "../pattern-library/InputField";
import { Button } from "../pattern-library/Button";
import { Account } from "../APIrequests";
import { Loader } from "../pattern-library/Loader";
import { MyAlert } from "../pattern-library/MyAlert";

export const ChangeMasterPassword = () => {
    const [password, setPassword] = useState('')
    const [isVerified, setIsVerified] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [isSucceeded, setIsSucceeded] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [showAlert, setShowAlert] = useState(false)
    const params = useParams<{ email: string, token: string }>();
    const nav = useNavigate()

    useEffect(() => {
        if (isLoading) {
            Account.checkMasterPasswordChange({email: params.email || '', token: params.token || ''}).then(res => {
                res.type === 'SUCCESS' && setIsVerified(true)
                setIsLoading(false)  
            })
        }
    }, [isLoading])

    useEffect(() => {
        if (isSubmitted) {
            if (!password.length) {
                setShowAlert(true)
                setIsSubmitted(false)
            } else {
                Account.changeMasterPassword({email: params.email || '', token: params.token || '', password}).then(res => {
                    res.type === 'SUCCESS' && setIsSucceeded(true)
                })
            }
        }
    }, [isSubmitted])

    return (
        <div className="bg-default1 h-screen w-screen flex flex-col gap-20 text-center">
            <div className="absolute w-full flex justify-center top-5" style={{zIndex: '999999'}}><MyAlert content="The New Password Entered is Invalid!" severity="warning" isVisible={showAlert} setInvisible={() => setShowAlert(false)}/></div>
            <div className="flex justify-center">
                <img src={logo} className="w-1/5 h-fit mt-20 cursor-pointer" onClick={() => nav('/')}/>
            </div>
            <div className="flex justify-center">
                {isLoading ?
                    <Loader variant="secondary" size={120}/>
                    :
                    isVerified ?
                        isSucceeded ?
                            <BoxTypeA classname='text-2xl'>Your account's master password has been changed successfully! You can close this page now.</BoxTypeA>
                            :
                            <BoxTypeA classname="flex flex-col gap-4">
                                <div>Enter New Password</div>
                                <InputField type="password" value={password} setValue={setPassword}/>
                                <Button value='Submit' action={() => setIsSubmitted(true)} disabled={isSubmitted}/>
                            </BoxTypeA>
                        :
                        <BoxTypeA classname='text-2xl'>Email link is invalid</BoxTypeA>
                }
            </div>
        </div>
    )
}