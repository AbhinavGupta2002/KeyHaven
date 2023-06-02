import { Dialog, DialogContent, DialogTitle, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { createRowData } from "../Dashboard/PersonalAccounts";
import { InputField } from "./InputField";
import { getIconUrl } from "../APIrequests";
import { isValidUrl } from "../function-library";

type AddAccountDialogProps = {
    isVisible: boolean,
    cancelAction: Function,
    confirmAction: Function,
    updateData: Function
}

export const AddAccountDialog = (props: AddAccountDialogProps) => {
    const [title, setTitle] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [url, setUrl] = useState('')
    const [iconUrl, setIconUrl] = useState('/favicon.ico')
    const [isEdited, setIsEdited] = useState(false)
    const [isNA, setIsNA] = useState(false)

    const clearInputs = () => {
        setTitle('')
        setUsername('')
        setPassword('')
        setUrl('')
        setIconUrl('/favicon.ico')
        setIsNA(false)
        setIsEdited(false)
    }

    const setEdit = () => {
        setIsEdited(title === '' && username === '' && password === '' && url === '')
    }

    const updateIconUrl = async () => {
        Promise.resolve(getIconUrl(url)).then(res => {
            console.log(res)
            if (res) {
                setIconUrl(res)
            } else {
                setIconUrl('/favicon.ico')
            }
        })
    }

    const isValidForm = () => {
        return isValidUrl(url)
    }

    useEffect(() => {
        setEdit()
    })

    useEffect(() => {
        updateIconUrl()
    }, [url])

    return (
        <Dialog open={props.isVisible}>
            <DialogTitle>Add Account</DialogTitle>
            <DialogContent className="flex flex-col gap-5 m-5">
                <img src={iconUrl} className="w-20 h-16 self-center object-contain"/>
                <div className="flex gap-2">
                    URL:
                    <InputField value={url} setValue={setUrl} type='info' infoValue='Make Sure to Add Http or Https'/>
                </div>
                <div className="flex gap-2">
                    Title:
                    <InputField value={title} setValue={setTitle}/>
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
                    action={() => {
                        props.cancelAction()
                        clearInputs()
                    }}/>
                <Button
                    value='Confirm'
                    disabled={isEdited}
                    action={() => {
                        if (!isValidForm()) {
                            return
                        }
                        props.updateData(createRowData(title, username, password, url, iconUrl))
                        props.confirmAction()
                        clearInputs()
                    }}/>
            </DialogContent>
        </Dialog>
    )
}