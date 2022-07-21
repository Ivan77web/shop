import React, { useContext, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../../..";
import cl from "../../styles/Orders.module.css"
import Loader from "../../UI/loader/Loader";
import OneOrder from "./OneOrder";
import MyInput from "../../UI/MyInput";

export default function Orders(){
    const {firestore} = useContext(Context);
    const [ordersId, loading] = useCollectionData(
        firestore.collection("ordersId")
    )
    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [statusOrder, setStatusOrder] = useState("");
    const [filter, setFilter] = useState({
        name: "",
        number: "",
        statusOrder: "",
    })

    const clickStatus = (e) => {
        const statusCard = e.target.closest(`.${cl.oneFilter}`)
        const allButtons = e.target.closest(`.${cl.allButtons}`)

        allButtons.childNodes.forEach( elem => elem.classList.remove(cl.activeFilter) )
        statusCard.classList.add(cl.activeFilter)

        if(statusCard.innerHTML === "Не выбрано"){
            setStatusOrder("")
        } else{
            setStatusOrder(statusCard.innerHTML)
        }
    }

    useEffect(()=>{
        setFilter({
            name: name, 
            number: number, 
            statusOrder: statusOrder
        })
    }, [name, number, statusOrder])
    
    if(loading){
        return(
            <Loader/>
        )
    }

    return(
        <div className={cl.orders}>
            <h3 className={cl.intro}>Заказы</h3>

            <div className={cl.filters}>
                <div className={cl.inputsFilter}>
                    <MyInput width="40%" height="50px" name="Имя заказчика" fontSize="20px" value={name} onChange={setName}/>

                    <MyInput width="40%" height="50px" name="Номер заказа" fontSize="20px" value={number} onChange={setNumber}/>
                </div>

                <table className={cl.tableButtons}>

                    <col style={{width: "16.5%"}}/>
                    <col style={{width: "16.5%"}}/>
                    <col style={{width: "16.5%"}}/>
                    <col style={{width: "16.5%"}}/>
                    <col style={{width: "16.5%"}}/>
                    <col style={{width: "16.5%"}}/>
            
                    <tbody>
                        <tr className={cl.allButtons}>
                            <td onClick={e => clickStatus(e)} className={cl.oneFilter}>Не выбрано</td>
                            <td onClick={e => clickStatus(e)} className={cl.oneFilter}>Ожидает обработку</td>
                            <td onClick={e => clickStatus(e)} className={cl.oneFilter}>Заказ отправлен</td>
                            <td onClick={e => clickStatus(e)} className={cl.oneFilter}>Заказ доставлен</td>
                            <td onClick={e => clickStatus(e)} className={cl.oneFilter}>Заказ завершен</td>
                            <td onClick={e => clickStatus(e)} className={cl.oneFilter}>Заказ отменен</td>
                        </tr>
                    </tbody>
                </table>

            </div>

            {
                ordersId.map( id =>
                    <OneOrder key={`${id.userId}-${id.time}`} id={id} filter={filter}/>    
                )
            }
        </div>
    )
}