import React, { useContext, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../..";
import cl from "../styles/Price.module.css"
import Loader from "../UI/loader/Loader";

export default function Price({user, product, price}) {
    const {firestore} = useContext(Context);
    const [productsOnCart] = useCollectionData(
        firestore.collection(`cart_${user.uid}`)
    )
    const [rightProduct, setRightProduct] = useState();
    const [allPrice, setAllPrice] = useState();
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        if(productsOnCart){
            productsOnCart.map((productOnCart)=>{
                if(productOnCart.article == product.article){
                    setRightProduct(productOnCart)
                }
            })
        }
    }, [productsOnCart])

    useEffect(()=>{
        if(rightProduct){
            setAllPrice(rightProduct.number * price)
            setLoading(false)
        }
    }, [rightProduct])

    if(loading){
        return(
            <Loader/>
        )
    }

    return(
        <div className={cl.price}>
            {allPrice} руб.
        </div>
    )
}