import React, { useState, useContext, useEffect } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Context } from "..";
import cl from "./styles/ProductOnCart.module.css"
import MyButton from "./UI/MyButton";

export default function ProductOnCart({product}){
    const {auth, firestore} = useContext(Context);
    const [products, loading] = useCollectionData(
        firestore.collection("products")
    )
    const [rightProduct, setRightProduct] = useState({});
    const storage = getStorage();
    const [src, setSrc] = useState();

    getDownloadURL(ref(storage, `photo_${product.article}`)).then((url) => setSrc(url));

    useEffect(()=>{
        if(products){
            products.map(productElem => {
                if(product.article == productElem.article){
                    setRightProduct(productElem);
                }
            })
        }
    },[products])

    if(loading){
        return(
            <div>LOADING</div>
        )
    }

    if(rightProduct && src){
        return(
            <div className={cl.card}>
                <img className={cl.photo} src={src}/>

                <div className={cl.introduction}>
                    <h1 className={cl.brand}>{rightProduct.brand}</h1>
                    <p className={cl.model}>{rightProduct.model}</p>
                    <p className={cl.size}>Размер {product.size}</p>
                    <p className={cl.article}>Артикул: {rightProduct.article}</p>
                    <p className={cl.price}>{rightProduct.price} руб.</p>
                </div>

                <div className={cl.delete}>
                    <MyButton name="Удалить" color="white" bgColor="red" width="100px" height="30px"/>
                </div>
            </div>
        )
    }
}