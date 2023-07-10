import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "../pattern-library/Button";
import { useNavigate } from "react-router-dom";
import { Account } from "../APIrequests";

type DeleteAccountDialogProps = {
    isVisible: boolean,
    cancelAction: Function
}

export const DeleteAccountDialog = (props: DeleteAccountDialogProps) => {
    const [isDeleting, setIsDeleting] = useState(false)
    const nav = useNavigate()

    useEffect(() => {
        if (isDeleting) {
            Account.delete().then(_ => {
                nav('/')
            })
        }
    }, [isDeleting])

    return (
        <Dialog open={props.isVisible}>
            <DialogTitle>Account Deletion</DialogTitle>
            <DialogContent>
                Are you sure you want to delete your account? All your data will be deleted.
            </DialogContent>
            <DialogContent className="flex gap-12 justify-center">
                <Button value='Cancel' action={() => props.cancelAction()}/>
                <Button value='Confirm' action={() => setIsDeleting(true)} disabled={isDeleting}/>
            </DialogContent>
        </Dialog>
    )
}