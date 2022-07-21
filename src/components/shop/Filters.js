import React, { useState } from "react";
import cl from "../styles/Filters.module.css"
import FilterGender from "../filters/FilterGender";
import FilterPrice from "../filters/FilterPrice";
import FilterBrand from "../filters/FilterBrand";
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

                <div className={cl.chahgeOfSize}>
                    <FilterGender
                        filterGender={filterGender}
                        setFilterGender={setFilterGender}
                    />

                    <div className={cl.cross} onClick={resize}>
                        <Cross size="20px" />
                    </div>
                </div>

                <div className={cl.filtersBlock}>
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