import React from "react";
import gif from '../../../icons/sneakersGif.gif'
import cl from "./Loader.module.css"

export default function Loader(){
    return(
        <div className={cl.loader}>
            <img className={cl.photo} src={gif}/>
        </div>
    )
}