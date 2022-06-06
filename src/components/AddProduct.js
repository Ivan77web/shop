import React, { useEffect, useState, useContext } from "react";
import { Context } from "..";
import cl from "./styles/AddProduct.module.css"

export default function AddProduct(){
    const {auth, firestore} = useContext(Context);
    const [productName, setProductName] = useState("");
    const [productIntro, setProductIntro] = useState("");
    const [productSize, setProductSize] = useState("");
    const [productArticle, setProductArticle] = useState("");
    const [productPrice, setProductPrice] = useState("");

    const addProduct = async () => {
        firestore.collection("products").add({
            name: productName,
            intro: productIntro,
            size: productSize,
            article: productArticle,
            price: productPrice,
        })

        firestore.collection("productsArticles").add({
            article: productArticle
        })

        setProductName("");
        setProductIntro("");
        setProductSize("");
        setProductArticle("");
        setProductPrice("");
    }

    return(
        <div className={cl.addProduct}>
            <div>
                <p>Название товара</p>
                <input value={productName} onChange={e => setProductName(e.target.value)}/>
            </div>

            <div>
                <p>Описание</p>
                <input value={productIntro} onChange={e => setProductIntro(e.target.value)}/>
            </div>

            <div>
                <p>Размеры</p>
                <input value={productSize} onChange={e => setProductSize(e.target.value)}/>
            </div>

            <div>
                <p>Артикул</p>
                <input value={productArticle} onChange={e => setProductArticle(e.target.value)}/>
            </div>

            <div>
                <p>Цена</p>
                <input value={productPrice} onChange={e => setProductPrice(e.target.value)}/>
            </div>

            <button onClick={addProduct}>Добавить товар</button>
        </div>
    )
}