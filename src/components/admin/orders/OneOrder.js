import React, { useContext, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Context } from "../../..";
import Loader from "../../UI/loader/Loader";
import cl from '../../styles/OneOrder.module.css'
import cross from "../../../icons/cross.png"
import tick from "../../../icons/tick.png"

export default function OneOrder({id, filter}) {
    const {firestore} = useContext(Context);
    const [dataOrder, loading] = useCollectionData(
        firestore.collection(`/orders/${id.userId}/${id.time}`)
    )
    const [textStatus, setTextStatus] = useState()

    function translateStatus(word){
        if(word == "wait"){
            return "Ожидает обработку"
        } else if(word == "sent"){
            return "Заказ отправлен"
        } else if(word == "delivered"){
            return "Заказ доставлен"
        } else if(word == "completed"){
            return "Заказ завершен"
        } else if(word == "cancelled"){
            return "Заказ отменен"
        }else if(word == "Ожидает обработку"){
            return "wait"
        } else if(word == "Заказ отправлен"){
            return "sent"
        } else if(word == "Заказ доставлен"){
            return "delivered"
        } else if(word == "Заказ завершен"){
            return "completed"
        } else if(word == "Заказ отменен"){
            return "cancelled"
        }
    }

    const openMenu = (e) => {
        const menu = e.target.closest(`.${cl.status}`).querySelector(`.${cl.allStatuses}`);
        menu.classList.toggle(cl.active);

        // const menu = e.target.closest(`.${cl.status}`).querySelector(`.${cl.allStatuses}`);
        // console.log(menu);
    }

    const changeStatus = e => {
        if(e.target.closest(`.${cl.oneStatus}`)){
            const status = e.target.closest(`.${cl.oneStatus}`)
            setTextStatus(translateStatus(status.innerHTML) );
        }
    }

    const cancel = e => {
        setTextStatus(translateStatus(dataOrder[0].status))
        const menu = e.target.closest(`.${cl.status}`).querySelector(`.${cl.allStatuses}`);
        menu.classList.toggle(cl.active);
    }
    
    const save = async () => {
        await updateDoc(doc(firestore, `/orders/${id.userId}/${id.time}`, "order"), {
            status: textStatus
        });
    }

    useEffect(()=>{
        if(dataOrder){
            setTextStatus(translateStatus(dataOrder[0].status))
        }
    }, [dataOrder])

    if(loading){
        return(
            <Loader/>
        )
    }

    if( 
        (textStatus == filter.statusOrder || filter.statusOrder == "") &&
        (`Заказ № orders/${id.userId}/${id.time}`.includes(filter.number) || filter.number== "" ) &&
        (`${dataOrder[0].data.name} ${dataOrder[0].data.lastname}`.includes(filter.name) || filter.name == "")
    ){
        return(
            <div className={cl.cardOrder}>
                <div className={cl.data}>
                    <h5 className={cl.intro}>{`Заказ № orders/${id.userId}/${id.time}`}</h5>
    
                    <div className={cl.mainData}>
                        <table className={cl.tableData}>
    
                            <col style={{width: "200px"}}/>
                            <col style={{width: "400px"}}/>
                
                            <tbody>
    
                                <tr>
                                    <td>Имя -</td>
                                    <td>{dataOrder[0].data.name}</td>
                                </tr>
    
                                <tr>
                                    <td>Фамилия -</td>
                                    <td>{dataOrder[0].data.lastname}</td>
                                </tr>
    
                                <tr>
                                    <td>Адрес -</td>
                                    <td>{dataOrder[0].data.adress}</td>
                                </tr>
    
                                <tr>
                                    <td>Телефон -</td>
                                    <td>{dataOrder[0].data.numberPhone}</td>
                                </tr>
    
                                <tr>
                                    <td>Электронная почта -</td>
                                    <td>{dataOrder[0].data.email}</td>
                                </tr>
    
                                <tr>
                                    <td>Способ оплаты -</td>
                                    <td>{dataOrder[0].data.method_payment}</td>
                                </tr>
    
                                <tr>
                                    <td>Общая стоимость -</td>
                                    <td>{dataOrder[0].allPrice} руб.</td>
                                </tr>
                            </tbody>
                        </table>
    
                        <div className={cl.products}>
                            <h4 style={{marginBottom: "30px"}}>Товары</h4>
    
                            <table className={cl.tableProducts}>
    
                                <col style={{width: "350px"}}/>
                                <col style={{width: "100px"}}/>
                                <col style={{width: "100px"}}/>
    
                                <thead>
                                    <tr>
                                        <th className={cl.tableBrand}>Артикул</th>
                                        <th className={cl.tableModel}>Размер</th>
                                        <th className={cl.tableNumber}>Кол-во</th>
                                    </tr>
                                </thead>
    
                                <tbody>
                                    {
                                        dataOrder[0].products.map(product =>  
                                            <tr>
                                                <td>{product.article}</td>
                                                <td>{product.size}</td>
                                                <td>{product.number}</td>
                                            </tr>
                                        )
                                    }  
                                </tbody>
                            </table>
    
                        </div>
                    </div>
                </div>
    
                <div className={cl.status}>
                    <div className={cl.statusBlock}>
                        {textStatus}
                    </div>
    
                    <div onClick={e => openMenu(e)} className={cl.buttonEdit}>
                        Изменить
                    </div>
    
                    <div onClick={e => changeStatus(e)} className={cl.allStatuses + " " + cl.active}>
                        <div className={cl.oneStatus}>
                            Ожидает обработку
                        </div>
    
                        <div className={cl.oneStatus}>
                            Заказ отправлен
                        </div>
    
                        <div className={cl.oneStatus}>
                            Заказ доставлен
                        </div>
    
                        <div className={cl.oneStatus}>
                            Заказ завершен
                        </div>
    
                        <div className={cl.oneStatus}>
                            Заказ отменен
                        </div>
    
                        <div className={cl.buttonsEdit}>
    
                            <div onClick={e => cancel(e)} className={cl.buttonCancel}>
                                <img className={cl.imgCross} src={cross}/>
                            </div>
    
                            <div onClick={save} className={cl.buttonSave}>
                                <img className={cl.imgTick} src={tick}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )      
    } else{
        return(
            <div/>
        )
    }  
}