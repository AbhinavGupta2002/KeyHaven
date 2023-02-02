import React from "react";

export const Login = () => {
    return (
        <div className="flex justify-center h-full">
            <div className="my-auto px-24 py-10 text-center bg-gray-100 rounded-xl shadow-xl">
                <form>
                    <div className="font-bold text-2xl mb-10">Login</div>
                    <div className="text-start mb-8">
                        <div className="mb-1 text-lg">Email</div>
                        <input className="px-2 py-1 rounded-sm border-default1 border bg-gray-200 w-full text-sm"/>
                    </div>
                    <div className="text-start mb-12">
                        <div className="mb-1 text-lg">Master Password</div>
                        <input className="px-2 py-1 rounded-sm border-default1 border bg-gray-200 w-full text-sm" type='password'/>
                    </div>
                    <button type='submit' className="bg-gray-200 px-6 py-2 rounded-md border border-default1 hover:bg-gray-300">Submit</button>
                </form>
                <div className="mt-10">Don't have an account? <span className="text-default1 font-bold cursor-pointer">Sign Up</span></div>
            </div>
        </div>
    )
}