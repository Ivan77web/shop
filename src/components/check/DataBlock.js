import React, { useState } from "react";
import cl from "../styles/DataBlock.module.css"
import MyButton from "../UI/MyButton";
import MyInput from "../UI/MyInput";

export default function DataBlock({
    email, setEmail, lastname, setLastname,
    name, setName, number, setNumber,
    adress, setAdress, valueRadio, setValueRadio,
    cardNumber, setCardNumber, cardDate, setCardDate,
    cardName, setCardName, cardCVV, setCardCVV, addOrder }) {

    function changeValue(e) {
        setValueRadio(e.target.value);
    }

    const validateEmail = value => {
        if (!(email === "" && value === " ")) {
            setEmail(value);
        }
    }

    const validateLastname = value => {
        if (!(lastname === "" && value === " ")) {
            setLastname(value);
        }
    }

    const validateName = value => {
        if (!(name === "" && value === " ")) {
            setName(value);
        }
    }

    const validatePhone = value => {
        if (!(value.includes(" ")) && Number.isInteger(Number(value))) {
            setNumber(value);
        }
    }

    const validateAdress = value => {
        if (!(adress === "" && value === " ")) {
            setAdress(value);
        }
    }

    const validateCardNumber = value => {
        if (!(value.includes(" ")) && Number.isInteger(Number(value)) && value.length < 17) {
            setCardNumber(value);
        }  
    }

    const validateCVV = (value) => {
        if (!(value.includes(" ")) && Number.isInteger(Number(value)) && value.length < 4) {
            setCardCVV(value);
        }
    }

    const validateCardDate = (value) => {
        if (!(value.includes(" ")) && Number.isInteger(Number(value)) && value.length < 5) {
            setCardDate(value);
        }  
    }

    const validateCardName = value => {
        if (!(cardName === "" && value === " ")) {
            setCardName(value);
        }
    }

    return (
        <div className={cl.DataBlock}>

            <div className={cl.intro}>Контактная информация</div>

            <div className={cl.oneSection}>
                <MyInput value={email} onChange={validateEmail} width="80%" height="20px" fontSize="18px" name="E-mail" />
            </div>

            <div className={cl.oneSection}>
                <MyInput value={lastname} onChange={validateLastname} width="80%" height="20px" fontSize="18px" name="Фамилия" />
            </div>

            <div className={cl.oneSection}>
                <MyInput value={name} onChange={validateName} width="80%" height="20px" fontSize="18px" name="Имя" />
            </div>

            <div className={cl.oneSection}>
                <MyInput value={number} onChange={validatePhone} type="number" width="80%" height="20px" fontSize="18px" name="Номер телефона" />
            </div>

            <div className={cl.oneSection}>
                <MyInput value={adress} onChange={validateAdress} width="80%" height="20px" fontSize="18px" name="Адрес" />
            </div>


            <div className={cl.payment}>
                <div className={cl.intro}>Оплата:</div>

                <div className={cl.methodsPayment}>
                    <div className={cl.methodPayment}>
                        <p>Онлайн <input type="radio" name="radio" value="online" checked={valueRadio === 'online' ? true : false} onChange={changeValue} /></p>
                    </div>

                    <div className={cl.methodPayment}>
                        <p>При получении <input type="radio" name="radio" value="offline" checked={valueRadio === 'offline' ? true : false} onChange={changeValue} /></p>
                    </div>
                </div>

            </div>

            {
                valueRadio === "online"
                    ?
                    <div className={cl.bankCard}>
                        <div className={cl.cardNumber}>
                            <MyInput value={cardNumber} onChange={validateCardNumber} width="100%" height="15px" fontSize="18px" name="Номер карты" />
                        </div>

                        <div className={cl.cardDate}>
                            <MyInput value={cardDate} onChange={validateCardDate} width="100%" height="15px" fontSize="14px" name="Дата" />
                        </div>

                        <div className={cl.cardName}>
                            <MyInput value={cardName} onChange={validateCardName} width="100%" height="15px" fontSize="18px" name="Владелец карты" />
                        </div>

                        <div className={cl.cardCVV}>
                            <MyInput value={cardCVV} onChange={validateCVV} width="100%" height="15px" fontSize="18px" name="CVV" />
                        </div>


                    </div>
                    :
                    <div />
            }

            <div className={cl.buttonPay} onClick={addOrder}>
                <MyButton name="Оформить заказ" width="100%" height="50px" color="white" bgColor="rgb(145, 22, 22)" />
            </div>


        </div>
    )
}