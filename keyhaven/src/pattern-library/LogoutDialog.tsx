import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";
import { Account } from "../APIrequests";

type DeleteDialogProps = {
    isVisible: boolean,
    cancelAction: Function
}

export const LogoutDialog = (props: DeleteDialogProps) => {
    const [isLoading, setIsLoading] = useState(false)
    const nav = useNavigate()

    useEffect(() => {
        if (isLoading) {
            Account.reqLogout().then(res => {
                setIsLoading(false)
                nav('/')
            })
        }
    }, [isLoading])

    return (
        <Dialog open={props.isVisible}>
            <DialogTitle className="text-center sm:text-left">Account Logout</DialogTitle>
            <DialogContent className="text-center sm:text-left">
                Are you sure you want to log out of your account?
            </DialogContent>
            <DialogContent className="flex gap-12 justify-center">
                <Button value='Cancel' action={() => props.cancelAction()} disabled={isLoading}/>
                <Button value='Confirm' action={() => setIsLoading(true)} disabled={isLoading}/>
            </DialogContent>
        </Dialog>
    )
}