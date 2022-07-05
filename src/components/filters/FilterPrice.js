import React, { useState, useContext, useEffect } from "react";
import cl from "../styles/FilterPrice.module.css"
import MyInput from "../UI/MyInput";

export default function FilterPrice({ startPrice, setStartPrice, endPrice, setEndPrice }) {
    return (
        <div className={cl.filterPrice}>

            <div className={cl.intro}>
                Цена
            </div>

            <div className={cl.startEndPrice}>
                <div className={cl.startPrice}>
                    <p className={cl.text}>От</p>
                    <MyInput width="40px" height="15px" name="" fontSize="12px" value={startPrice} onChange={setStartPrice} />
                </div>

                <div className={cl.endPrice}>
                    <p className={cl.text}>До</p>
                    <MyInput width="40px" height="15px" name="" fontSize="12px" value={endPrice} onChange={setEndPrice} />
                </div>
            </div>
        </div>
    )
}