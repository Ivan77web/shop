import React from "react";
import cl from "./WhiteCross.module.css"

export default function WhiteCross({size}){
    return(
        <div className={cl.cross} style={{width: size, height: size}}>
            <div className={cl.one}/>
            <div className={cl.two}/>
        </div>
    )
}