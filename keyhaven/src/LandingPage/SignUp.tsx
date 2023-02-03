import React from "react";
import { Tooltip } from "@mui/material";
import { Button } from "../pattern-library/Button";

type SignUpProps = {
    setIsLogin: Function
}

export const SignUp = ({setIsLogin}: SignUpProps) => {
    return (
        <div className="flex justify-center h-full">
            <div className="my-auto px-24 py-10 text-center bg-gray-100 rounded-xl shadow-xl w-login_signup border border-default1">
                <form>
                    <div className="font-bold text-2xl mb-10">Sign Up</div>
                    <div className="text-start mb-8">
                        <div className="mb-1 text-lg">Email</div>
                        <input className="px-2 py-1 rounded-sm border-default1 border bg-gray-200 w-full text-sm"/>
                    </div>
                    <div className="text-start mb-12">
                        <Tooltip
                        title={<span className="text-lg">The master key is what you use to access everything else. Make sure to store this somewhere!</span>}
                        placement="bottom"
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
                            <div className="mb-1 text-lg">Master Password</div>
                        </Tooltip>
                        <input className="px-2 py-1 rounded-sm border-default1 border bg-gray-200 w-full text-sm" type='password'/>
                    </div>
                    <Button value='Submit' action={() => null}/>
                </form>
                <div className="mt-10">Already have an account? <span className="text-default1 font-bold cursor-pointer" onClick={() => setIsLogin(true)}>Login</span></div>
            </div>
        </div>
    );
}