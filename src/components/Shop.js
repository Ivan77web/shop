import React, { useState, useContext, useEffect } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Context } from "..";
import cl from "./styles/Shop.module.css"
import CardProduct from "./CardProduct";

export default function Shop(){
    const {auth, firestore} = useContext(Context);
    const [productsArticles, loading] = useCollectionData(
        firestore.collection("productsArticles")
    )
    const [loadingOnlyArticles, setLoadingOnlyArticles] = useState(true);
    const [onlyArticles, setOnlyArticles] = useState([]);

    useEffect(()=>{
        if(productsArticles){
            let articles = []
            for(let i = 0; i < productsArticles.length; i++){
                articles.push(productsArticles[i].article)
            }
            setOnlyArticles(articles);
            setLoadingOnlyArticles(false);
        }
    },[productsArticles])

    // const addProductInCart = async (e) => {
    //     const article = e.target.closest(`.${cl.oneProduct}`).querySelector(`.${cl.article}`).innerHTML;
        
    //     firestore.collection(`cart_${user.uid}`).add({
    //         article: article
    //     })
    // }

    if(loading || loadingOnlyArticles){
        return <div>Секунду</div>
    }

    return(
        <div className={cl.shop}>
            {
                onlyArticles.map(article => 
                    <CardProduct key={article} article={article} cart={true}/>
                )
            }
        </div>
    )
}