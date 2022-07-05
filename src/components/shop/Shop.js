import React, { useState, useContext, useEffect } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from "../..";
import cl from "../styles/Shop.module.css"
import Loader from "../UI/loader/Loader";
import CardProduct from "./CardProduct";
import Filters from "./Filters";

export default function Shop({brandNavBar}) {
    const { auth, firestore } = useContext(Context);
    const [productsArticles, loading] = useCollectionData(
        firestore.collection("productsArticles")
    )
    const [loadingOnlyArticles, setLoadingOnlyArticles] = useState(true);
    const [onlyArticles, setOnlyArticles] = useState([]);

    const [filterGender, setFilterGender] = useState("");
    const [startPrice, setStartPrice] = useState("");
    const [endPrice, setEndPrice] = useState("");
    const [rightBrand, setRightBrand] = useState("");

    const [mainFilter, setMainFilter] = useState({
        brandNavBar: brandNavBar,
        filterGender: filterGender,
        startPrice: startPrice,
        endPrice: endPrice,
        rightBrand: rightBrand
    })

    useEffect( () => {
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

            <div className={cl.products}>
                {
                    onlyArticles.map(article =>
                        <CardProduct key={article} article={article} cart={true} mainFilter={mainFilter}/>
                    )
                }
            </div>
        </div>
    )
}