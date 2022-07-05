import React, { useContext, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../..";
import cl from "../styles/Order.module.css"
import Loader from "../UI/loader/Loader";
import arrow from "../../icons/arrow.png"

export default function Order({ order, buttonStatus}) {
    const { firestore } = useContext(Context);
    const [dataOrder, loading] = useCollectionData(
        firestore.collection(`/orders/${order.userId}/${order.time}`)
    )
    const [products, loadingTwo] = useCollectionData(
        firestore.collection("products")
    )
    const openMenu = e => {
        const tableData = e.target.closest(`.${cl.order}`).querySelector(`.${cl.allData}`);
        tableData.classList.toggle(cl.active)
        const photo = e.target.closest(`.${cl.data}`).querySelector("img");
        photo.classList.toggle(cl.photoArrowClose);
        photo.classList.toggle(cl.photoArrowOpen);
    }

    function translateStatus(word) {
        if (word == "wait") {
            return "Ожидает обработку"
        } else if (word == "sent") {
            return "Заказ отправлен"
        } else if (word == "delivered") {
            return "Заказ доставлен"
        } else if (word == "completed") {
            return "Заказ завершен"
        } else if (word == "cancelled") {
            return "Заказ отменен"
        }
    }

    function searchByArticle(article) {
        let prod;
        products.map(product => {
            if (product.article == article) {
                prod = product;
            }
        })
        return prod;
    }

    if (loading || loadingTwo) {
        return (
            <Loader />
        )
    }

    if(dataOrder[0].status != buttonStatus && buttonStatus != "" ){
        return(
            <div/>
        )
    }

    return (
        <div className={cl.order}>

            <div className={cl.numberOrder}><h4>{`/orders/${order.userId}/${order.time}`}</h4></div>

            <div className={cl.status}>{translateStatus(dataOrder[0].status)}</div>

            <div className={cl.data} onClick={e => openMenu(e)}>
                <img className={cl.photoArrowClose} src={arrow} />
                <p className={cl.buttonData}>Данные о заказе</p>
            </div>

            <div className={cl.allData + " " + cl.active}>
                <div className={cl.tables}>

                    <table className={cl.tableProduct}>
                        <col style={{width: "500px"}}/>
                        <col style={{width: "100px"}}/>
                        <col style={{width: "100px"}}/>

                        <thead>
                            <tr>
                                <th>Товар</th>
                                <th>Размер</th>
                                <th>Кол-во</th>
                            </tr>
                        </thead>

                        <tbody>
                            {
                                dataOrder[0].products.map(product =>
                                    <tr key={product.article}>
                                        <td style={{textAlign: "center"}}>{searchByArticle(product.article).brand + " " + searchByArticle(product.article).model}</td>
                                        <td style={{textAlign: "center"}}>{product.size}</td>
                                        <td style={{textAlign: "center"}}>{product.number}</td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </table>

                    <table className={cl.tableData}>
                        <col style={{width: "200px"}}/>

                        <tbody>
                            <tr>
                                <td>Цена заказа</td>
                                <td>{dataOrder[0].allPrice} руб.</td>
                            </tr>

                            <tr>
                                <td>Имя</td>
                                <td>{dataOrder[0].data.name}</td>
                            </tr>

                            <tr>
                                <td>Фамилия</td>
                                <td>{dataOrder[0].data.lastname}</td>
                            </tr>

                            <tr>
                                <td>Телефон</td>
                                <td>{dataOrder[0].data.numberPhone}</td>
                            </tr>

                            <tr>
                                <td>Адрес</td>
                                <td>{dataOrder[0].data.adress}</td>
                            </tr>

                            <tr>
                                <td>Электронная почта</td>
                                <td>{dataOrder[0].data.email}</td>
                            </tr>

                            <tr>
                                <td>Способ оплаты</td>
                                <td>{dataOrder[0].data.method_payment}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}