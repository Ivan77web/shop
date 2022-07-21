import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { useParams } from "react-router";
import { Context } from "../..";
import cl from "../styles/ProductPage.module.css"
import TableSize from "./TableSize";
import MyButton from "../UI/MyButton";
import { Link } from "react-router-dom";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import ButtonAddProduct from "../UI/ButtonAddProduct";
import Loader from "../UI/loader/Loader";
import HistoryProducts from "../historyPage/HistoryProducts";

export default function ProductPage() {
    const { auth, firestore } = useContext(Context);
    const [user] = useAuthState(auth);
    const { article } = useParams();
    const [products, loading] = useCollectionData(
        firestore.collection("products")
    )
    const [productInfo, setProductInfo] = useState();
    const [loadingTwo, setLoadingTwo] = useState(true);
    const storage = getStorage();
    const [src, setSrc] = useState();
    const [inputSize, setInputSize] = useState(null);
    const [errorSize, setErrorSize] = useState(false);

    useEffect(() => {
        let objCookie = {};
        let cookies = document.cookie.split("; ")

        for(let i = 0; i < cookies.length; i++){
            let cookie = cookies[i].split("=");
            objCookie[cookie[0]] = cookie[1];
        }

        if( !(objCookie.prod) ){
            document.cookie = `prod=${article};max-age=172800`;
        } else {

            if( !(objCookie.prod.includes(article)) ){
                let arrProd = objCookie.prod.split(" ")
                let length = objCookie.prod.split(" ").length
                
                if(length < 4){
                    document.cookie = `prod=${objCookie.prod + " " + article};max-age=172800`;
                } else if (length >= 4){
                    document.cookie = `prod=${arrProd[1] + " " + arrProd[2] + " " + arrProd[3] + " " + article};max-age=172800`;
                }
            } else {
                let arrProd = objCookie.prod.split(" ")
                let str = "";

                arrProd.splice(arrProd.indexOf(article) ,1)
                
                for(let i = 0; i < arrProd.length; i++){
                    str = str + " " + arrProd[i]
                }

                document.cookie = `prod=${str + " " + article};max-age=172800`;
            }
        }
    }, [])

    const deleteCookies = () => {  // Если еще потребуется работа с куками
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i];
            var eqPos = cookie.indexOf("=");
            var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;";
            document.cookie = name + '=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }

    getDownloadURL(ref(storage, `photo_${article}`)).then((url) => setSrc(url));

    useEffect(() => {
        if (products) {
            products.map(prod => {
                if (prod.article === article) {
                    setProductInfo(prod)
                    setLoadingTwo(false)
                }
            })
        }
    }, [products])

    const addProductInCart = async () => {
        if (inputSize) {
            await setDoc(doc(firestore, `cart_${user.uid}`, `${article}_size${inputSize}`), {
                article: article,
                size: inputSize,
                number: 1
            });
        } else {
            setErrorSize(true);
        }
    }

    const deleteProductOnCart = async () => {
        await deleteDoc(doc(firestore, `cart_${user.uid}`, `${article}_size${inputSize}`));
    }

    if (loading || loadingTwo || !productInfo) {
        <Loader />
    }

    if (productInfo && src) {
        return (
            <div className={cl.productPage}>
                <div className={cl.data}>
                    <div className={cl.photoBlock}>
                        <img alt="Фото товара" src={src} className={cl.photo} />
                    </div>

                    <div className={cl.introduction}>
                        <div className={cl.brand}>
                            {productInfo.brand}
                        </div>

                        <div className={cl.model}>
                            {productInfo.model}
                        </div>

                        <div className={cl.price}>
                            {`${productInfo.price} руб.`}
                        </div>

                        <TableSize errorSize={errorSize} setErrorSize={setErrorSize} inputSize={inputSize} setInputSize={setInputSize} arrSizes={productInfo.size} />

                        {
                            user
                                ?
                                <div className={cl.button}>
                                    <ButtonAddProduct user={user} inputSize={inputSize} article={article} addProductInCart={addProductInCart} deleteProductOnCart={deleteProductOnCart} />
                                </div>
                                :
                                <Link to="/profile">
                                    <div className={cl.button}>
                                        <MyButton width="100%" height="50px" bgColor="rgb(145, 22, 22)" color="white" name="Добавить в корзину" />
                                    </div>
                                </Link>
                        }

                        <div className={cl.intro}>
                            {productInfo.intro}
                        </div>

                        <div className={cl.article}>
                            <h5>Артикул </h5>
                            {productInfo.article}
                        </div>

                        <div className={cl.date}>
                            <h5>Дата релиза </h5>
                            {productInfo.date}
                        </div>

                        <div className={cl.gender}>
                            <h5>Пол </h5>
                            {productInfo.gender}
                        </div>
                    </div>
                </div>

                {/* <button onClick={deleteCookies}>DELETE</button> */}
                <HistoryProducts />
            </div>
        )
    }
}