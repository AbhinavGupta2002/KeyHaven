import React, { useState } from "react";

// icon imports
import {MdOutlineExpandMore, MdOutlineExpandLess} from 'react-icons/md'

export const NavBar = () => {
    const [showDropdown, setShowDropdown] = useState(false)
    return (
        <div className="flex flex-col h-screen bg-gray-100 w-60 pt-36 transition-all">
            <div className="text-xl p-5 flex justify-between hover:bg-gray-200 duration-200 hover:cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                <div>Personal</div>
                {!showDropdown ?
                    <MdOutlineExpandMore className="text-2xl mt-custom2"/> :
                    <MdOutlineExpandLess className="text-2xl mt-custom2"/>
                }
            </div>
            {showDropdown &&
                <>
                    <label className="text-md pt-1 pb-1 pl-10 hover:bg-gray-200 duration-200 hover:cursor-pointer border-t-gray-200 border-t-2">
                        Accounts
                    </label>
                    <label className="text-md pt-1 pb-1 pl-10 hover:bg-gray-200 duration-200 hover:cursor-pointer border-t-gray-200 border-b-gray-200 border-t-2 border-b-2">
                        Collections
                    </label>
                </>
            }
            <div className="text-xl p-5 hover:bg-gray-200 duration-200 hover:cursor-pointer">
                <div>Circles</div>
            </div>
            <div className="absolute bottom-40 w-60">
                <div className="text-xl p-5 hover:bg-gray-200 duration-200 hover:cursor-pointer">
                    Settings
                </div>
                <div className="text-xl p-5 hover:bg-gray-200 duration-200 hover:cursor-pointer text-red-600 font-bold">
                    Log Out
                </div>
            </div>
        </div>
    )
}