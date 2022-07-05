import React, { useState, useContext, useEffect } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Context } from "../..";
import { Link } from "react-router-dom";
import cl from "../styles/CardProduct.module.css"
import Loader from "../UI/loader/Loader";

export default function CardProduct({article, mainFilter}){
    const {firestore} = useContext(Context);
    const [products, loading] = useCollectionData(
        firestore.collection("products")
    )
    const [rightProduct, setRightProduct] = useState({});
    const storage = getStorage();
    const [src, setSrc] = useState();

    getDownloadURL(ref(storage, `photo_${article}`)).then((url) => setSrc(url));

    useEffect(()=>{
        if(products){
            products.map(product => {
                if(article == product.article){
                    setRightProduct(product);
                }
            })
        }
    },[products])

    if(loading){
        return(
            <Loader/>
        )
    }

    if(
        (rightProduct.brand != mainFilter.brand && mainFilter.brand != "" && mainFilter.brand != "Не выбрано") ||
        ( Number(rightProduct.price) < mainFilter.startPrice && mainFilter.startPrice != "") ||
        ( Number(rightProduct.price) > mainFilter.endPrice && mainFilter.endPrice != "") ||
        (rightProduct.gender != mainFilter.gender && mainFilter.gender != "" && mainFilter.gender != "Не выбрано") ||
        (rightProduct.brand != mainFilter.brandNavBar && mainFilter.brandNavBar != "") 

    ){
        return(
            <div/>
        )
    }

    if(rightProduct && src){
        return(
            <Link to={`/shop/${article}`}>
                <div className={cl.card}>
                    <img src={src} className={cl.photo}/>

                    <div className={cl.introduction}>
                        <h1 className={cl.brand}>{rightProduct.brand}</h1>
                        <p className={cl.model}>{rightProduct.model}</p>
                        <p className={cl.article}>{rightProduct.article}</p>
                        <p className={cl.price}>{rightProduct.price} руб.</p>
                    </div>
                </div>
            </Link>
        )
    }
}