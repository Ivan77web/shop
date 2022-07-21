import React from "react";
import cl from "./Arrow.module.css"

export default function Arrow({ size }) {
    return (
        <div className={cl.arrow} style={{ width: size, height: size}}>
            <div className={cl.one}/>
            <div className={cl.two}/>
        </div>
    )
}