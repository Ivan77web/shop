import React from "react";
import cl from "./Cross.module.css"

export default function Cross({size}){
    return(
        <div className={cl.cross} style={{width: size, height: size}}>
            <div className={cl.one}/>
            <div className={cl.two}/>
        </div>
    )
}