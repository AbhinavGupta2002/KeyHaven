import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export const ChangeMasterPassword = () => {
    const params = useParams<{ email: string, token: string }>();
    const nav = useNavigate()

    return (
        <>
            <div className="text-red-600 font-bold">
                {params.email}
            </div>
            <div className="text-blue-600 font-bold">
                {params.token}
            </div>
        </>
    )
}