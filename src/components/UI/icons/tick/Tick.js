import React from "react";
import cl from "./Tick.module.css"

export default function Tick({size}){
    return(
        <div className={cl.tick} style={{width: size, height: size}}>
            <div className={cl.one}/>
            <div className={cl.two}/>
        </div>
    )
}