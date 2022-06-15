import React, { useState, useContext, useEffect } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from "..";
import cl from "./styles/Cart.module.css"
import ProductOnCart from "./ProductOnCart";
import Test from "./Test";

export default function Cart(){
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [productsMyCart, loading] = useCollectionData(
        firestore.collection(`cart_${user.uid}`)
    )

    if(loading){
        return(
            <div className={cl.cart}>
                LOADING
            </div>
        )
    }

    return(
        <div className={cl.cart}>

            <h3 className={cl.header}>
                Корзина:    
            </h3>

            <div className={cl.products}>
                {
                    productsMyCart.map(product => 
                        <ProductOnCart product={product}/>
                    )
                }
            </div>
        
        </div>
    )
}