import React, { useEffect, useState } from "react";
import cl from "../styles/DataBlock.module.css"
import MyButton from "../UI/MyButton";
import MyInput from "../UI/MyInput";

export default function DataBlock({
    email, setEmail, lastname, setLastname, 
    name, setName, number, setNumber, 
    adress, setAdress, valueRadio, setValueRadio,
    cardNumber, setCardNumber, cardDate, setCardDate,
    cardName, setCardName, cardCVV, setCardCVV, addOrder}){
   
    function changeValue(e) {
       setValueRadio(e.target.value);
    }

    return(
        <div className={cl.DataBlock}>

            <div className={cl.intro}>Контактная информация</div>

            <div className={cl.oneSection}>
                <MyInput value={email} onChange={setEmail} width="80%" height="20px" fontSize="18px" name="E-mail"/>
            </div>

            <div className={cl.oneSection}>
                <MyInput value={lastname} onChange={setLastname} width="80%" height="20px" fontSize="18px" name="Фамилия"/>
            </div>
            
            <div className={cl.oneSection}>
                <MyInput value={name} onChange={setName} width="80%" height="20px" fontSize="18px" name="Имя"/>
            </div>
            
            <div className={cl.oneSection}>
                <MyInput value={number} onChange={setNumber} type="number" width="80%" height="20px" fontSize="18px" name="Номер телефона"/>
            </div>
            
            <div className={cl.oneSection}>
                <MyInput value={adress} onChange={setAdress} width="80%" height="20px" fontSize="18px" name="Адрес"/>
            </div>


            <div className={cl.payment}>
                <div className={cl.intro}>Оплата:</div>

                <div className={cl.methodsPayment}>
                    <div className={cl.methodPayment}>
                        <p>Онлайн <input type="radio" name="radio" value="online" checked={valueRadio == 'online' ? true : false} onChange={changeValue} /></p>
                    </div>

                    <div className={cl.methodPayment}>
                        <p>При получении <input type="radio" name="radio" value="offline" checked={valueRadio == 'offline' ? true : false} onChange={changeValue} /></p>
                    </div>
                </div>

            </div>

            {
                valueRadio == "online"
                ?
                <div className={cl.bankCard}>
                    <div className={cl.cardNumber}>
                        <MyInput value={cardNumber} onChange={setCardNumber} width="100%" height="15px" fontSize="18px" name="Номер карты"/>
                    </div>
                    
                    <div className={cl.cardDate}>
                        <MyInput value={cardDate} onChange={setCardDate} width="100%" height="15px" fontSize="14px" name="Дата"/>
                    </div>
                    
                    <div className={cl.cardName}>
                        <MyInput value={cardName} onChange={setCardName} width="100%" height="15px" fontSize="18px" name="Владелец карты"/>
                    </div>

                    <div className={cl.cardCVV}>
                        <MyInput value={cardCVV} onChange={setCardCVV} width="100%" height="15px" fontSize="18px" name="CVV"/>
                    </div>
                    
                    
                </div>
                :
                <div/>
            }

            <div className={cl.buttonPay} onClick={addOrder}>
                <MyButton name="Оформить заказ" width="100%" height="50px" color="white" bgColor="rgb(145, 22, 22)"/>
            </div>


        </div>
    )
}