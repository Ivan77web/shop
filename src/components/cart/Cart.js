import React, { useState, useContext, useEffect } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from "../..";
import cl from "../styles/Cart.module.css"
import ProductOnCart from "./ProductOnCart";
import MyButton from "../UI/MyButton";
import { Link } from "react-router-dom";
import Loader from "../UI/loader/Loader";

export default function Cart(){
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [productsMyCart, loading] = useCollectionData(
        firestore.collection(`cart_${user.uid}`)
    )

    if(loading){
        return(
            <div className={cl.cart}>
                <Loader/>
            </div>
        )
    }

    return(
        <div className={cl.cart}>

            <h3 className={cl.header}>
                Корзина:    
            </h3>

            {
                productsMyCart.length
                ?
                    <div>
                        <div className={cl.products}>
                        {
                            productsMyCart.map(product => 
                                <ProductOnCart key={`${product.article}_${product.size}`} product={product}/>
                            )
                        }
                        </div>

                        <Link to="/check">
                            <div className={cl.buttonBuy}>
                                <MyButton width="100%" height="50px" bgColor="rgb(145, 22, 22)" color="white" name = {`Оформить заказ`}/>
                            </div>
                        </Link>
                    </div>
                :
                <div className={cl.message}>
                    В корзине пусто.

                    <Link to="/shop">
                        <div className={cl.button}>
                            <MyButton width="100%" height="50px" bgColor="rgb(145, 22, 22)" color="white" name="Перейти в магазин"/>
                        </div>
                    </Link>
                </div>
            }


        
        </div>
    )
}