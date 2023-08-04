import { Dialog, DialogContent, DialogTitle, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { createRowData } from "../Dashboard/PersonalAccounts";
import { InputField } from "./InputField";
import { PasswordAccount, getIconUrl } from "../APIrequests";
import { checkBearerTokenExpiry, isValidUrl } from "../common-library";
import { MyAlert } from "./MyAlert";

type AddAccountDialogProps = {
    isVisible: boolean,
    cancelAction: Function,
    confirmAction: Function,
    checkTitleIsUnique: Function,
    updateData: Function,
    navigate: Function
}

export const AddAccountDialog = (props: AddAccountDialogProps) => {
    const [title, setTitle] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [url, setUrl] = useState('')
    const [iconUrl, setIconUrl] = useState('/favicon.ico')
    const [isStatic, setIsStatic] = useState(true)
    const [isNA, setIsNA] = useState(false)
    const [IsVisibleAlert, setIsVisibleAlert] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    const clearInputs = () => {
        setTitle('')
        setUsername('')
        setPassword('')
        setUrl('')
        setIconUrl('/favicon.ico')
        isNA && setIsNA(false)
        !isStatic && setIsStatic(true)
        IsVisibleAlert && setIsVisibleAlert(false)
        isUpdating && setIsUpdating(false)
    }

    const setStatic = () => {
        setIsStatic(title === '' && username === '' && password === '' && url === '')
    }

    const updateIconUrl = async () => {
        url.length &&
        Promise.resolve(getIconUrl(url)).then(res => {
            if (res) {
                setIconUrl(res)
            } else {
                setIconUrl('/favicon.ico')
            }
        })
    }

    const isValidForm = (): boolean => {
        return isValidUrl(url) && title.length !== 0 && password.length !== 0 && (username.length !== 0 || isNA) && props.checkTitleIsUnique(title)
    }

    useEffect(() => {
        setStatic()
    }, [title, username, password, url])

    useEffect(() => {
        updateIconUrl()
    }, [url])

    useEffect(() => {
        isUpdating &&
        PasswordAccount.post({title, username, password, url, iconUrl}).then(res => {
            if (checkBearerTokenExpiry(res)) {
                props.navigate('/')
            } else {
                props.updateData(createRowData(title, username, password, url, iconUrl))
                props.confirmAction()
                clearInputs()
            }
        })
    }, [isUpdating])

    return (
        <>
            <div className='top-20 left-1/2 right-1/2 flex justify-center absolute' style={{zIndex: '99999'}}><MyAlert content='Please enter all mandatory details in the valid manner!' isVisible={IsVisibleAlert} setInvisible={() => setIsVisibleAlert(false)} severity='warning'/></div>
            <Dialog open={props.isVisible} className="-z-20">
                <DialogTitle>Add Account</DialogTitle>
                <DialogContent className="flex flex-col gap-5 m-5">
                    <img src={iconUrl} className="w-20 h-16 self-center object-contain"/>
                    <div className="flex gap-2">
                        URL:
                        <InputField value={url} setValue={setUrl} type='info' infoValue='Make Sure to Add Http or Https'/>
                    </div>
                    <div className="flex gap-2">
                        Title:
                        <InputField value={title} setValue={setTitle} type='info' infoValue='Duplicate Titles are not Allowed'/>
                    </div>
                    <div className="flex gap-2">
                        Username:
                        <InputField value={username} setValue={setUsername} isDisabled={isNA} setIsDisabled={setIsNA} type='NA'/>
                    </div>
                    <div className="flex gap-2">
                        Password:
                        <InputField value={password} setValue={setPassword} type='password'/>
                    </div>
                </DialogContent>
                <DialogContent className="flex gap-12 justify-center">
                    <Button
                        value='Cancel'
                        disabled={isUpdating}
                        action={() => {
                            props.cancelAction()
                            clearInputs()
                        }}/>
                    <Button
                        value='Confirm'
                        disabled={isStatic || isUpdating}
                        action={() => {
                            if (!isValidForm()) {
                                setIsVisibleAlert(true)
                                return
                            }
                            setIsUpdating(true)
                        }}/>
                </DialogContent>
            </Dialog>
        </>
    )
}