import React, { useState, useContext, useEffect } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from "..";
import cl from "./styles/Shop.module.css"
import CardProduct from "./CardProduct";

export default function Shop(){
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    // const [products, loading] = useCollectionData(
    //     firestore.collection("products")
    // )
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

    const addProductInCart = async (e) => {
        const article = e.target.closest(`.${cl.oneProduct}`).querySelector(`.${cl.article}`).innerHTML;
        
        firestore.collection(`cart_${user.uid}`).add({
            article: article
        })
    }

    if(loading || loadingOnlyArticles){
        return <div>Секунду</div>
    }

    return(
        <div className={cl.shop}>
            {
                onlyArticles.map(article => 
                    <CardProduct key={article} article={article}/>
                )
            }
        </div>
    )

    // return(
    //     <div className={cl.shop}>
    //         {
    //             products.map(product => 
    //                 <div key={product.article} className={cl.oneProduct}>
    //                     <h1>{product.name}</h1>
    //                     <p>{product.intro}</p>
    //                     <p>{product.size}</p>
    //                     <p className={cl.article}>{product.article}</p>
    //                     <p>{product.price}&#x20bd;</p>

    //                     <h3 onClick={(e) => addProductInCart(e)} className={cl.addCart}>Добавить в корзину</h3>
    //                 </div>    
    //             )
    //         }
    //     </div>
    // )
}