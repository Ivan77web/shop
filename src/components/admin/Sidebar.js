import React from "react";
import { Link } from "react-router-dom";
import cl from "../styles/Sidebar.module.css"
import arrow from '../../icons/arrow.png'

export default function Sidebar(){
    const openMenu = () => {
        const productsBlock = document.querySelector(`.${cl.products}`);
        const arrow = document.querySelector(`.${cl.imgArrow}`);

        productsBlock.classList.toggle(cl.active)
        arrow.classList.toggle(cl.imgClose)
        arrow.classList.toggle(cl.imgOpen)
    }

    return(
        <div className={cl.sidebar}>

            <div className={cl.link}>
                <Link to="myaccount">Моя страницы</Link>
            </div>

            <div className={cl.linkProducts}>
                <div onClick={openMenu} className={cl.headerProducts}>
                    <img className={cl.imgArrow + " " + cl.imgClose} src={arrow}/>
                    Товары
                </div>

                <div className={cl.active + " " + cl.products}>
                    <Link className={cl.linkToggle} to="allproducts">Редактировать товары</Link>
                    <Link className={cl.linkToggle} to="addproduct">Добавить товар</Link>
                </div>
            </div>
                        
            <div className={cl.link}>
                <Link to="orders">Заказы</Link>
            </div>

            <div className={cl.link}>
                <Link to="ourusers">Клиенты</Link>
            </div>

            <div className={cl.link}>
                <Link to="ouradmins">Админы</Link>
            </div>

        </div>
    )
}