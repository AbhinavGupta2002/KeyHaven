import { Link, Skeleton, TableCell, TableRow, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import { RiPencilFill } from "react-icons/ri";
import { DeleteDialog } from "../pattern-library/DeleteDialog";

import { EditAccountDialog } from "../pattern-library/EditAccountDialog";
import { RowDataModel } from "./PersonalAccounts";

type PersonalAccountsRowProps = {
    data: RowDataModel,
    updateData: Function,
    deleteData: Function,
    checkTitleIsUnique: Function,
    isDataLoaded: boolean
}

export const PersonalAccountsRow = (props: PersonalAccountsRowProps) => {
    const [showPassword, setShowPassword] = useState(false)
    const [showDeleteDialog, setShowDeleteDialog] = useState(false)
    const [showEditDialog, setShowEditDialog] = useState(false)

    return (
        <TableRow key={props.data.title}>
            <TableCell component="th" scope="data">
                <div className="w-16 h-12">
                    {props.data.isDataLoaded ?
                        <img src={props.data.iconUrl} className="w-16 h-12 object-contain"/> :
                        <Skeleton animation="wave" height={50}/>
                    }
                </div>
            </TableCell>
            <TableCell component="th" scope="data">
                {props.data.isDataLoaded ?
                    props.data.title :
                    <Skeleton animation="wave" width={80}/>
                }
            </TableCell>
            <TableCell style={{ width: 400}} align="right">
                {props.data.isDataLoaded ?
                    props.data.username.length ? props.data.username : <label className="text-default1 font-bold">NA</label> :
                    <Skeleton animation="wave" width={80} sx={{marginLeft: 'auto'}}/>
                }
            </TableCell>
            <TableCell style={{ width: 450 }} align="right">
                {props.data.isDataLoaded ?
                    showPassword ?
                    props.data.password :
                    <div className="w-20 h-5 bg-gray-300 float-right rounded-md"></div>
                    : <Skeleton animation="wave" width={80} sx={{marginLeft: 'auto'}}/>
                }
            </TableCell>
            <TableCell style={{ width: 450 }} align="right">
                <div>
                    {props.data.isDataLoaded ?
                        <a href={props.data.url} target="_blank" className="hover:underline hover:underline-offset-2 hover:font-bold hover:cursor-pointer w-fit float-right">
                            {props.data.url}
                        </a> :
                        <Skeleton animation="wave" width={80} sx={{marginLeft: 'auto'}}/>
                    }
                </div>
            </TableCell>
            <TableCell style={{ width: 200 }} align="right">
            <div className='flex align-middle gap-7 float-right'>
            <Tooltip
                title={<span className="text-lg">{showPassword ? 'Hide' : 'Show'} Password</span>}
                placement="top"
                arrow
                componentsProps={{
                    tooltip: {
                        sx: {
                        bgcolor: '#010536',
                        '& .MuiTooltip-arrow': {
                            color: '#010536',
                        },
                        },
                    },
                }}
                >
                <div className={`rounded-lg p-1 ${props.data.isDataLoaded ? 'hover:bg-default1 hover:text-white cursor-pointer' : ''}`} onClick={() => props.data.isDataLoaded && setShowPassword(!showPassword)}>
                    {showPassword ? <AiFillEyeInvisible className='w-4 h-4'/> : <AiFillEye className='w-4 h-4'/>}
                </div>
                </Tooltip>
                <Tooltip
                title={<span className="text-lg">Edit</span>}
                placement="top"
                arrow
                componentsProps={{
                    tooltip: {
                        sx: {
                        bgcolor: '#010536',
                        '& .MuiTooltip-arrow': {
                            color: '#010536',
                        },
                        },
                    },
                }}
                >
                <div className={`rounded-lg p-1 ${props.data.isDataLoaded ? 'hover:bg-default1 hover:text-white cursor-pointer' : ''}`} onClick={() => props.data.isDataLoaded && setShowEditDialog(true)}>
                    <RiPencilFill className='w-4 h-4'/>
                </div>
                </Tooltip>
                <Tooltip
                title={<span className="text-lg">Delete</span>}
                placement="top"
                arrow
                componentsProps={{
                    tooltip: {
                        sx: {
                        bgcolor: '#010536',
                        '& .MuiTooltip-arrow': {
                            color: '#010536',
                        },
                        },
                    },
                }}
                >
                <div className={`rounded-lg p-1 ${props.data.isDataLoaded ? 'hover:bg-default1 hover:text-white cursor-pointer' : ''}`} onClick={() => props.data.isDataLoaded && setShowDeleteDialog(true)}>
                    <BsFillTrashFill className='w-4 h-4'/>
                </div>
                </Tooltip>
            </div>
            </TableCell>
            <DeleteDialog
                title={props.data.title} isVisible={showDeleteDialog} cancelAction={() => setShowDeleteDialog(false)}
                confirmAction={() => {
                    props.deleteData(props.data.title)
                    setShowDeleteDialog(false)
                }}/>
            <EditAccountDialog
                isVisible={showEditDialog} cancelAction={() => setShowEditDialog(false)}
                confirmAction={() => setShowEditDialog(false)} data={props.data}
                updateData={props.updateData} checkTitleIsUnique={props.checkTitleIsUnique}
            />
        </TableRow>
    )
}