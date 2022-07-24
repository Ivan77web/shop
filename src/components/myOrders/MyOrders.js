import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../..";
import cl from "../styles/MyOrders.module.css"
import Loader from "../UI/loader/Loader";
import Order from "./Order";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import "../stylesForanimation/styleForAnimation.css"


export default function MyOrders() {
    const { firestore, auth } = useContext(Context);
    const [user, loadingTwo] = useAuthState(auth);
    const [ordersId, loadingOne] = useCollectionData(
        firestore.collection("ordersId")
    )
    const [ordersIdFilter, setOrdersIdFilter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [buttonStatus, setButtonStatus] = useState("")
    const correctStatus = status => {
        setButtonStatus(status)
    }

    useEffect(() => {
        if (ordersId && user) {
            let filterId = ordersId.filter(id => id.userId === `orders_${user.uid}`)
            setOrdersIdFilter(filterId);
            setLoading(false);
        }
    }, [ordersId, user])

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <div className={cl.myOrders + " " + "orders"}>
            <h3 className={cl.intro}>
                Мои заказы
            </h3>

            <div className={cl.filters}>
                <div className={cl.oneFilter}>
                    <div onClick={() => correctStatus("")} className={"" === buttonStatus ? cl.buttonStatus + " " + cl.activeButtonStatus : cl.buttonStatus}>
                        Все
                    </div>
                    <div onClick={() => correctStatus("wait")} className={"wait" === buttonStatus ? cl.buttonStatus + " " + cl.activeButtonStatus : cl.buttonStatus}>
                        Ожидает обработку
                    </div>
                    <div onClick={() => correctStatus("sent")} className={"sent" === buttonStatus ? cl.buttonStatus + " " + cl.activeButtonStatus : cl.buttonStatus}>
                        Заказ отправлен
                    </div>
                </div>

                <div className={cl.twoFilter}>
                    <div onClick={() => correctStatus("delivered")} className={"delivered" === buttonStatus ? cl.buttonStatus + " " + cl.activeButtonStatus : cl.buttonStatus}>
                        Заказ доставлен
                    </div>
                    <div onClick={() => correctStatus("completed")} className={"completed" === buttonStatus ? cl.buttonStatus + " " + cl.activeButtonStatus : cl.buttonStatus}>
                        Заказ завершен
                    </div>
                    <div onClick={() => correctStatus("cancelled")} className={"cancelled" === buttonStatus ? cl.buttonStatus + " " + cl.activeButtonStatus : cl.buttonStatus}>
                        Заказ отменен
                    </div>
                </div>
            </div>

                {
                    ordersIdFilter.map(order =>
                            <Order buttonStatus={buttonStatus} order={order} key={`${order.userId}-${order.time}`} />
                    )
                }

        </div>
    )
}