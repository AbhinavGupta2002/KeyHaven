import * as React from 'react'
import Alert, { AlertColor } from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Collapse from '@mui/material/Collapse'
import { RxCross1 } from 'react-icons/rx'

type MyAlertProps = {
    isVisible: boolean,
    setInvisible: Function,
    content: string,
    severity: AlertColor
}

export const MyAlert = (props: MyAlertProps) => {

  return (
    <Collapse in={props.isVisible}>
        <div className='w-custom5 sm:w-custom4'>
        <Alert
            severity={props.severity}
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
        >
            {props.content}
        </Alert>
        </div>
    </Collapse>
  );
}
