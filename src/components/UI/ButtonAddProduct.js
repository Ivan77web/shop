import React, { useContext, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../..";
import Loader from "./loader/Loader";
import MyButton from "./MyButton";
import cl from "./styles/ButtonAddProduct.module.css"

export default function ButtonAddProduct({user, inputSize, article, addProductInCart, deleteProductOnCart}){
    const {firestore} = useContext(Context);
    const [productInCart, loading] = useCollectionData(
        firestore.collection(`cart_${user.uid}`)
    )
    const [isTheCart, setIsTheCart] = useState(false);

    useEffect(()=>{
        if(productInCart){
            for(let i = 0; i < productInCart.length; i++){
                let elem = productInCart[i];

                if(elem.article == article && elem.size == inputSize){
                    setIsTheCart(true)
                    return
                }else{
                    setIsTheCart(false)
                }
            }
        }
    },[productInCart, inputSize])

    const deleteFunc = () => {
        deleteProductOnCart();
        setIsTheCart(false);
    }

    if(loading){
        return(
            <Loader/>
        )
    }

    return(
        <div onClick={isTheCart ? deleteFunc : addProductInCart}>
            <MyButton width="100%" height="50px" bgColor = {isTheCart ? "green" : "rgb(145, 22, 22)"} color="white" name = {isTheCart ? "Добавлено" : "Добавить в корзину"}/>
        </div>
    )
}