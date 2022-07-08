import React, { useState, useContext, useEffect } from "react";
import cl from "../styles/Filters.module.css"
import Loader from "../UI/loader/Loader";
import MyInput from "../UI/MyInput";
import FilterGender from "../filters/FilterGender";
import FilterPrice from "../filters/FilterPrice";
import FilterBrand from "../filters/FilterBrand";
import MyButton from "../UI/MyButton";
import Cross from "../UI/icons/cross/Cross";
import Search from "../UI/icons/search/Search";


export default function Filters({ filterGender, setFilterGender, startPrice, setStartPrice, endPrice, setEndPrice, rightBrand, setRightBrand }) {
    const [size, setSize] = useState(true);
    const resize = () => {
        setSize(!(size))
    }

    if (!size) {
        return (
            <div className={cl.closeWindow} onClick={resize}>
                <div className={cl.search}>
                    <Search />
                </div>
            </div>
        )
    }

    if (size) {
        return (
            <div className={cl.filters}>

                <div className={cl.chahgeOfSize} onClick={resize}>
                    <Cross size="20px" />
                </div>

                <div className={cl.filtersBlock}>
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
            </div>
        )
    }
}