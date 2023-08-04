import { Dialog, DialogContent, DialogTitle, Input } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "./Button";

import { RowDataModel, createRowData } from "../Dashboard/PersonalAccounts";
import { InputField } from "./InputField";
import { checkBearerTokenExpiry, isValidUrl } from "../common-library";
import { MyAlert } from "./MyAlert";
import { PasswordAccount, getIconUrl } from "../APIrequests";

type EditAccountDialogProps = {
    isVisible: boolean,
    cancelAction: Function,
    confirmAction: Function,
    data: RowDataModel,
    updateData: Function,
    checkTitleIsUnique: Function,
    navigate: Function
}

export const EditAccountDialog = (props: EditAccountDialogProps) => {
    const [title, setTitle] = useState(props.data.title)
    const [username, setUsername] = useState(props.data.username)
    const [password, setPassword] = useState(props.data.password)
    const [url, setUrl] = useState(props.data.url)
    const [iconUrl, setIconUrl] = useState(props.data.iconUrl)
    const [isStatic, setIsStatic] = useState(true)
    const [isNA, setIsNA] = useState(props.data.username.length === 0)
    const [IsVisibleAlert, setIsVisibleAlert] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)

    const resetInputs = () => {
        setTitle(props.data.title)
        setUsername(props.data.username)
        setPassword(props.data.password)
        setUrl(props.data.url)
        setIsNA(props.data.username.length === 0)
        !isStatic && setIsStatic(true)
        IsVisibleAlert && setIsVisibleAlert(false)
        isUpdating && setIsUpdating(false)
    }

    const setStatic = () => {
        setIsStatic(
            props.data.title === title && props.data.username === username
            && props.data.password === password && props.data.url === url
            )
    }
    
    const isValidForm = (): boolean => {
        return isValidUrl(url) && title.length !== 0 && password.length !== 0 && (username.length !== 0 || isNA) && props.checkTitleIsUnique(title, true, props.data.title)
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

    useEffect(() => {
        setStatic()
    }, [title, username, password, url])

    useEffect(() => {
        updateIconUrl()
    }, [url])

    useEffect(() => {
        isUpdating &&
        PasswordAccount.put({title, prevTitle: props.data.title, username, password, url, iconUrl: iconUrl ?? ''}).then(res => {
            if (checkBearerTokenExpiry(res)) {
                props.navigate('/')
            } else {
                props.confirmAction()
                props.updateData(props.data.title, createRowData(title, username, password, url, iconUrl))
                setIsStatic(false)
                setIsUpdating(false)
            }
        })
    }, [isUpdating])

    return (
        <>
            <div className='absolute flex justify-center top-20 left-1/2 right-1/2' style={{zIndex: '99999'}}><MyAlert content='Please enter all mandatory details in the valid manner!' isVisible={IsVisibleAlert} setInvisible={() => setIsVisibleAlert(false)} severity='warning'/></div>
            <Dialog open={props.isVisible}>
                <DialogTitle>Edit Account</DialogTitle>
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
                            resetInputs()
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