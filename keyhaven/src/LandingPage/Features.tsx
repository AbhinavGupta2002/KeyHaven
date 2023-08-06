import React from "react";

// icon imports
import {BsFillShieldLockFill} from 'react-icons/bs'
import {MdGroupWork} from 'react-icons/md'
import {RiGroup2Fill} from 'react-icons/ri'

export const Features = () => {
    return (
        <div className="flex bg-gray-100 justify-center">
            <div className="flex flex-col custom:flex-row flex-wrap justify-center align-middle mx-4 gap-20 p-20 bg-gray-200 my-20 rounded-xl shadow-xl border border-default1">
                <div className="block rounded-xl border border-default1 bg-default1 p-8 shadow-xl w-96 h-58 hover:bg-blue-800 transition-all duration-200">
                    <BsFillShieldLockFill className="text-3xl text-default2"/>

                    <h3 className="mt-6 text-xl font-bold text-white">Store Personal Passwords</h3>

                    <p className="mt-4 text-sm text-gray-300">
                        Secure your passwords with ease using our superior password manager. 
                        Advanced encryption and top-notch security guarantees the protection of your sensitive information.
                    </p>
                </div>
                <div className="block rounded-xl border border-default1 bg-default1 p-8 shadow-xl w-96 h-58 hover:bg-blue-800 transition-all duration-200">
                    <MdGroupWork className="text-4xl text-default2"/>

                    <h3 className="mt-4 text-xl font-bold text-white">Group Accounts In Collections</h3>

                    <p className="mt-4 text-sm text-gray-300">
                        Simplify private data management with custom collections. 
                        Add multiple accounts per collection for organized and efficient access.
                    </p>
                </div>
                <div className="block rounded-xl border border-default1 bg-default1 p-8 shadow-xl w-96 h-58 hover:bg-blue-800 transition-all duration-200">
                    <RiGroup2Fill className="text-4xl text-default2"/>

                    <h3 className="mt-custom1 text-xl font-bold text-white">Share Data With Your Team</h3>

                    <p className="mt-4 text-sm text-gray-300">
                        Effortlessly manage account credentials as a team. 
                        Create Circles, add members, and centralize account data.
                    </p>
                </div>
            </div>
        </div>
    )
}