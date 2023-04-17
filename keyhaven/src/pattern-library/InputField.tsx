import React, { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

type Props = {
    type: string,
    value: string,
    setValue: (value: string) => void
}

export const InputField = ({ type = '', value='', setValue}: Props) => {
    const [isVisible, setIsVisible] = useState(false)

    return (
      <div className="flex relative">
        <input
          className="px-2 py-1 rounded-sm border-default1 border bg-gray-200 w-full text-sm"
          type={type === 'password' ? isVisible ? 'text' : type : type}
          value={value}
          onChange={event => setValue(event.target.value)}
        />
        {type === 'password' && !isVisible &&
          <AiFillEye className="absolute top-2 right-2 cursor-pointer" onClick={() => setIsVisible(!isVisible)}/>
        }
        {type === 'password' && isVisible &&
          <AiFillEyeInvisible className="absolute top-2 right-2 cursor-pointer" onClick={() => setIsVisible(!isVisible)}/>
        }
      </div>
    );
  };