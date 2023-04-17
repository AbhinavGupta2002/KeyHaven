import React from "react";

// image imports
import companyLogo from '../img/logo-side-bg-blank1.png'

export const Header = () => {
    return (
        <div className="bg-default1 flex justify-center pt-4 pb-4 absolute top-0 w-full">
            <div className="flex justify-between w-header">
                <img src={companyLogo} className="w-48"/>
            </div>
        </div>
    )
}