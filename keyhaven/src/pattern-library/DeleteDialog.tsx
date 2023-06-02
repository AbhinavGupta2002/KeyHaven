import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import { Button } from "./Button";

type DeleteDialogProps = {
    isVisible: boolean,
    cancelAction: Function,
    confirmAction: Function
}

export const DeleteDialog = (props: DeleteDialogProps) => {
    return (
        <Dialog open={props.isVisible}>
            <DialogTitle>Delete Account</DialogTitle>
            <DialogContent>
                Are you sure you want to delete this account permanently?
            </DialogContent>
            <DialogContent className="flex gap-12 justify-center">
                <Button value='Cancel' action={() => props.cancelAction()}/>
                <Button value='Confirm' action={() => props.confirmAction()}/>
            </DialogContent>
        </Dialog>
    )
}