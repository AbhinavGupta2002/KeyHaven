import React, { useEffect, useState } from "react"
import { Account } from "../APIrequests"
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import logo from '../img/logo-bg-blank1.png'
import { Loader } from "../pattern-library/Loader";
import { BoxTypeA } from "../pattern-library/BoxTypeA";

export const VerifyEmail = () => {
    const params = useParams<{ email: string, token: string }>();
    const [isVerifying, setIsVerifying] = useState(true)
    const [isVerified, setIsVerified] = useState(false)
    const nav = useNavigate()

    useEffect(() => {
        if (isVerifying) {
            Account.verifyEmail({email: params.email || '', token: params.token || ''}).then(res => {
                res.type === 'SUCCESS' && setIsVerified(true)
                setIsVerifying(false)
            })
        }
    }, [isVerifying])
    
    return (
        <div className="bg-default1 h-screen w-screen flex flex-col gap-40">
            <div className="flex justify-center">
                <img src={logo} className="w-1/5 h-fit mt-20 cursor-pointer" onClick={() => nav('/')}/>
            </div>
            <div className="flex justify-center">
                {isVerifying ? <Loader variant="secondary" size={120}/> :
                isVerified ?
                    <BoxTypeA classname='text-2xl'>Your account has been verified successfully! You can close this page now.</BoxTypeA> :
                    <BoxTypeA classname='text-2xl'>Email link is invalid</BoxTypeA>
                }
            </div>
        </div>
    )
}