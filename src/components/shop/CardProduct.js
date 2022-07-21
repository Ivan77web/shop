import React, { useState, useContext, useEffect } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Link } from "react-router-dom";
import cl from "../styles/CardProduct.module.css"
import Loader from "../UI/loader/Loader";

export default function CardProduct({ article, mainFilter, checkFilter, searchRightProduct }) {
    const storage = getStorage();
    const [src, setSrc] = useState();

    getDownloadURL(ref(storage, `photo_${article}`)).then((url) => setSrc(url));

    if (!(checkFilter(searchRightProduct(article), mainFilter))) {
        return (
            <div />
        )
    }

    if(!src){
        return(
            <Loader/>
        )
    }

    if (src) {
        return (
            <Link to={`/shop/${article}`}>
                <div className={cl.card}>
                    <img alt="Фото товара" src={src} className={cl.photo} />

                    <div className={cl.introduction}>
                        <h1 className={cl.brand}>{searchRightProduct(article).brand}</h1>
                        <p className={cl.model}>{searchRightProduct(article).model}</p>
                        <p className={cl.article}>{searchRightProduct(article).article}</p>
                        <p className={cl.price}>{searchRightProduct(article).price} руб.</p>
                    </div>
                </div>
            </Link>
        )
    }
}