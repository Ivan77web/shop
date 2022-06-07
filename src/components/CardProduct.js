import React, { useState, useContext, useEffect } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Context } from "..";
import cl from "./styles/CardProduct.module.css"

export default function CardProduct({article, cart}){
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
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

    const addProductInCart = async (e) => {
        const article = e.target.closest(`.${cl.card}`).querySelector(`.${cl.article}`).innerHTML;
        firestore.collection(`cart_${user.uid}`).add({
            article: article
        })
    }

    if(loading){
        return(
            <div>LOADING</div>
        )
    }

    if(rightProduct && src){
        return(
            <div className={cl.card}>
                <img src={src} className={cl.photo}/>
                <h1>{rightProduct.name}</h1>
                <p>{rightProduct.intro}</p>
                <p>{rightProduct.size}</p>
                <p className={cl.article}>{rightProduct.article}</p>
                <p>{rightProduct.price}&#x20bd;</p>
                {
                    cart
                    ?
                    <p onClick={e => addProductInCart(e)}>Добавить в корзину</p>
                    :
                    <div/>
                }
            </div>
        )
    }
}