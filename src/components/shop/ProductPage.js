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
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import ButtonAddProduct from "../UI/ButtonAddProduct";

export default function ProductPage(){
    const {auth, firestore} = useContext(Context);
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

    getDownloadURL(ref(storage, `photo_${article}`)).then((url) => setSrc(url));

    useEffect(()=>{
        if(products){
            products.map(prod => {
                if(prod.article == article){
                    setProductInfo(prod)
                    setLoadingTwo(false)
                }
            })
        }
    }, [products])

    const addProductInCart = async () => {
        if(inputSize){
            await setDoc(doc(firestore, `cart_${user.uid}`, `${article}_size${inputSize}`), {
                article: article,
                size: inputSize,
                number: 1
            });
        }else{
            setErrorSize(true);
        }
    }

    const deleteProductOnCart = async () => {
        await deleteDoc(doc(firestore, `cart_${user.uid}`, `${article}_size${inputSize}`));
    }

    if(loading || loadingTwo || !productInfo){
        <div>Загрузка</div>
    }

    if(productInfo && src){
        return(
            <div className={cl.productPage}>
                <img src={src} className={cl.photo}/>

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

                    <TableSize errorSize={errorSize} setErrorSize={setErrorSize} inputSize={inputSize} setInputSize={setInputSize} arrSizes={productInfo.size}/>

                    {
                        user
                        ?
                            <div className={cl.button}>
                                <ButtonAddProduct user={user} inputSize={inputSize} article={article} addProductInCart={addProductInCart} deleteProductOnCart={deleteProductOnCart}/>
                            </div>
                        :
                            <Link to="/profile">
                                <div className={cl.button}>
                                    <MyButton width="100%" height="50px" bgColor="rgb(145, 22, 22)" color="white" name="Добавить в корзину"/>
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
        )
    }
}