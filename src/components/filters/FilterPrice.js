import React from "react";
import cl from "../styles/FilterPrice.module.css"
import MyInput from "../UI/MyInput";

export default function FilterPrice({ startPrice, setStartPrice, endPrice, setEndPrice }) {
    const validateStartPrice = value => {
        if (!(startPrice === "" && value === " ")) {
            setStartPrice(value.replace(/\D/g,''));
        }
    }

    const validateEndPrice = value => {
        if (!(endPrice === "" && value === " ")) {
            setEndPrice(value.replace(/\D/g,''));
        }
    }

    return (
        <div className={cl.filterPrice}>

            <div className={cl.intro}>
                Цена
            </div>

            <div className={cl.startEndPrice}>
                <div className={cl.startPrice}>
                    <p className={cl.text}>От</p>
                    <MyInput width="40px" height="15px" name="" fontSize="12px" value={startPrice} onChange={validateStartPrice} />
                </div>

                <div className={cl.endPrice}>
                    <p className={cl.text}>До</p>
                    <MyInput width="40px" height="15px" name="" fontSize="12px" value={endPrice} onChange={validateEndPrice} />
                </div>
            </div>
        </div>
    )
}