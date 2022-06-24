import React, { useEffect, useState, useContext } from "react";
import { getStorage, ref, uploadBytes, getDownloadURL, getMetadata } from "firebase/storage";
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Context } from "../../../..";
import AddPhotoProducts from "./AddPhotoProducts";
import cl from "../../../styles/AddProduct.module.css"
import MyInput from '../../../UI/MyInput'
import MyButton from "../../../UI/MyButton";


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

    // const addProduct = async () => {
    //     if(productPhoto && productBrand && productModel && productPrice && productSize && productIntro && productArticle && productDate && productGender){
    //         firestore.collection("products").add({
    //             brand: productBrand,
    //             model: productModel,
    //             price: productPrice,
    //             size: productSize,
    //             intro: productIntro,
    //             article: productArticle,
    //             date: productDate,
    //             gender: productGender
    //         })
    
    //         firestore.collection("productsArticles").add({
    //             article: productArticle
    //         })
    
    //         const storageRef = ref(storage, `photo_${productArticle}`);
    //         uploadBytes(storageRef, productPhoto);

    //         setProductBrand("");
    //         setProductModel("");
    //         setProductPrice("");
    //         setProductSize("");
    //         setProductIntro("");
    //         setProductArticle("");
    //         setProductDate("");
    //         setProductGender("");
    //     } else {
    //         alert("Введите все данные о товаре!");
    //     }
    // }

// ------------------------------------------------------------------------------------------------------------------------------------------------

    const addProduct = async () => {
        if(productPhoto && productBrand && productModel && productPrice && productSize && productIntro && productArticle && productDate && productGender){
            await setDoc(doc(firestore, "products", `product_${productArticle}`), {
                brand: productBrand,
                model: productModel,
                price: productPrice,
                size: productSize,
                intro: productIntro,
                article: productArticle,
                date: productDate,
                gender: productGender
            });

            await setDoc(doc(firestore, "productsArticles", `product_${productArticle}`), {
                article: productArticle
            });

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

    // --------------------------------------------------------------------------------------------------

    return(
        <div className={cl.addProduct}>

            <AddPhotoProducts setProductPhoto={setProductPhoto}/>
            
            <div className={cl.dataProduct}>
                <div className={cl.oneInputBlock}>
                    <MyInput width="100%" height="15px" name="Бренд товара" fontSize="18px" value={productBrand} onChange={setProductBrand}/>
                </div>

                <div className={cl.oneInputBlock}>
                    <MyInput width="100%" height="15px" name="Модель товара" fontSize="18px" value={productModel} onChange={setProductModel}/>
                </div>

                <div className={cl.oneInputBlock}>
                    <MyInput width="100%" height="15px" name="Цена товара" fontSize="18px" value={productPrice} onChange={setProductPrice}/>
                </div>

                <div className={cl.oneInputBlock}>
                    <MyInput width="100%" height="15px" name="Размеры товара" fontSize="18px" value={productSize} onChange={setProductSize}/>
                </div>

                <div className={cl.oneInputBlock}>
                    <MyInput width="100%" height="15px" name="Описание товара" fontSize="18px" value={productIntro} onChange={setProductIntro}/>
                </div>

                <div className={cl.oneInputBlock}>
                    <MyInput width="100%" height="15px" name="Артикул товара" fontSize="18px" value={productArticle} onChange={setProductArticle}/>
                </div>

                <div className={cl.oneInputBlock}>
                    <MyInput width="100%" height="15px" name="Дата релиза товара" fontSize="18px" value={productDate} onChange={setProductDate}/>
                </div>

                <div className={cl.oneInputBlock}>
                    <MyInput width="100%" height="15px" name="Пол" fontSize="18px" value={productGender} onChange={setProductGender}/>
                </div>

                {/* <button onClick={addProduct}>Добавить товар</button> */}
                <div className={cl.buttonAdd} onClick={addProduct}>
                    <MyButton width="100%" height="40px" bgColor="rgb(145, 22, 22)" color="white" name="Добавить товар"/>
                </div>
            </div>
        </div>
    )
}