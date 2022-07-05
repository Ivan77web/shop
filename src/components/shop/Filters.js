import React, { useState, useContext, useEffect } from "react";
import cl from "../styles/Filters.module.css"
import Loader from "../UI/loader/Loader";
import MyInput from "../UI/MyInput";
// import arrow from "../../icons/arrow.png"
import FilterGender from "../filters/FilterGender";
import FilterPrice from "../filters/FilterPrice";
import FilterBrand from "../filters/FilterBrand";
import MyButton from "../UI/MyButton";


export default function Filters({filterGender, setFilterGender, startPrice, setStartPrice, endPrice, setEndPrice, rightBrand, setRightBrand}){
    // const [filterGender, setFilterGender] = useState("");
    // const [startPrice, setStartPrice] = useState("");
    // const [endPrice, setEndPrice] = useState("")
    // const [rightBrand, setRightBrand] = useState("")

    return (
        <div className={cl.filters}>

            <FilterGender
                filterGender={filterGender}
                setFilterGender={setFilterGender}
            />

            <FilterPrice
                startPrice={startPrice}
                setStartPrice={setStartPrice}
                endPrice={endPrice}
                setEndPrice={setEndPrice}
            />

            <FilterBrand
                rightBrand={rightBrand}
                setRightBrand={setRightBrand}
            />
        </div>
    )
}