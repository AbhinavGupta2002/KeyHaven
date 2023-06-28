import React, { useEffect, useState } from "react";
import defaultAvatar from '../img/default-avatar.svg'
import { Button } from "../pattern-library/Button";
import { BoxTypeA } from "../pattern-library/BoxTypeA";
import {FiEdit} from 'react-icons/fi'
import {GoCheck} from 'react-icons/go'
import {RxCross2} from 'react-icons/rx'
import { DeleteAccountDialog } from "./DeleteAccountDialog";
import { MyAlert } from "../pattern-library/MyAlert";
import { Account, sendEmail } from "../APIrequests";
import { Skeleton, Tooltip } from "@mui/material";

interface Account {
    first_name: string,
    last_name: string,
    email: string,
    profile_image_url: string,
    joined: string,
    is_verified: boolean
}

const getCustomDate = (date: string): string => {
    const myDate = new Date(date)
    return `${myDate.getDate().toString().padStart(2, '0')}-${(myDate.getMonth() + 1).toString().padStart(2, '0')}-${myDate.getFullYear()}`
}

export const Settings = () => {
    const [isDisabled, setIsDisabled] = useState(true)
    const [isEditFirstName, setIsEditFirstName] = useState(false)
    const [isEditLastName, setIsEditLastName] = useState(false)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [prevFirstName, setPrevFirstName] = useState('')
    const [prevLastName, setPrevLastName] = useState('')
    const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false)
    const [showPassAlert, setShowPassAlert] = useState(false)
    const [showVerifyAlert, setShowVerifyAlert] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [profileURL, setProfileURL] = useState('')
    const [email, setEmail] = useState('')
    const [dateJoined, setDateJoined] = useState('')
    const [isVerified, setIsVerified] = useState(false)

    const setAccountDetails = (res: Account) => {
        setIsLoading(false)
        setFirstName(res.first_name)
        setLastName(res.last_name)
        setEmail(res.email)
        setProfileURL(res.profile_image_url)
        setDateJoined(getCustomDate(res.joined))
        setIsVerified(res.is_verified)
    }

    useEffect(() => {isEditFirstName && setPrevFirstName(firstName)}, [isEditFirstName])
    useEffect(() => {isEditLastName && setPrevLastName(lastName)}, [isEditLastName])
    useEffect(() => {
        if (showVerifyAlert) {
            const req = {
                receiverID: 'abhinavgupta1882002@gmail.com',
                title: 'KeyHaven: Request to Verify Account',
                content: 'Please click the following link to verify your account. If you did not request this, contact customer support immediately',
                type: 'verifyAccount'
            }
            sendEmail(req)
        }
    }, [showVerifyAlert])
    useEffect(() => {
        if (isLoading) {
            const reqAccount = Account.get({email: 'saccomander@gmail.com'})
            Promise.resolve(reqAccount).then(res => {
                setAccountDetails(res)
            })
        }
        if (showPassAlert) {
            const req = {
                receiverID: 'abhinavgupta1882002@gmail.com',
                title: 'KeyHaven: Request to Change Master Password',
                content: 'Please click the following link to change your master password for the account linked to this email. If you did not request this, contact customer support immediately',
                type: 'general'
            }
            sendEmail(req)
        }
    }, [showPassAlert, isLoading])

    return (
        <>
            <MyAlert isVisible={showPassAlert} setInvisible={() => setShowPassAlert(false)} content="An email has been sent to you to change the password!" severity="info"/>
            <MyAlert isVisible={showVerifyAlert} setInvisible={() => setShowVerifyAlert(false)} content="An email has been sent to you for verification!" severity="info"/>
            <div className="text-2xl mb-9">Settings</div>
            <div className="ml-16 space-x-40 flex">
                <div className="space-y-6">
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <BoxTypeA classname="flex justify-between w-96">
                            <div className="font-semibold self-center">First Name</div>
                            {isLoading ?
                                <Skeleton animation="wave" width={100}/> :
                                isEditFirstName ?
                                    <input placeholder="Enter First Name" className="p-1 border border-gray-300 rounded-sm" value={firstName} onChange={e => setFirstName(e.target.value)}/> :
                                    <div>{firstName}</div>
                            }
                        </BoxTypeA>
                        {isLoading ?
                            <></> :
                            isEditFirstName ?
                                <div className="flex gap-3 text-2xl">
                                    <GoCheck className="cursor-pointer text-green-700" onClick={() => setIsEditFirstName(false)}/>
                                    <RxCross2 className="cursor-pointer text-red-700" onClick={() => {setIsEditFirstName(false); setFirstName(prevFirstName);}}/>
                                </div> :
                                <FiEdit className="self-center cursor-pointer" onClick={() => setIsEditFirstName(!isEditFirstName)}/>
                        }
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <BoxTypeA classname="flex justify-between w-96">
                            <div className="font-semibold self-center">Last Name</div>
                            {isLoading ?
                                <Skeleton animation="wave" width={100}/> :
                                isEditLastName ?
                                    <input placeholder="Enter Last Name" className="p-1 border border-gray-300 rounded-sm" value={lastName} onChange={e => setLastName(e.target.value)}/> :
                                    <div>{lastName}</div>
                            }
                        </BoxTypeA>
                        {isLoading ?
                            <></> :
                            isEditLastName ?
                                <div className="flex gap-3 text-2xl">
                                    <GoCheck className="cursor-pointer text-green-700" onClick={() => setIsEditLastName(false)}/>
                                    <RxCross2 className="cursor-pointer text-red-700" onClick={() => {setIsEditLastName(false); setLastName(prevLastName);}}/>
                                </div> :
                                <FiEdit className="self-center cursor-pointer" onClick={() => setIsEditLastName(true)}/>
                        }
                    </div>
                    <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        <BoxTypeA classname="flex justify-between w-96">
                            <div className="font-semibold">Email</div>
                            {isLoading ?
                                <Skeleton animation="wave" width={100}/> :
                                <div>{email}</div>
                            }
                        </BoxTypeA>
                        {isLoading ?
                            <></> :
                            isVerified ?
                                <label className="text-green-600 font-bold">
                                    Verified
                                </label> :
                                <label className="text-red-600 font-bold cursor-pointer" onClick={() => setShowVerifyAlert(true)}>
                                    Verify
                                </label>
                        }
                    </div>
                    <BoxTypeA classname="flex justify-between align-middle w-96">
                        <div className="font-semibold mt-2">Master Password</div>
                        <Button disabled={isLoading} value='Change' action={() => setShowPassAlert(true)}/>
                    </BoxTypeA>
                    <BoxTypeA classname="flex justify-between w-96">
                        <div className="font-semibold">Date Joined</div>
                        {isLoading ?
                            <Skeleton animation="wave" width={100}/> :
                            <Tooltip
                                title='DD-MM-YYYY'
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
                                <div>{dateJoined}</div>
                            </Tooltip>
                        }
                    </BoxTypeA>
                    <Button disabled={isLoading} classname='font-bold text-red-600' value='Delete Account' action={() => setShowDeleteAccountDialog(true)}/>
                </div>
                <BoxTypeA classname="flex-col space-y-4 w-96 h-fit">
                    <div className="font-semibold text-center">Profile Image</div>
                    {isLoading ?
                        <Skeleton animation="wave" height={200} width={300} className="ml-auto mr-auto"/> :
                        <img className="w-52 h-52 ml-auto mr-auto" src={defaultAvatar}/>
                    }
                    <div className="flex justify-between">
                        <Button disabled={isLoading || isDisabled} value={'Set To Default'} action={() => {}}/>
                        <Button disabled={isLoading} value={'Upload Image'} action={() => {}}/>
                    </div>
                </BoxTypeA>
            </div>
            <DeleteAccountDialog isVisible={showDeleteAccountDialog} cancelAction={() => setShowDeleteAccountDialog(false)}/>
        </>
    )
}

/*
    profile image (default img should exist)
    first name (empty as default)
    last name (empty as default)
    [default full name is 'user']
    email (cannot change)
    master password (through OTP)
    delete account (dialog for confirmation and warning)
*/