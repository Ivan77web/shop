import React, { useContext, useEffect, useState } from "react";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import cl from "../../../styles/ProductPageAdmin.module.css"
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { Context } from "../../../..";
import MyInput from "../../../UI/MyInput";
import MyButton from "../../../UI/MyButton";
import Loader from "../../../UI/loader/Loader";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function ProductPageAdmin({ product }) {
    const { firestore } = useContext(Context);
    const storage = getStorage();
    const [src, setSrc] = useState();
    const [brand, setBrand] = useState(product.brand);
    const [model, setModel] = useState(product.model);
    const [price, setPrice] = useState(product.price);
    const [size, setSize] = useState(product.size);
    const [intro, setIntro] = useState(product.intro);
    const [date, setDate] = useState(product.date);
    const [gender, setGender] = useState(product.gender);
    const [label, setLabel] = useState(product.label);
    const [products, loading] = useCollectionData(
        firestore.collection("products")
    )
    const [rightProduct, setRightProduct] = useState({});

    const deleteProduct = async () => {
        // const desertRef = ref(storage, `photo_${product.article}`);
        // await deleteDoc(doc(firestore, `products`, `product_${product.article}`));
        // await deleteDoc(doc(firestore, `productsArticles`, `product_${product.article}`));
        // deleteObject(desertRef);
        await deleteDoc(doc(firestore, `productsForShop`, `product_${product.article}`));
    }

    // Удаление товара, так как удаляем не из всех продуктов, а из продуктов "для магазина", то остальное закомментил

    const validateBrand = value => {
        if (!(brand === "" && value === " ")) {
            setBrand(value);
        }
    }

    const validateModel = value => {
        if (!(model === "" && value === " ")) {
            setModel(value);
        }
    }

    const validatePrice = value => {
        if (!(price === "" && value === " ")) {
            setPrice(value);
        }
    }

    const validateSize = value => {
        if (!(size === "" && value === " ")) {
            setSize(value);
        }
    }

    const validateDate = value => {
        if (!(date === "" && value === " ")) {
            setDate(value);
        }
    }

    const validateIntro = value => {
        if (!(intro === "" && value === " ")) {
            setIntro(value);
        }
    }

    const editProduct = e => {
        const card = e.target.closest(`.${cl.productCard}`)
        const info = card.querySelector(`.${cl.info}`);
        const edit = card.querySelector(`.${cl.edit}`);
        const buttonEdit = card.querySelector(`.${cl.buttonEdit}`)

        info.classList.toggle(cl.active)
        edit.classList.toggle(cl.active)
        buttonEdit.classList.add(cl.active)

        card.style.maxHeight = "1000px";
    }

    const cancel = e => {
        const card = e.target.closest(`.${cl.productCard}`)
        const info = card.querySelector(`.${cl.info}`);
        const edit = card.querySelector(`.${cl.edit}`);
        const buttonEdit = card.querySelector(`.${cl.buttonEdit}`)

        info.classList.toggle(cl.active)
        edit.classList.toggle(cl.active)
        buttonEdit.classList.remove(cl.active)

        setBrand(product.brand);
        setModel(product.model);
        setPrice(product.price);
        setSize(product.size);
        setIntro(product.intro);
        setDate(product.date);
        setGender(product.gender);

        card.style.maxHeight = "200px";
    }

    const save = async (e) => {
        if (brand && model && price && size && intro && date && gender) {
            await updateDoc(doc(firestore, "products", `product_${product.article}`), {
                brand: brand,
                date: date,
                gender: gender,
                intro: intro,
                model: model,
                price: price,
                size: size,
                label: label
            });

            cancel(e)
        } else {
            alert("Требуется ввести все измененные данные")
        }
    }

    const clickGender = e => {
        setGender(e.target.innerHTML)
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

            arrLabels = label

            if (arrLabels.includes("Без метки")) {
                arrLabels = [];
            }

            if (e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelNike}`).classList.contains(cl.activeLabel)) {
                label.splice(label.indexOf("Nike"), 1);
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

            arrLabels = label

            if (arrLabels.includes("Без метки")) {
                arrLabels = [];
            }

            if (e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelJordan}`).classList.contains(cl.activeLabel)) {
                label.splice(label.indexOf("Jordan"), 1);
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

            arrLabels = label

            if (arrLabels.includes("Без метки")) {
                arrLabels = [];
            }

            if (e.target.closest(`.${cl.labels}`).querySelector(`.${cl.labelYeezy}`).classList.contains(cl.activeLabel)) {
                label.splice(label.indexOf("Yeezy"), 1);
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

        setLabel(arrLabels)
    }

    useEffect(() => {
        if (!loading) {
            products.map(prod => {
                if (product.article === prod.article) {
                    setRightProduct(prod)
                }
            })
        }
    }, [loading])

    getDownloadURL(ref(storage, `photo_${product.article}`)).then((url) => setSrc(url));

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <div className={cl.productCard}>
            <div className={cl.info}>
                <img alt="Фото товара" className={cl.img} src={src} />

                <div className={cl.data}>
                    <div>
                        Артикул - {rightProduct.article}
                    </div>

                    <div>
                        Бренд - {rightProduct.brand}
                    </div>

                    <div>
                        Модель - {rightProduct.model}
                    </div>

                    <div>
                        Цена - {rightProduct.price}
                    </div>

                    <div>
                        Размеры - {rightProduct.size}
                    </div>

                    <div>
                        Дата релиза - {rightProduct.date}
                    </div>

                    <div>
                        Пол - {rightProduct.gender}
                    </div>

                    <div>
                        Описание - {rightProduct.intro}
                    </div>

                    <div>
                        Метка - {rightProduct.label}
                    </div>
                </div>
            </div>

            <div className={cl.edit + " " + cl.active}>
                <table className={cl.table}>
                    <tbody>
                        <tr>
                            <td>Бренд - </td>
                            <td><MyInput width="70%" height="30px" name="Бренд" fontSize="15px" value={brand} onChange={validateBrand} /></td>
                        </tr>

                        <tr>
                            <td>Модель - </td>
                            <td><MyInput width="70%" height="30px" name="Модель" fontSize="15px" value={model} onChange={validateModel} /></td>
                        </tr>

                        <tr>
                            <td>Цена - </td>
                            <td><MyInput width="70%" height="30px" name="Цена" fontSize="15px" value={price} onChange={validatePrice} /></td>
                        </tr>

                        <tr>
                            <td>Размеры - </td>
                            <td><MyInput width="70%" height="30px" name="Размеры товара (38,39,40...)" fontSize="15px" value={size} onChange={validateSize} /></td>
                        </tr>

                        <tr>
                            <td>Дата релиза - </td>
                            <td><MyInput width="70%" height="30px" name="Дата релиза" fontSize="15px" value={date} onChange={validateDate} /></td>
                        </tr>

                        <tr>
                            <td>Описание - </td>
                            <td><MyInput width="70%" height="30px" name="Описание" fontSize="15px" value={intro} onChange={validateIntro} /></td>
                        </tr>

                        <tr className={cl.gender}>
                            <td>Пол - </td>
                            <td>
                                <div className={cl.genders}>
                                    <div onClick={e => clickGender(e)} className={gender === "Мужской" ? cl.genderActiveMen : cl.genderMen}>Мужской</div>
                                    <div onClick={e => clickGender(e)} className={gender === "Женский" ? cl.genderActiveWomen : cl.genderWomen}>Женский</div>
                                </div>
                            </td>
                        </tr>

                        <tr className={cl.label}>
                            <td>Метка - </td>
                            <td>
                                <div className={cl.labels}>
                                    <div onClick={e => clickLabel(e)} className={label.includes("Без метки") ? cl.labelNo + " " + cl.label + " " + cl.activeLabel : cl.labelNo + " " + cl.label}>Без метки</div>
                                    <div onClick={e => clickLabel(e)} className={label.includes("Nike") ? cl.labelNike + " " + cl.label + " " + cl.activeLabel : cl.labelNike + " " + cl.label}>Nike</div>
                                    <div onClick={e => clickLabel(e)} className={label.includes("Jordan") ? cl.labelJordan + " " + cl.label + " " + cl.activeLabel : cl.labelJordan + " " + cl.label}>Jordan</div>
                                    <div onClick={e => clickLabel(e)} className={label.includes("Yeezy") ? cl.labelYeezy + " " + cl.label + " " + cl.activeLabel : cl.labelYeezy + " " + cl.label}>Yeezy</div>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div className={cl.buttons}>
                    <div className={cl.buttonCancel} onClick={e => cancel(e)}>
                        <MyButton width="100px" height="30px" bgColor="rgb(145, 22, 22)" color="white" name="Отменить" />
                    </div>

                    <div className={cl.buttonSave} onClick={e => save(e)}>
                        <MyButton width="100px" height="30px" bgColor="rgb(94, 139, 99)" color="white" name="Сохранить" />
                    </div>
                </div>
            </div>

            <div className={cl.settings}>
                <div className={cl.buttonEdit} onClick={e => editProduct(e)}>
                    Редактировать
                </div>

                <div className={cl.buttonDelete} onClick={deleteProduct}>
                    Удалить
                </div>
            </div>

        </div>
    )
}
