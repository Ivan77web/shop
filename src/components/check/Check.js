import React, { useState, useContext, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Context } from "../..";
import CheckBlock from "./CheckBlock";
import cl from "../styles/Check.module.css"
import DataBlock from "./DataBlock";

import { collection, addDoc } from "firebase/firestore"; 
import Loader from "../UI/loader/Loader";

export default function Check() {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [allPrice, setAllPrice] = useState(0)
    const [email, setEmail] = useState("");
    const [lastname, setLastname] = useState("");
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [adress, setAdress] = useState("");
    const [valueRadio, setValueRadio] = useState("online");
    const [cardNumber, setCardNumber] = useState("");
    const [cardDate, setCardDate] = useState("");
    const [cardName, setCardName] = useState("");
    const [cardCVV, setCardCVV] = useState("");

    const [products, loadingOne] = useCollectionData(
        firestore.collection(`products`)
    )
    const [productsMyCart, loadingTwo] = useCollectionData(
        firestore.collection(`cart_${user.uid}`)
    )    

    const addOrder = async () => {
        if(valueRadio == "online"){
            if(email && lastname && name && number && adress && valueRadio && cardNumber && cardDate && cardName && cardCVV){
                const time = `order_${(new Date().getFullYear() + "_" + (new Date().getMonth()+1) + "_" + new Date().getDate() + "-" + new Date().getHours() + ":" +  new Date().getMinutes()  + ":" + new Date().getSeconds() + ":" + new Date().getMilliseconds())}`
                await setDoc(doc(firestore.collection("orders").doc(`orders_${user.uid}`), time, "order"), {
                    data: {
                        email: email,
                        lastname: lastname,
                        name: name, 
                        numberPhone: number,
                        adress: adress, 
                        method_payment: valueRadio,
                    },
                    cardData: {
                        cardNumber: cardNumber,
                        cardDate: cardDate,
                        cardName: cardName,
                        cardCVV: cardCVV,
                    },
                    products: productsMyCart,
                    allPrice: allPrice,
                    status: "wait"
                });

                await setDoc(doc(firestore.collection("ordersId"), `user_${user.uid}_${time}`), {
                    userId: `orders_${user.uid}`,
                    time: time
                });
    
                setEmail("");
                setLastname("");
                setName("");
                setNumber("");
                setAdress("");
                setCardNumber("");
                setCardDate("");
                setCardName("");
                setCardCVV("");
            } else {
                alert("Требуется ввести все данные")
            }

        } else if(valueRadio == "offline"){
            if(email && lastname && name && number && adress && valueRadio){
                const time = `order_${(new Date().getFullYear() + "_" + (new Date().getMonth()+1) + "_" + new Date().getDate() + "-" + new Date().getHours() + ":" +  new Date().getMinutes()  + ":" + new Date().getSeconds() + ":" + new Date().getMilliseconds())}`
                await setDoc(doc(firestore.collection("orders").doc(`orders_${user.uid}`), time, "order"), {
                    data: {
                        email: email,
                        lastname: lastname,
                        name: name, 
                        numberPhone: number,
                        adress: adress, 
                        method_payment: valueRadio,
                    },
                    products: productsMyCart,
                    allPrice: allPrice,
                    status: "wait"
                });

                await setDoc(doc(firestore.collection("ordersId"), `user_${user.uid}_${time}`), {
                    userId: `orders_${user.uid}`,
                    time: time
                });
    
                setEmail("");
                setLastname("");
                setName("");
                setNumber("");
                setAdress("");
            } else {
                alert("Требуется ввести все данные")
            }
        }

    }
    
    function searchDataProductInAllProduct(article) {
        for(let i = 0; i < products.length; i++){
            if(products[i].article == article){
                return products[i]
            }
        }
    }

    useEffect(()=>{
        if(products && productsMyCart){
            let price = 0;

            productsMyCart.map(product =>
                price += Number(searchDataProductInAllProduct(product.article).price * product.number)
            ) 

            setAllPrice(price);
        }
    }, [products, productsMyCart])

    if(loadingOne || loadingTwo || !allPrice){
        return(
            <Loader/>
        )
    }

    return(
        <div className={cl.check}>
            <CheckBlock productsMyCart={productsMyCart} allPrice={allPrice} searchDataProductInAllProduct={searchDataProductInAllProduct}/>

            <DataBlock
                email = {email} setEmail = {setEmail}
                lastname = {lastname} setLastname = {setLastname}
                name = {name} setName = {setName}
                number = {number} setNumber = {setNumber}
                adress = {adress} setAdress = {setAdress}
                valueRadio = {valueRadio} setValueRadio = {setValueRadio}
                cardNumber = {cardNumber} setCardNumber = {setCardNumber}
                cardDate = {cardDate} setCardDate = {setCardDate}
                cardName = {cardName} setCardName = {setCardName}
                cardCVV = {cardCVV} setCardCVV = {setCardCVV}
                addOrder = {addOrder}
            />
        </div>
    )
}