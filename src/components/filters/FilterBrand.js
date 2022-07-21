import React, { useContext, useEffect, useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from "../..";
import cl from "../styles/FilterBrand.module.css"
import Loader from "../UI/loader/Loader";
import MyInput from "../UI/MyInput";

export default function FilterBrand({ rightBrand, setRightBrand }) {
    const { firestore } = useContext(Context);
    const [productsBrand, loading] = useCollectionData(
        firestore.collection("productsBrand")
    )
    const [sortBrand, setSortBrand] = useState([]); // массив всех брендов
    const [filteredBrands, setFilteredBrands] = useState([]); // Отфильтрованные бренды, то есть те самые подходящие бренды в меню

    const choiseBrand = e => {
        const brand = e.target.closest(`.${cl.oneBrand}`).querySelector(`p`).innerHTML;
        const variants = e.target.closest(`.${cl.filterBrand}`).querySelector(`.${cl.brands}`)

        setRightBrand(brand);
        variants.classList.add(cl.active)
    }

    const changeValue = (value, e) => {  // Функция управления инпутом и открывающаяя панель вариантов
        const variants = e.target.closest(`.${cl.filterBrand}`).querySelector(`.${cl.brands}`)

        setRightBrand(value)
        variants.classList.remove(cl.active)
    }

    const validateBrand = (value, e) => {
        if (!(rightBrand === "" && value === " ")) {
            changeValue(value, e);
        }
    }

    useEffect(() => { // Функция для создания массива всех брендов
        if (productsBrand) {
            let filterArr = [];

            productsBrand.map(brand => {
                let flag = true;

                for (let i = 0; i < filterArr.length; i++) {
                    if (filterArr[i] === brand.brand) {
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
        if (rightBrand === "") {
            setFilteredBrands([])
        } else if (sortBrand !== []) {
            let filterArr = sortBrand.filter(brand => brand.toLowerCase().includes(rightBrand.toLowerCase()))
            setFilteredBrands(filterArr)
        }
    }, [rightBrand, sortBrand])

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <div className={cl.filterBrand}>

            <input className={cl.input} placeholder="Бренд" value={rightBrand} onChange={e => validateBrand(e.target.value, e)} />

            <div className={cl.brands}>
                {
                    filteredBrands !== []
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