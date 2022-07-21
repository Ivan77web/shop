import React, { useContext, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../..";
import cl from "../styles/HistoryProducts.module.css"
import Loader from "../UI/loader/Loader";
import CardHistoryProduct from "./CardHistoryProduct";

export default function HistoryProducts() {
    const { firestore } = useContext(Context);
    const [products, loading] = useCollectionData(
        firestore.collection("products")
    )
    const [cookie, setCookie] = useState()
    const [loadingTwo, setLoadingTwo] = useState(true)

    function searchDataProductInAllProduct(article) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].article === article) {
                return products[i]
            }
        }
    }

    useEffect(() => {
        let arrCookie = document.cookie.split("=");
        arrCookie = arrCookie[1].split(" ");

        setCookie(arrCookie);
        setLoadingTwo(false)
    }, [])

    if (loading || loadingTwo) {
        return (
            <Loader />
        )
    }

    return (
        <div className={cl.history}>
            <h4 className={cl.intro}>Недавно просмотренные</h4>

            {
                cookie.length === 0
                ?
                    <p className={cl.introNot}>Нет просмотренных товаров</p>
                :
                    <div className={cl.products}>
                        {
                            cookie.map(id =>
                                <CardHistoryProduct article={id} search={searchDataProductInAllProduct} key={id} />
                            )
                        }
                    </div>
            }           
        </div>
    )
}