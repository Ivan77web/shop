import React, { useState } from "react";
import cl from "../styles/Filters.module.css"
import FilterGender from "../filters/FilterGender";
import FilterPrice from "../filters/FilterPrice";
import FilterBrand from "../filters/FilterBrand";
import Cross from "../UI/icons/cross/Cross";
import Search from "../UI/icons/search/Search";
import { Transition } from 'react-transition-group';
import "../stylesForanimation/styleForAnimation.css"


export default function Filters({ filterGender, setFilterGender, startPrice, setStartPrice, endPrice, setEndPrice, rightBrand, setRightBrand }) {
    const [size, setSize] = useState(false);
    const resize = () => {
        setSize(!(size))
    }

    return (

        <Transition
            in={size}
            timeout={1000}
        >
            {
                state =>
                    <div className={cl.filters + " " + "filters" + " " + state}>
                        <div className={cl.chahgeOfSize + " " + "animationChangeOfSize"} style={size ? {color: "black"} :  {display: "none"}}>
        
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

                        {
                            size
                                ?
                                <div className={cl.cross} onClick={resize}>
                                    <Cross size="20px" />
                                </div>
                                :
                                <div className={cl.search} onClick={resize}>
                                    <Search />
                                </div>
                        }
                    </div>
            }
        </Transition>
    )
}