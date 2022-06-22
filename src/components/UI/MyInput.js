import React from "react";
import cl from "./styles/MyInput.module.css"

export default function MyInput({width, height, name, fontSize, value, onChange}) {
    return(
        <input 
            value={value}
            onChange={e => onChange(e.target.value)}
            className={cl.input} 
            placeholder={name}
            style={{width: width, height: height, fontSize: fontSize}}
        />
    )
}