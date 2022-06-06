import React, { useState, useContext, useEffect } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from "..";
import cl from "./styles/CardProduct.module.css"

export default function CardProduct({article}){
    const {auth, firestore} = useContext(Context);
    const [products, loading] = useCollectionData(
        firestore.collection("products")
    )
    const [rightProduct, setRightProduct] = useState({});

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
            <div>LOADING</div>
        )
    }

    return(
        <div className={cl.card}>
            <h1>{rightProduct.name}</h1>
            <p>{rightProduct.intro}</p>
            <p>{rightProduct.size}</p>
            <p className={cl.article}>{rightProduct.article}</p>
            <p>{rightProduct.price}&#x20bd;</p>
        </div>
    )
}