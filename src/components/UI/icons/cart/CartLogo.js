import React from "react";
import cl from "./CartLogo.module.css"

export default function CartLogo(){
    return(
        <div className={cl.cart}>
            <div className={cl.strap}/>
            <div className={cl.body}/>
        </div>
    )
}