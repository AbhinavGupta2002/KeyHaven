import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import { Button } from "../pattern-library/Button";
import { Link } from "react-router-dom";

type DeleteAccountDialogProps = {
    isVisible: boolean,
    cancelAction: Function
}

export const DeleteAccountDialog = (props: DeleteAccountDialogProps) => {
    
    return (
        <Dialog open={props.isVisible}>
            <DialogTitle>Account Deletion</DialogTitle>
            <DialogContent>
                Are you sure you want to delete your account? All your data will be deleted.
            </DialogContent>
            <DialogContent className="flex gap-12 justify-center">
                <Button value='Cancel' action={() => props.cancelAction()}/>
                <Link to='/'>
                    <Button value='Confirm' action={() => null}/>
                </Link>
            </DialogContent>
        </Dialog>
    )
}