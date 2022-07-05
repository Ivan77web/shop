import React, { useEffect } from "react";
import cl from './styles/Navbar.module.css'
import { Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { Context } from "..";
import cross from "../icons/crossBlack.png"
import iconProfile from "../icons/profileIcon.png"
import iconSneakers from "../icons/sneakersIcon.png"

export default function Navbar({ userData, setBrandNavbar, brandNavBar }) {
    const { auth } = useContext(Context);
    const [user, loading, error] = useAuthState(auth);
    const choiceCriterion = e => {
        setBrandNavbar(e.target.closest(`.${cl.criterion}`).innerHTML)
    }
    const deleteCriterion = e => {
        setBrandNavbar("")
        e.target.closest(`.${cl.oneCriterion}`).classList.remove(cl.criterionActive)
    }

    useEffect(() => {
        if (brandNavBar == "Nike") {
            document.querySelector(`.${cl.criterionOne}`).classList.add(cl.criterionActive)
            document.querySelector(`.${cl.criterionTwo}`).classList.remove(cl.criterionActive)
            document.querySelector(`.${cl.criterionThree}`).classList.remove(cl.criterionActive)
        } else if (brandNavBar == "Jordan") {
            document.querySelector(`.${cl.criterionOne}`).classList.remove(cl.criterionActive)
            document.querySelector(`.${cl.criterionTwo}`).classList.add(cl.criterionActive)
            document.querySelector(`.${cl.criterionThree}`).classList.remove(cl.criterionActive)
        } if (brandNavBar == "Yeezy") {
            document.querySelector(`.${cl.criterionOne}`).classList.remove(cl.criterionActive)
            document.querySelector(`.${cl.criterionTwo}`).classList.remove(cl.criterionActive)
            document.querySelector(`.${cl.criterionThree}`).classList.add(cl.criterionActive)
        }
    }, [brandNavBar])

    return (
        <div className={cl.navbar}>

            <div className={cl.criteria}>

                <div className={cl.oneCriterion + " " + cl.criterionOne}>
                    <img onClick={e => deleteCriterion(e)} className={cl.cross} src={cross} />
                    <div onClick={e => choiceCriterion(e)} className={cl.criterion}>
                        Nike
                    </div>
                </div>

                <div className={cl.oneCriterion + " " + cl.criterionTwo}>
                    <img onClick={e => deleteCriterion(e)} className={cl.cross} src={cross} />
                    <p onClick={e => choiceCriterion(e)} className={cl.criterion}>
                        Jordan
                    </p>
                </div>

                <div className={cl.oneCriterion + " " + cl.criterionThree}>
                    <img onClick={e => deleteCriterion(e)} className={cl.cross} src={cross} />
                    <p onClick={e => choiceCriterion(e)} className={cl.criterion}>
                        Yeezy
                    </p>
                </div>

            </div>

            <div className={cl.logo}>Кроксы с дырочками</div>

            {
                userData.status == "admin" || userData.status == "mainAdmin"
                    ?
                    <div className={cl.links}>
                        <Link to="/" className={cl.link}>Магазин</Link>
                        <Link to="/profile" className={cl.link}>Профиль</Link>
                        <Link to="/cart" className={cl.link}>Корзина</Link>
                        <Link to="/myOrders" className={cl.link}>Мои заказы</Link>
                        <Link to="/admin/" className={cl.link}>Панель админа</Link>
                    </div>
                    :
                    user
                        ?
                        <div className={cl.links}>
                            <Link to="/" className={cl.link}>Магазин</Link>
                            <Link to="/profile" className={cl.link}>Профиль</Link>
                            <Link to="/cart" className={cl.link}>Корзина</Link>
                            <Link to="/myOrders" className={cl.link}>Мои заказы</Link>
                        </div>
                        :
                        <div className={cl.links}>
                            <Link to="/" className={cl.link}>Магазин</Link>
                            <Link to="/profile" className={cl.link}>Профиль</Link>
                        </div>
            }
        </div>
    )
}