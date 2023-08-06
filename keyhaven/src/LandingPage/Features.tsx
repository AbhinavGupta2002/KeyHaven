import React from "react";

// icon imports
import {BsFillShieldLockFill} from 'react-icons/bs'
import {MdGroupWork} from 'react-icons/md'
import {RiGroup2Fill} from 'react-icons/ri'

export const Features = () => {
    return (
        <div className="flex bg-gray-100 justify-center">
            <div className="flex flex-col custom:flex-row flex-wrap justify-center align-middle mx-4 gap-20 p-5 xs:p-20 bg-gray-200 my-20 rounded-xl shadow-xl border border-default1">
                <div className="flex flex-col rounded-xl border border-default1 bg-default1 p-8 shadow-xl w-custom3 md:w-96 h-58 hover:bg-blue-800 transition-all duration-200">
                    <BsFillShieldLockFill className="text-3xl text-default2 self-center md:self-start"/>

                    <label className="mt-6 text-lg md:text-xl font-bold text-white self-center md:self-start">Store Personal Passwords</label>

                    <label className="mt-4 text-sm text-gray-300 text-center md:text-start">
                        Secure your passwords with ease using our superior password manager. 
                        Advanced encryption and top-notch security guarantees the protection of your sensitive information.
                    </label>
                </div>
                <div className="flex flex-col rounded-xl border border-default1 bg-default1 p-8 shadow-xl w-custom3 md:w-96 h-58 hover:bg-blue-800 transition-all duration-200">
                    <MdGroupWork className="text-4xl text-default2 self-center md:self-start"/>

                    <label className="mt-4 text-md md:text-xl font-bold text-white self-center md:self-start">Group Accounts In Collections</label>

                    <label className="mt-4 text-sm text-gray-300 text-center md:text-start">
                        Simplify private data management with custom collections. 
                        Add multiple accounts per collection for organized and efficient access.
                    </label>
                </div>
                <div className="flex flex-col rounded-xl border border-default1 bg-default1 p-8 shadow-xl w-custom3 md:w-96 h-58 hover:bg-blue-800 transition-all duration-200">
                    <RiGroup2Fill className="text-4xl text-default2 self-center md:self-start"/>

                    <label className="mt-custom1 text-lg md:text-xl font-bold text-white self-center md:self-start">Share Data With Your Team</label>

                    <label className="mt-4 text-sm text-gray-300 text-center md:text-start">
                        Effortlessly manage account credentials as a team. 
                        Create Circles, add members, and centralize account data.
                    </label>
                </div>
            </div>
        </div>
    )
}