import React from "react";
import cl from "./Search.module.css"

export default function Search(){
    return(
        <div className={cl.search}>
            <div className={cl.circle}/>
            <div className={cl.foot}/>
        </div>
    )
}