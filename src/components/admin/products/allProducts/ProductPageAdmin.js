import React, { useContext, useState } from "react";
import { getStorage, ref, getDownloadURL, deleteObject } from "firebase/storage";
import cl from "../../../styles/ProductPageAdmin.module.css"
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Context } from "../../../..";
import MyInput from "../../../UI/MyInput";
import MyButton from "../../../UI/MyButton";

export default function ProductPageAdmin({product}) {
    const {firestore} = useContext(Context);
    const storage = getStorage();
    const [src, setSrc] = useState();
    const [brand, setBrand] = useState(product.brand);
    const [model, setModel] = useState(product.model);
    const [price, setPrice] = useState(product.price);
    const [size, setSize] = useState(product.size);
    const [intro, setIntro] = useState(product.intro);
    const [date, setDate] = useState(product.date);
    const [gender, setGender] = useState(product.gender);

    const deleteProduct = async () => {
        const desertRef = ref(storage, `photo_${product.article}`);

        await deleteDoc(doc(firestore, `products`, `product_${product.article}`));

        await deleteDoc(doc(firestore, `productsArticles`, `product_${product.article}`));

        // deleteObject(desertRef).then(() => {
        //     console.log("Удалено успешно");
        //   }).catch((error) => {
        //     console.log("Произошла ошибка - " + error);
        //   });
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

        card.style.maxHeight = "200px";
    }

    const save = async () => {
        if(brand && model && price && size && intro && date && gender){
            await updateDoc(doc(firestore, "products", `product_${product.article}`), {
                brand: brand,
                date: date,
                gender: gender,
                intro: intro,
                model: model,
                price: price,
                size: size
            });

            cancel()
        } else{
            alert("Требуется ввести все измененные данные")
        }
    }

    getDownloadURL(ref(storage, `photo_${product.article}`)).then((url) => setSrc(url));

    return(
        <div className={cl.productCard}>
            <div className={cl.info}>
                <img className={cl.img} src={src}/>

                <div className={cl.data}>
                    <div>
                        Артикул - {product.article}
                    </div>

                    <div>
                        Бренд - {product.brand}
                    </div>

                    <div>
                        Модель - {product.model}
                    </div>

                    <div>
                        Цена - {product.price}
                    </div>

                    <div>
                        Размеры - {product.size}
                    </div>

                    <div>
                        Дата релиза - {product.date}
                    </div>

                    <div>
                        Пол - {product.gender}
                    </div>

                    <div>
                        Описание - {product.intro}
                    </div>
                </div>
            </div>

            {/* <div className={cl.edit + " " + cl.active}>
                <div className={cl.inputEdit}>
                    Бренд -
                    <MyInput width="70%" height="30px" name="Бренд" fontSize="15px" value={brand} onChange={setBrand}/>
                </div>

                <div className={cl.inputEdit}>
                    Модель - 
                    <MyInput width="70%" height="30px" name="Модель" fontSize="15px" value={model} onChange={setModel}/>
                </div>

                <div className={cl.inputEdit}>
                    Цена - 
                    <MyInput width="70%" height="30px" name="Цена" fontSize="15px" value={price} onChange={setPrice}/>
                </div>

                <div className={cl.inputEdit}>
                    Размеры - 
                    <MyInput width="70%" height="30px" name="Размеры" fontSize="15px" value={size} onChange={setSize}/>
                </div>

                <div className={cl.inputEdit}>
                    Дата релиза - 
                    <MyInput width="70%" height="30px" name="Дата релиза" fontSize="15px" value={date} onChange={setDate}/>
                </div>

                <div className={cl.inputEdit}>
                    Пол - 
                    <MyInput width="70%" height="30px" name="Пол" fontSize="15px" value={gender} onChange={setGender}/>
                </div>

                <div className={cl.inputEdit}>
                    Описание - 
                    <MyInput width="70%" height="30px" name="Описание" fontSize="15px" value={intro} onChange={setIntro}/>
                </div>

                <div className={cl.buttons}>
                    <div onClick={e => cancel(e)}>
                        <MyButton width="100px" height="30px" bgColor="rgb(145, 22, 22)" color="white" name="Отменить"/>
                    </div>
                    
                    <div onClick={save}>
                        <MyButton width="100px" height="30px" bgColor="rgb(94, 139, 99)" color="white" name="Сохранить"/>
                    </div>
                </div>
            </div> */}

            <div className={cl.edit + " " + cl.active}>
                <table className={cl.table}>
                    <tbody>
                        <tr>
                            <td>Бренд - </td>
                            <td><MyInput width="70%" height="30px" name="Бренд" fontSize="15px" value={brand} onChange={setBrand}/></td>
                        </tr>

                        <tr>
                            <td>Модель - </td>
                            <td><MyInput width="70%" height="30px" name="Модель" fontSize="15px" value={model} onChange={setModel}/></td>
                        </tr>

                        <tr>
                            <td>Цена - </td>
                            <td><MyInput width="70%" height="30px" name="Цена" fontSize="15px" value={price} onChange={setPrice}/></td>
                        </tr>

                        <tr>
                            <td>Размеры - </td>
                            <td><MyInput width="70%" height="30px" name="Размеры" fontSize="15px" value={size} onChange={setSize}/></td>
                        </tr>

                        <tr>
                            <td>Дата релиза - </td>
                            <td><MyInput width="70%" height="30px" name="Дата релиза" fontSize="15px" value={date} onChange={setDate}/></td>
                        </tr>

                        <tr>
                            <td>Пол - </td>
                            <td><MyInput width="70%" height="30px" name="Пол" fontSize="15px" value={gender} onChange={setGender}/></td>
                        </tr>

                        <tr>
                            <td>Описание - </td>
                            <td><MyInput width="70%" height="30px" name="Описание" fontSize="15px" value={intro} onChange={setIntro}/></td>
                        </tr>
                            
                    </tbody>
                </table>

                <div className={cl.buttons}>
                    <div className={cl.buttonCancel} onClick={e => cancel(e)}>
                        <MyButton width="100px" height="30px" bgColor="rgb(145, 22, 22)" color="white" name="Отменить"/>
                    </div>
                        
                    <div className={cl.buttonSave} onClick={save}>
                        <MyButton width="100px" height="30px" bgColor="rgb(94, 139, 99)" color="white" name="Сохранить"/>
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
