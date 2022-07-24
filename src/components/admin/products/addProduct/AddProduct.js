import React, { useState, useContext, useEffect } from "react";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Context } from "../../../..";
import AddPhotoProducts from "./AddPhotoProducts";
import cl from "../../../styles/AddProduct.module.css"
import MyInput from '../../../UI/MyInput'
import MyButton from "../../../UI/MyButton";

export default function AddProduct() {
    const { firestore } = useContext(Context);
    const [productPhoto, setProductPhoto] = useState();
    const [productBrand, setProductBrand] = useState("");
    const [productModel, setProductModel] = useState("");
    const [productPrice, setProductPrice] = useState("");
    const [productSize, setProductSize] = useState("");
    const [productIntro, setProductIntro] = useState("");
    const [productArticle, setProductArticle] = useState("");
    const [productDate, setProductDate] = useState("");
    const [productGender, setProductGender] = useState("");
    const [productLabel, setProductLabel] = useState(["Без метки"]);
    const storage = getStorage();

    const addProduct = async () => {
        if (productPhoto && productBrand && productModel && productPrice && productSize && productIntro && productArticle && productDate && productGender && productLabel) {
            await setDoc(doc(firestore, "products", `product_${productArticle}`), {
                brand: productBrand,
                model: productModel,
                price: productPrice,
                size: productSize,
                intro: productIntro,
                article: productArticle,
                date: productDate,
                gender: productGender,
                label: productLabel
            });

            await setDoc(doc(firestore, "productsArticles", `product_${productArticle}`), {
                article: productArticle
            });

            await setDoc(doc(firestore, "productsBrand", `product_${productArticle}`), {
                article: productArticle,
                brand: productBrand
            });

            // ------------------

            await setDoc(doc(firestore, "productsForShop", `product_${productArticle}`), {
                article: productArticle
            });

            // Дублирующая коллекция для реализации удаления и отсутсвия сбоев в заказах у юзеров
            // ------------------

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
            setProductLabel("");
        } else {
            alert("Введите все данные о товаре!");
        }
    }

    const validateBrand = value => {
        if (!(productBrand === "" && value === " ")) {
            setProductBrand(value);
        }
    }

    const validateModel = value => {
        if (!(productModel === "" && value === " ")) {
            setProductModel(value);
        }
    }

    const validatePrice = value => {
        if (!(productPrice === "" && value === " ")) {
            setProductPrice(value);
        }
    }

    const validateSize = value => {
        if (!(productSize === "" && value === " ")) {
            setProductSize(value);
        }
    }

    const validateIntro = value => {
        if (!(productIntro === "" && value === " ")) {
            setProductIntro(value);
        }
    }

    const validateArticle = value => {
        if (!(productArticle === "" && value === " ")) {
            setProductArticle(value);
        }
    }

    const validateDate = value => {
        if (!(productDate === "" && value === " ")) {
            setProductDate(value);
        }
    }

    const clickGender = e => {
        setProductGender(e.target.innerHTML)
        e.target.closest(`.${cl.genders}`).querySelector(`.${cl.genderMen}`).classList.remove(cl.activeGender)
        e.target.closest(`.${cl.genders}`).querySelector(`.${cl.genderWomen}`).classList.remove(cl.activeGender)
        e.target.classList.add(cl.activeGender)
    }

    const clickLabel = e => {
        let arrLabels;

        if (e.target.innerHTML === "Без метки") {
            e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelNike}`).classList.remove(cl.activeLabel)
            e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelJordan}`).classList.remove(cl.activeLabel)
            e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelYeezy}`).classList.remove(cl.activeLabel)
            e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelNo}`).classList.add(cl.activeLabel)

            arrLabels = ["Без метки"];
        } else if (e.target.innerHTML === "Nike") {

            arrLabels = productLabel

            if (arrLabels.includes("Без метки")) {
                arrLabels = [];
            }

            if (e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelNike}`).classList.contains(cl.activeLabel)) {
                productLabel.splice(productLabel.indexOf("Nike"), 1);
            } else {
                arrLabels.push("Nike")
            }

            e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelNo}`).classList.remove(cl.activeLabel)
            e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelNike}`).classList.toggle(cl.activeLabel)

            if (arrLabels.length === 0) {
                e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelNike}`).classList.remove(cl.activeLabel)
                e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelJordan}`).classList.remove(cl.activeLabel)
                e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelYeezy}`).classList.remove(cl.activeLabel)
                e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelNo}`).classList.add(cl.activeLabel)
                arrLabels = ["Без метки"];
            }

        } else if (e.target.innerHTML === "Jordan") {

            arrLabels = productLabel

            if (arrLabels.includes("Без метки")) {
                arrLabels = [];
            }

            if (e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelJordan}`).classList.contains(cl.activeLabel)) {
                productLabel.splice(productLabel.indexOf("Jordan"), 1);
            } else {
                arrLabels.push("Jordan")
            }

            e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelNo}`).classList.remove(cl.activeLabel)
            e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelJordan}`).classList.toggle(cl.activeLabel)

            if (arrLabels.length === 0) {
                e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelNike}`).classList.remove(cl.activeLabel)
                e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelJordan}`).classList.remove(cl.activeLabel)
                e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelYeezy}`).classList.remove(cl.activeLabel)
                e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelNo}`).classList.add(cl.activeLabel)
                arrLabels = ["Без метки"];
            }

        } else if (e.target.innerHTML === "Yeezy") {

            arrLabels = productLabel

            if (arrLabels.includes("Без метки")) {
                arrLabels = [];
            }

            if (e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelYeezy}`).classList.contains(cl.activeLabel)) {
                productLabel.splice(productLabel.indexOf("Yeezy"), 1);
            } else {
                arrLabels.push("Yeezy")
            }

            e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelNo}`).classList.remove(cl.activeLabel)
            e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelYeezy}`).classList.toggle(cl.activeLabel)

            if (arrLabels.length === 0) {
                e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelNike}`).classList.remove(cl.activeLabel)
                e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelJordan}`).classList.remove(cl.activeLabel)
                e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelYeezy}`).classList.remove(cl.activeLabel)
                e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelNo}`).classList.add(cl.activeLabel)
                arrLabels = ["Без метки"];
            }
        }

        setProductLabel(arrLabels)
    }

    return (
        <div className={cl.allWindow}>
            <div className={cl.addProduct}>

                <AddPhotoProducts setProductPhoto={setProductPhoto} />

                <div className={cl.dataProduct}>
                    <div className={cl.oneInputBlock}>
                        <MyInput width="100%" height="15px" name="Бренд товара" fontSize="18px" value={productBrand} onChange={validateBrand} />
                    </div>

                    <div className={cl.oneInputBlock}>
                        <MyInput width="100%" height="15px" name="Модель товара" fontSize="18px" value={productModel} onChange={validateModel} />
                    </div>

                    <div className={cl.oneInputBlock}>
                        <MyInput width="100%" height="15px" name="Цена товара" fontSize="18px" value={productPrice} onChange={validatePrice} />
                    </div>

                    <div className={cl.oneInputBlock}>
                        <MyInput width="100%" height="15px" name="Размеры товара (38,39,40...)" fontSize="18px" value={productSize} onChange={validateSize} />
                    </div>

                    <div className={cl.oneInputBlock}>
                        <MyInput width="100%" height="15px" name="Описание товара" fontSize="18px" value={productIntro} onChange={validateIntro} />
                    </div>

                    <div className={cl.oneInputBlock}>
                        <MyInput width="100%" height="15px" name="Артикул товара" fontSize="18px" value={productArticle} onChange={validateArticle} />
                    </div>

                    <div className={cl.oneInputBlock}>
                        <MyInput width="100%" height="15px" name="Дата релиза товара" fontSize="18px" value={productDate} onChange={validateDate} />
                    </div>

                    <div className={cl.genders}>
                        <div onClick={e => clickGender(e)} className={cl.genderMen}>Мужской</div>
                        <div onClick={e => clickGender(e)} className={cl.genderWomen}>Женский</div>
                    </div>

                    <div className={cl.labels}>
                        <div onClick={e => clickLabel(e)} className={cl.labelNo + " " + cl.label + " " + cl.activeLabel}>Без метки</div>
                        <div onClick={e => clickLabel(e)} className={cl.labelNike + " " + cl.label}>Nike</div>
                        <div onClick={e => clickLabel(e)} className={cl.labelJordan + " " + cl.label}>Jordan</div>
                        <div onClick={e => clickLabel(e)} className={cl.labelYeezy + " " + cl.label}>Yeezy</div>
                    </div>

                    <div className={cl.buttonAdd} onClick={addProduct}>
                        <MyButton width="100%" height="40px" bgColor="rgb(145, 22, 22)" color="white" name="Добавить товар" />
                    </div>
                </div>
            </div>
        </div>
    )
}