import React from "react";
import cl from "./styles/MyButton.module.css"

export default function MyButton({width, height, bgColor, color, name}){
    return(
        <button 
            className = {cl.button}
            style={{
                width: width, 
                height: height, 
                background: bgColor, 
                color: color
            }}
        >
            {name}
        </button>
    )
}