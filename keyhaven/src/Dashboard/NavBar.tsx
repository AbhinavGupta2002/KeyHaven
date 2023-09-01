import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

// icon imports
import {MdOutlineExpandMore, MdOutlineExpandLess} from 'react-icons/md'
import { LogoutDialog } from "../pattern-library/LogoutDialog";
import {RxHamburgerMenu} from 'react-icons/rx'

type NavBarProps = {
    nav: number,
    setNav:  Dispatch<SetStateAction<number>>
}

export const NavBar = ({nav, setNav}: NavBarProps) => {
    const [showDropdown, setShowDropdown] = useState(true)
    const [showLogoutDialog, setShowLogoutDialog] = useState(false)
    const [showNavBar, setShowNavBar] = useState(!(window.innerWidth < 975))

    const handleNavSwitch = (index: number) => {
        setNav(index)
        window.innerWidth < 975 && setShowNavBar(false)
    }

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth < 975) {
            setShowNavBar(false)
          } else if (window.innerWidth >= 975) {
            setShowNavBar(true)
          }
        };
    
        window.addEventListener('resize', handleResize);
    
        handleResize();
    
        return () => {
          window.removeEventListener('resize', handleResize);
        };
      }, []);

    return (
        <>
            <RxHamburgerMenu className="nav:hidden fixed top-5 right-5 z-50 text-gray-300 text-3xl cursor-pointer" onClick={() => setShowNavBar(!showNavBar)}/>
            {showNavBar ?
            <div className="fixed right-0 nav:relative z-30 nav:z-40 shadow-2xl nav:shadow-none">
                <div className="flex flex-col min-h-screen h-full bg-gray-100 pt-36 transition-all">
                    <div
                    className={showDropdown ? "text-xl px-5 py-3 nav:p-5 flex justify-between bg-gray-200 hover:cursor-pointer" : "text-xl px-5 py-3 nav:p-5 flex justify-between hover:bg-gray-200 active:bg-gray-300 duration-200 hover:cursor-pointer"}
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
                            className={nav === 0 ? "text-md pt-1 pb-1 pl-10 bg-gray-200 hover:cursor-pointer border-t-gray-300 border-t-2" : "text-md pt-1 pb-1 pl-10 hover:bg-gray-200 active:bg-gray-300 duration-300 hover:cursor-pointer border-t-gray-300 border-t-2"}
                            onClick={() => handleNavSwitch(0)}
                            >
                                Accounts
                            </label>
                            <label
                            className={nav === 1 ? "text-md pt-1 pb-1 pl-10 bg-gray-200 hover:cursor-pointer border-t-gray-300 border-b-gray-300 border-t-2 border-b-2" : "text-md pt-1 pb-1 pl-10 hover:bg-gray-200 active:bg-gray-300 duration-200 hover:cursor-pointer border-t-gray-300 border-b-gray-300 border-t-2 border-b-2"}
                            onClick={() => handleNavSwitch(1)}
                            >
                                Collections
                            </label>
                        </>
                    }
                    <div className={nav === 2 ? "text-xl px-5 py-3 nav:p-5 bg-gray-200 hover:cursor-pointer" : "text-xl px-5 py-3 nav:p-5 hover:bg-gray-200 active:bg-gray-300 duration-200 hover:cursor-pointer"}
                    onClick={() => handleNavSwitch(2)}
                    >
                        <div>Circles</div>
                    </div>
                    <div className="fixed bottom-5 nav:relative nav:mt-auto nav:mb-10">
                        <div
                        className={nav === 3 ? "text-xl px-5 py-3 nav:p-5 bg-gray-200 hover:cursor-pointer" : "text-xl px-5 py-3 nav:p-5 active:bg-gray-300 hover:bg-gray-200 duration-200 hover:cursor-pointer"}
                        onClick={() => handleNavSwitch(3)}
                        >
                            Settings
                        </div>
                        <a
                        href={process.env.REACT_APP_REPORT_URL}
                        target="_blank"
                        className={"text-lg px-5 py-3 nav:p-5 hover:bg-gray-200 active:bg-gray-300 duration-200 hover:cursor-pointer"}
                        onClick={() => {}}
                        >
                            Report Bugs
                        </a>
                        <div
                        className="text-xl px-5 py-3 nav:p-5 hover:bg-gray-200 active:bg-gray-300 duration-200 hover:cursor-pointer text-red-600 font-bold"
                        onClick={() => setShowLogoutDialog(true)}
                        >
                            Log Out
                        </div>
                    </div>
                </div>
                <LogoutDialog isVisible={showLogoutDialog} cancelAction={() => setShowLogoutDialog(false)}/>
            </div>
            : <></>}
        </>
    )
}