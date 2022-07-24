import React from "react";
import cl from "../styles/Admin.module.css"
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

export default function Admin() {
    return(
        <div className={cl.admin}>
            <div className={cl.sidebar}>
                <Sidebar/>
            </div>
            
            <div className={cl.outlet}>
                <Outlet/>
            </div>
        </div>
    )
}