import React, { useState, useContext, useEffect } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from "../..";
import cl from "../styles/Shop.module.css"
import Loader from "../UI/loader/Loader";
import CardProduct from "./CardProduct";
import Filters from "./Filters";

export default function Shop({ brandNavBar }) {
    const { firestore } = useContext(Context);
    // const [productsArticles, loading] = useCollectionData(
    //     firestore.collection("productsArticles")
    // ) 
    // Проблема с удалением, сейчас удаляет из дублирующей коллекции productsForShop
    const [productsArticles, loading] = useCollectionData(
        firestore.collection("productsForShop")
    )
    const [loadingOnlyArticles, setLoadingOnlyArticles] = useState(true);
    const [onlyArticles, setOnlyArticles] = useState([]);
    const [filterGender, setFilterGender] = useState("");
    const [startPrice, setStartPrice] = useState("");
    const [endPrice, setEndPrice] = useState("");
    const [rightBrand, setRightBrand] = useState("");

    const [absence, setAbsence] = useState(true)
    // const [loadingCheck, setLoadingCheck] = useState(true)

    const [mainFilter, setMainFilter] = useState({
        brandNavBar: brandNavBar,
        filterGender: filterGender,
        startPrice: startPrice,
        endPrice: endPrice,
        rightBrand: rightBrand
    })
    function checkFilter(rightProduct, mainFilter) {
        if (
            (!(rightProduct.brand.toLowerCase().includes(mainFilter.brand.toLowerCase())) && mainFilter.brand !== "") ||
            (Number(rightProduct.price) < mainFilter.startPrice && mainFilter.startPrice !== "") ||
            (Number(rightProduct.price) > mainFilter.endPrice && mainFilter.endPrice !== "") ||
            (rightProduct.gender !== mainFilter.gender && mainFilter.gender !== "" && mainFilter.gender !== "Не выбрано") ||
            (!(rightProduct.label.includes(mainFilter.brandNavBar)) && mainFilter.brandNavBar !== "")
        ) {
            return false;
        } else {
            // setAbsence(true);
            return true;
        }
    }

    useEffect(() => {
        setMainFilter({
            brandNavBar: brandNavBar,
            gender: filterGender,
            startPrice: startPrice,
            endPrice: endPrice,
            brand: rightBrand
        })
    }, [filterGender, startPrice, endPrice, rightBrand, brandNavBar])

    useEffect(() => {
        if (productsArticles) {
            let articles = [];
            for (let i = 0; i < productsArticles.length; i++) {
                articles.push(productsArticles[i].article)
            }
            setOnlyArticles(articles);
            setLoadingOnlyArticles(false);
        }
    }, [productsArticles])

    // useEffect( () => {
    //     if(onlyArticles){
    //         onlyArticles.map( article => {
    //             if(checkFilter(article)){
    //                 setAbsence(true);
    //             }
    //         })
    //         setLoadingCheck(false)
    //     }
    // }, [onlyArticles, mainFilter])

    if (loading || loadingOnlyArticles) {
        return <Loader />
    }

    return (
        <div className={cl.shop}>
            <Filters
                filterGender={filterGender} setFilterGender={setFilterGender}
                startPrice={startPrice} setStartPrice={setStartPrice}
                endPrice={endPrice} setEndPrice={setEndPrice}
                rightBrand={rightBrand} setRightBrand={setRightBrand}
            />

            {
                absence
                ?
                    <div className={cl.products}>
                        {
                            onlyArticles.map(article =>
                                <CardProduct
                                    key={article}
                                    article={article}
                                    cart={true}
                                    mainFilter={mainFilter}
                                    checkFilter={checkFilter}
                                />
                            )
                        }
                    </div>
                :
                    <div className={cl.introAbsence}>
                        К сожалению, по вашим критериям товаров нет
                    </div>
            }
        </div>
    )
}