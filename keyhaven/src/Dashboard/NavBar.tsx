import React, { Dispatch, SetStateAction, useState } from "react";

// icon imports
import {MdOutlineExpandMore, MdOutlineExpandLess} from 'react-icons/md'
import { LogoutDialog } from "../pattern-library/LogoutDialog";

type NavBarProps = {
    nav: number,
    setNav:  Dispatch<SetStateAction<number>>
}

export const NavBar = ({nav, setNav}: NavBarProps) => {
    const [showDropdown, setShowDropdown] = useState(true)
    const [showLogoutDialog, setShowLogoutDialog] = useState(false)

    return (
        <>
            <div className="flex flex-col h-screen bg-gray-100 pt-36 transition-all" style={{width: '13vw'}}>
                <div
                className={showDropdown ? "text-xl p-5 flex justify-between bg-gray-200 hover:cursor-pointer" : "text-xl p-5 flex justify-between hover:bg-gray-200 duration-200 hover:cursor-pointer"}
                onClick={() => setShowDropdown(!showDropdown)}
                >
                    <div>Personal</div>
                    {!showDropdown ?
                        <MdOutlineExpandMore className="text-2xl mt-custom2"/> :
                        <MdOutlineExpandLess className="text-2xl mt-custom2"/>
                    }
                </div>
                {showDropdown &&
                    <>
                        <label
                        className={nav === 0 ? "text-md pt-1 pb-1 pl-10 bg-gray-200 hover:cursor-pointer border-t-gray-300 border-t-2" : "text-md pt-1 pb-1 pl-10 hover:bg-gray-200 duration-300 hover:cursor-pointer border-t-gray-300 border-t-2"}
                        onClick={() => setNav(0)}
                        >
                            Accounts
                        </label>
                        <label
                        className={nav === 1 ? "text-md pt-1 pb-1 pl-10 bg-gray-200 hover:cursor-pointer border-t-gray-300 border-b-gray-300 border-t-2 border-b-2" : "text-md pt-1 pb-1 pl-10 hover:bg-gray-200 duration-200 hover:cursor-pointer border-t-gray-300 border-b-gray-300 border-t-2 border-b-2"}
                        onClick={() => setNav(1)}
                        >
                            Collections
                        </label>
                    </>
                }
                <div className={nav === 2 ? "text-xl p-5 bg-gray-200 hover:cursor-pointer" : "text-xl p-5 hover:bg-gray-200 duration-200 hover:cursor-pointer"}
                onClick={() => setNav(2)}
                >
                    <div>Circles</div>
                </div>
                <div className="mt-auto mb-40">
                    <div
                    className={nav === 3 ? "text-xl p-5 bg-gray-200 hover:cursor-pointer" : "text-xl p-5 hover:bg-gray-200 duration-200 hover:cursor-pointer"}
                    onClick={() => setNav(3)}
                    >
                        Settings
                    </div>
                    <div
                    className="text-xl p-5 hover:bg-gray-200 duration-200 hover:cursor-pointer text-red-600 font-bold"
                    onClick={() => setShowLogoutDialog(true)}
                    >
                        Log Out
                    </div>
                </div>
            </div>
            <LogoutDialog isVisible={showLogoutDialog} cancelAction={() => setShowLogoutDialog(false)}/>
        </>
    )
}