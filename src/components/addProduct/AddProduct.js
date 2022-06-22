import React, { useEffect, useState, useContext } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL, getMetadata } from "firebase/storage";
import { Context } from "../..";
import AddPhotoProducts from "./AddPhotoProducts";
import cl from "../styles/AddProduct.module.css"

export default function AddProduct(){
    const {auth, firestore} = useContext(Context);
    const [productPhoto, setProductPhoto] = useState();
    const [productBrand, setProductBrand] = useState("");
    const [productModel, setProductModel] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productSize, setProductSize] = useState("");
    const [productIntro, setProductIntro] = useState("");
    const [productArticle, setProductArticle] = useState("");
    const [productDate, setProductDate] = useState("");
    const [productGender, setProductGender] = useState("");
    const storage = getStorage();

    const addProduct = async () => {
        if(productPhoto && productBrand && productModel && productPrice && productSize && productIntro && productArticle && productDate && productGender){
            firestore.collection("products").add({
                brand: productBrand,
                model: productModel,
                price: productPrice,
                size: productSize,
                intro: productIntro,
                article: productArticle,
                date: productDate,
                gender: productGender
            })
    
            firestore.collection("productsArticles").add({
                article: productArticle
            })
    
            const storageRef = ref(storage, `photo_${productArticle}`);
            uploadBytes(storageRef, productPhoto);

            setProductBrand("");
            setProductModel("");
            setProductPrice("");
            setProductSize("");
            setProductIntro("");
            setProductArticle("");
            setProductDate("");
            setProductGender("");
        } else {
            alert("Введите все данные о товаре!");
        }
    }

    return(
        <div className={cl.addProduct}>

            <AddPhotoProducts setProductPhoto={setProductPhoto}/>
            
            <div className={cl.dataProduct}>
                <div>
                    <p>Бренд</p>
                    <input value={productBrand} onChange={e => setProductBrand(e.target.value)}/>
                </div>

                <div>
                    <p>Модель</p>
                    <input value={productModel} onChange={e => setProductModel(e.target.value)}/>
                </div>

                <div>
                    <p>Цена</p>
                    <input value={productPrice} onChange={e => setProductPrice(e.target.value)}/>
                </div>

                <div>
                    <p>Размеры</p>
                    <input value={productSize} onChange={e => setProductSize(e.target.value)}/>
                </div>

                <div>
                    <p>Описание</p>
                    <input value={productIntro} onChange={e => setProductIntro(e.target.value)}/>
                </div>

                <div>
                    <p>Артикул</p>
                    <input value={productArticle} onChange={e => setProductArticle(e.target.value)}/>
                </div>

                <div>
                    <p>Дата релиза</p>
                    <input value={productDate} onChange={e => setProductDate(e.target.value)}/>
                </div>

                <div>
                    <p>Пол</p>
                    <input value={productGender} onChange={e => setProductGender(e.target.value)}/>
                </div>

                <button onClick={addProduct}>Добавить товар</button>
            </div>
        </div>
    )
}