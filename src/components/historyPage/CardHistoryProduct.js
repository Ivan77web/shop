import React, { useState } from "react";
import cl from "../styles/CardHistoryProduct.module.css"
import { getStorage, ref, getDownloadURL } from "firebase/storage";

export default function CardHistoryProduct({ article, search }) {
    const storage = getStorage();
    const [src, setSrc] = useState();
    getDownloadURL(ref(storage, `photo_${article}`)).then((url) => setSrc(url));

    // console.log(article);

    return (
        <a href={`/shop/${article}`}>
            <div className={cl.card}>
                <img className={cl.img} src={src} />
                <p className={cl.brand}>{search(article).brand}</p>
                <p className={cl.model}>{search(article).model}</p>
                <p className={cl.price}>{search(article).price} руб.</p>
            </div>
        </a>
    )
}