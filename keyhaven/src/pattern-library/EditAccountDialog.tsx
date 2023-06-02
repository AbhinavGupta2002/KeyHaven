import { Dialog, DialogContent, DialogTitle, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "./Button";

import { RowDataModel, createRowData } from "../Dashboard/PersonalAccounts";
import { InputField } from "./InputField";

type EditAccountDialogProps = {
    isVisible: boolean,
    cancelAction: Function,
    confirmAction: Function,
    data: RowDataModel,
    updateData: Function
}

export const EditAccountDialog = (props: EditAccountDialogProps) => {
    const [title, setTitle] = useState(props.data.title)
    const [username, setUsername] = useState(props.data.username)
    const [password, setPassword] = useState(props.data.password)
    const [url, setUrl] = useState(props.data.url)
    const [iconUrl, setIconUrl] = useState(props.data.iconUrl)
    const [isEdited, setIsEdited] = useState(false)
    const [isNA, setIsNA] = useState(false)

    const resetInputs = () => {
        setTitle(props.data.title)
        setUsername(props.data.username)
        setPassword(props.data.password)
        setUrl(props.data.url)
        setIsEdited(false)
    }

    const setEdit = () => {
        setIsEdited(
            props.data.title === title && props.data.username === username
            && props.data.password === password && props.data.url === url
            )
    }

    useEffect(() => {
        setEdit()
    })

    return (
        <Dialog open={props.isVisible}>
            <DialogTitle>Edit Account</DialogTitle>
            <DialogContent className="flex flex-col gap-5 m-5">
                <img src={props.data.iconUrl} className="w-20 h-16 self-center object-contain"/>
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
                        resetInputs()
                    }}/>
                <Button
                    value='Confirm'
                    disabled={isEdited}
                    action={() => {
                        props.confirmAction()
                        props.updateData(props.data.title, createRowData(title, username, password, url, iconUrl))
                        setIsEdited(false)
                    }}/>
            </DialogContent>
        </Dialog>
    )
}