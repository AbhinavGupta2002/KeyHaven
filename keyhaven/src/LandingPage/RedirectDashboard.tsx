import React, { useEffect, useState } from "react";
import { Button } from "../pattern-library/Button";
import { InputField } from "../pattern-library/InputField";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Account } from "../APIrequests";
import { Loader } from "../pattern-library/Loader";
import { MyAlert } from "../pattern-library/MyAlert";
import dashboard from '../img/dashboard.svg'


export const RedirectDashboard = ({navigate}: {navigate: Function}) => {

    return (
        <div className="flex justify-center h-full">
            <div className="my-auto px-24 py-10 text-center bg-gray-100 hover:bg-gray-300 active:bg-gray-400 rounded-xl shadow-xl w-login_signup border border-default1 cursor-pointer" onClick={() => navigate('/dashboard')}>
                <div className="font-bold text-2xl mb-16">Open Dashboard</div>
                <img src={dashboard}/>
            </div>
        </div>
    );
}