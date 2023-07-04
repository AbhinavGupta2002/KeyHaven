import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button } from "./Button";
import { PasswordAccount } from "../APIrequests";

type DeleteDialogProps = {
    title: string,
    isVisible: boolean,
    cancelAction: Function,
    confirmAction: Function
}

export const DeleteDialog = (props: DeleteDialogProps) => {
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        if (isDeleting) {
            PasswordAccount.delete({email: 'saccomander@gmail.com', title: props.title}).then(res => {
                props.confirmAction()
                setIsDeleting(false)
            })
        }
    }, [isDeleting])

    return (
        <Dialog open={props.isVisible}>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this account permanently?
            </DialogContent>
            <DialogContent className="flex gap-12 justify-center">
                <Button value='Cancel' action={() => props.cancelAction()} disabled={isDeleting}/>
                <Button value='Confirm' action={() => setIsDeleting(true)} disabled={isDeleting}/>
            </DialogContent>
        </Dialog>
    )
}