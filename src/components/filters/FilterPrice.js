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
                Цена, &#x20bd;
            </div>

            <div className={cl.startEndPrice}>
                <div className={cl.startPrice}>
                    <MyInput width="40px" height="10px" name="от" fontSize="12px" value={startPrice} onChange={validateStartPrice} />
                </div>

                <div className={cl.endPrice}>
                    <MyInput width="40px" height="10px" name="до" fontSize="12px" value={endPrice} onChange={validateEndPrice} />
                </div>
            </div>
        </div>
    )
}