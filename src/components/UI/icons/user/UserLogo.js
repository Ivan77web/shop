import React from "react";
import cl from "./UserLogo.module.css"

export default function User(){
    return(
        <div className={cl.user}>
            <div className={cl.header}/>
            <div className={cl.body}/>
        </div>
    )
}