import { Tooltip } from "@mui/material";
import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { BsInfoCircleFill } from 'react-icons/bs'

type Props = {
    type?: string,
    value: string,
    setValue: (value: string) => void,
    isDisabled?: boolean,
    setIsDisabled?: (value: boolean) => void,
    infoValue?: string
}

export const InputField = ({ type = '', value='', infoValue='', isDisabled=false, setValue, setIsDisabled=() => null}: Props) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
      <div className="flex relative">
        <input
          className={isDisabled ? "px-2 py-1 pr-8 rounded-sm border-default1 border bg-gray-400 w-full text-sm" : type !== '' ? "px-2 py-1 pr-8 rounded-sm border-default1 border bg-gray-200 w-full text-sm" : "px-2 py-1 rounded-sm border-default1 border bg-gray-200 w-full text-sm"}
          type={type === 'password' ? isVisible ? 'text' : type : type}
          value={value}
          onChange={event => setValue(event.target.value)}
          disabled={isDisabled}
        />
        {type === 'NA' && !isDisabled &&
          <Tooltip
            title={<span className="text-lg">Not Applicable</span>}
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
            <div
              className="absolute top-1 right-2 cursor-pointer"
              onClick={() => {
                setValue('')
                setIsDisabled(!isDisabled)
              }}
            >
              NA
            </div>
          </Tooltip>
        }
        {type === 'NA' && isDisabled &&
          <Tooltip
            title={<span className="text-lg">Not Applicable</span>}
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
            <div
              className="absolute top-1 right-2 cursor-pointer font-bold text-default2"
              onClick={() => setIsDisabled(!isDisabled)}
            >
              NA
            </div>
          </Tooltip>
        }
        {type === 'info' &&
          <Tooltip
            title={<span className="text-lg">{infoValue}</span>}
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
            <div><BsInfoCircleFill className="absolute top-2 right-2"/></div>
          </Tooltip>
        }
        {type === 'password' && !isVisible &&
          <AiFillEye className="absolute top-2 right-2 cursor-pointer" onClick={() => setIsVisible(!isVisible)}/>
        }
        {type === 'password' && isVisible &&
          <AiFillEyeInvisible className="absolute top-2 right-2 cursor-pointer" onClick={() => setIsVisible(!isVisible)}/>
        }
      </div>
    );
  };