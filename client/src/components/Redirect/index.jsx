import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export const Redirect = ({ to }) => {
    return (
        <>
            <Navigate to={to} />
            <Outlet />
        </>
    )
}