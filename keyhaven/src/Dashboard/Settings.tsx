import React, { useEffect, useState } from "react";
import defaultAvatar from '../img/default-avatar.svg'
import { Button } from "../pattern-library/Button";
import { BoxTypeA } from "../pattern-library/BoxTypeA";
import {FiEdit} from 'react-icons/fi'
import {GoCheck} from 'react-icons/go'
import {RxCross2} from 'react-icons/rx'
import { DeleteAccountDialog } from "./DeleteAccountDialog";
import { MyAlert } from "../pattern-library/Alert";
import { sendEmail } from "../APIrequests";

export const Settings = () => {
    const [isDisabled, setIsDisabled] = useState(true)
    const [isEditFirstName, setIsEditFirstName] = useState(false)
    const [isEditLastName, setIsEditLastName] = useState(false)
    const [firstName, setFirstName] = useState('Abhinav')
    const [lastName, setLastName] = useState('Gupta')
    const [prevFirstName, setPrevFirstName] = useState('')
    const [prevLastName, setPrevLastName] = useState('')
    const [showDeleteAccountDialog, setShowDeleteAccountDialog] = useState(false)
    const [showAlert, setShowAlert] = useState(false)

    useEffect(() => {isEditFirstName && setPrevFirstName(firstName)}, [isEditFirstName])
    useEffect(() => {isEditLastName && setPrevLastName(lastName)}, [isEditLastName])
    useEffect(() => {
        if (showAlert) {
            const req = {
                receiverID: 'abhinavgupta1882002@gmail.com',
                title: 'KeyHaven: Request to Change Master Password',
                content: 'Please click the following link to change your master password for the account linked to this email. If you did not request this, contact customer support immediately'
            }
            sendEmail(req)
        }
    }, [showAlert])

    return (
        <>
            <MyAlert isVisible={showAlert} setInvisible={() => setShowAlert(false)}/>
            <div className="text-2xl mb-9">Settings</div>
            <div className="ml-16 flex-col space-y-6">
                <BoxTypeA classname="flex-col space-y-4 w-96">
                    <div className="font-semibold text-center">Profile Image</div>
                    <img className="w-52 h-52 ml-auto mr-auto" src={defaultAvatar}/>
                    <div className="flex justify-between">
                        <Button disabled={isDisabled} value={'Set To Default'} action={() => {}}/>
                        <Button value={'Upload Image'} action={() => {}}/>
                    </div>
                </BoxTypeA>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <BoxTypeA classname="flex justify-between w-96">
                        <div className="font-semibold self-center">First Name</div>
                        {isEditFirstName ?
                            <input placeholder="Enter First Name" className="p-1 border border-gray-300 rounded-sm" value={firstName} onChange={e => setFirstName(e.target.value)}/> :
                            <div>{firstName}</div>
                        }
                    </BoxTypeA>
                    {isEditFirstName ?
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
                        {isEditLastName ?
                            <input placeholder="Enter Last Name" className="p-1 border border-gray-300 rounded-sm" value={lastName} onChange={e => setLastName(e.target.value)}/> :
                            <div>{lastName}</div>
                        }
                    </BoxTypeA>
                    {isEditLastName ?
                        <div className="flex gap-3 text-2xl">
                            <GoCheck className="cursor-pointer text-green-700" onClick={() => setIsEditLastName(false)}/>
                            <RxCross2 className="cursor-pointer text-red-700" onClick={() => {setIsEditLastName(false); setLastName(prevLastName);}}/>
                        </div> :
                        <FiEdit className="self-center cursor-pointer" onClick={() => setIsEditLastName(true)}/>
                    }
                </div>
                <BoxTypeA classname="flex justify-between w-96">
                    <div className="font-semibold">Email</div>
                    <div>saccomander@gmail.com</div>
                </BoxTypeA>
                <BoxTypeA classname="flex justify-between align-middle w-96">
                    <div className="font-semibold mt-2">Master Password</div>
                    <Button value='Change' action={() => setShowAlert(true)}/>
                </BoxTypeA>
                <Button classname='font-bold text-red-600' value='Delete Account' action={() => setShowDeleteAccountDialog(true)}/>
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