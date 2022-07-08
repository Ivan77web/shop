import React from "react";
import cl from "./AdminLogo.module.css"

export default function AdminLogo() {
    return (
        <div className={cl.admin}>
                <div className={cl.circle}/>
                <div className={cl.part + " " + cl.partOne}/>
                <div className={cl.part + " " + cl.partTwo}/>
                <div className={cl.part + " " + cl.partThree}/>
                <div className={cl.part + " " + cl.partFour}/>
                <div className={cl.part + " " + cl.partFive}/>
                <div className={cl.part + " " + cl.partSix}/>
                <div className={cl.part + " " + cl.partSeven}/>
                <div className={cl.part + " " + cl.partEight}/>
        </div>
    )
}