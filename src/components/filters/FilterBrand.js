import React, { useContext, useEffect, useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from "../..";
import cl from "../styles/FilterBrand.module.css"
import arrow from "../../icons/arrow.png"
import Loader from "../UI/loader/Loader";
import MyInput from "../UI/MyInput";

export default function FilterBrand({ rightBrand, setRightBrand }) {
    const { auth, firestore } = useContext(Context);
    const [productsBrand, loading] = useCollectionData(
        firestore.collection("productsBrand")
    )
    const [sortBrand, setSortBrand] = useState([]);
    const [valueInput, setValueInput] = useState("");
    const [filteredBrands, setFilteredBrands] = useState([]);

    const choiseBrand = e => {
        const brand = e.target.closest(`.${cl.oneBrand}`).querySelector(`p`).innerHTML;
        const variants = e.target.closest(`.${cl.filterBrand}`).querySelector(`.${cl.brands}`)

        setRightBrand(brand);
        setValueInput(brand);
        variants.classList.add(cl.active)
    }

    const changeValue = (value, e) => {
        const variants = e.target.closest(`.${cl.filterBrand}`).querySelector(`.${cl.brands}`)

        setValueInput(value);
        variants.classList.remove(cl.active)
    }

    useEffect(() => {
        if (productsBrand) {
            let filterArr = [];

            productsBrand.map(brand => {
                let flag = true;

                for (let i = 0; i < filterArr.length; i++) {
                    if (filterArr[i] == brand.brand) {
                        flag = false;
                    }
                }

                if (flag) {
                    filterArr.push(brand.brand)
                }
            })

            setSortBrand(filterArr);
        }
    }, [productsBrand])

    useEffect(() => {
        if (valueInput == "") {
            setFilteredBrands("")
        } else if (sortBrand != []) {
            let filterArr = sortBrand.filter(brand => brand.toLowerCase().includes(valueInput.toLowerCase()))
            setFilteredBrands(filterArr)
        }
    }, [valueInput, sortBrand])

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <div className={cl.filterBrand}>

            {/* <MyInput width="280px" height="30px" name="Бренд" fontSize="14px" value={valueInput} onChange={setValueInput} /> */}
            <input className={cl.input} placeholder="Бренд" value={valueInput} onChange={e => changeValue(e.target.value, e)} />

            <div className={cl.brands}>
                {
                    valueInput != ""
                    ?
                        <div onClick={e => choiseBrand(e)} className={cl.oneBrand}>
                            <p className={cl.brandName}>Не выбрано</p>
                        </div>
                    :
                    <div/>
                }
                {
                    filteredBrands != []
                        ?
                        filteredBrands.map(brand =>
                            <div key={brand} onClick={e => choiseBrand(e)} className={cl.oneBrand}>
                                <p className={cl.brandName}>{brand}</p>
                            </div>
                        )
                        :
                        <div />
                }
            </div>

        </div>
    )
}