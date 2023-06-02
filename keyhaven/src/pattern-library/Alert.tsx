import * as React from 'react'
import Box from '@mui/material/Box'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import { RxCross1 } from 'react-icons/rx'

type MyAlertProps = {
    isVisible: boolean,
    setInvisible: Function
}

export const MyAlert = (props: MyAlertProps) => {

  return (
    <Collapse in={props.isVisible}>
        <Alert
            severity='info'
            action={
            <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                props.setInvisible()
                }}
            >
                <RxCross1/>
            </IconButton>
            }
            sx={{ mb: 2, width: '30rem' }}
        >
            An email has been sent to you to change the password!
        </Alert>
    </Collapse>
  );
}
