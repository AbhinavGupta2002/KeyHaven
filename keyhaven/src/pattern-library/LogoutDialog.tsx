import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import React from "react";
import { Button } from "./Button";
import { Link } from "react-router-dom";

type DeleteDialogProps = {
    isVisible: boolean,
    cancelAction: Function
}

export const LogoutDialog = (props: DeleteDialogProps) => {
    
    return (
        <Dialog open={props.isVisible}>
            <DialogTitle>Account Logout</DialogTitle>
            <DialogContent>
                Are you sure you want to log out of your account?
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