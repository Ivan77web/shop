import React, { useState, useContext, useEffect } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from "..";
import cl from "./styles/Cart.module.css"
import CardProduct from "./CardProduct";

export default function Cart(){
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [products, loading_one] = useCollectionData(
        firestore.collection("products")
    )
    const [articleMyCart, loading_two] = useCollectionData(
        firestore.collection(`cart_${user.uid}`)
    )
    const [myArticle, setMyArticle] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        if(articleMyCart){
            let articles = []
            for(let i = 0; i < articleMyCart.length; i++){
                articles.push(articleMyCart[i].article)
            }
            setMyArticle(articles);
            setLoading(false)
        }
    }, [articleMyCart])

    useEffect(()=>{
        console.log(myArticle);
    }, [myArticle])
    
    if(loading || loading_one || loading_two){
        return(
            <div className={cl.cart}>
                LOADING
            </div>
        )
    }

    return(
        <div className={cl.cart}>
            {
                myArticle.map(article => 
                    <CardProduct key={article} article={article}/>
                )
            }
        </div>
    )
}