import React, { useEffect } from "react";
import cl from './styles/Navbar.module.css'
import { Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { Context } from "..";
import UserLogo from "../components/UI/icons/user/UserLogo"
import CartLogo from "./UI/icons/cart/CartLogo";
import AdminLogo from "./UI/icons/admin/AdminLogo";
import Cross from "./UI/icons/cross/Cross";
import logoImg from "../icons/sneakersIcon.png"

export default function Navbar({ userData, setBrandNavbar, brandNavBar }) {
    const { auth } = useContext(Context);
    const [user] = useAuthState(auth);
    const choiceCriterion = e => {
        setBrandNavbar(e.target.closest(`.${cl.criterion}`).innerHTML)
    }
    const deleteCriterion = e => {
        setBrandNavbar("")
        e.target.closest(`.${cl.oneCriterion}`).classList.remove(cl.criterionActive)
    }

    useEffect(() => {
        if (brandNavBar === "Nike") {
            document.querySelector(`.${cl.criterionOne}`).classList.add(cl.criterionActive)
            document.querySelector(`.${cl.criterionTwo}`).classList.remove(cl.criterionActive)
            document.querySelector(`.${cl.criterionThree}`).classList.remove(cl.criterionActive)
        } else if (brandNavBar === "Jordan") {
            document.querySelector(`.${cl.criterionOne}`).classList.remove(cl.criterionActive)
            document.querySelector(`.${cl.criterionTwo}`).classList.add(cl.criterionActive)
            document.querySelector(`.${cl.criterionThree}`).classList.remove(cl.criterionActive)
        } if (brandNavBar === "Yeezy") {
            document.querySelector(`.${cl.criterionOne}`).classList.remove(cl.criterionActive)
            document.querySelector(`.${cl.criterionTwo}`).classList.remove(cl.criterionActive)
            document.querySelector(`.${cl.criterionThree}`).classList.add(cl.criterionActive)
        }
    }, [brandNavBar])

    return (
        <div className={cl.navbar}>

            <div className={cl.criteria}>

                <div className={cl.oneCriterion + " " + cl.criterionOne}>
                    <Link to="/shop">
                        <div className={cl.cross} onClick={e => deleteCriterion(e)}>
                            <Cross size="20px" />
                        </div>
                    </Link>

                    <Link to="/shop">
                        <div onClick={e => choiceCriterion(e)} className={cl.criterion}>
                            Nike
                        </div>
                    </Link>

                </div>

                <div className={cl.oneCriterion + " " + cl.criterionTwo}>
                    <Link to="/shop">
                        <div className={cl.cross} onClick={e => deleteCriterion(e)}>
                            <Cross size="20px" />
                        </div>
                    </Link>

                    <Link to="/shop">
                        <p onClick={e => choiceCriterion(e)} className={cl.criterion}>
                            Jordan
                        </p>
                    </Link>
                </div>

                <div className={cl.oneCriterion + " " + cl.criterionThree}>
                    <Link to="/shop">
                        <div className={cl.cross} onClick={e => deleteCriterion(e)}>
                            <Cross size="20px" />
                        </div>
                    </Link>

                    <Link to="/shop">
                        <p onClick={e => choiceCriterion(e)} className={cl.criterion}>
                            Yeezy
                        </p>
                    </Link>
                </div>

            </div>

            <Link to="/" className={cl.link}>
                <div className={cl.logo}>Кроксы с дырочками</div>
                <img className={cl.logoImg} src={logoImg} />
            </Link>

            {
                (userData.status === "admin" || userData.status === "mainAdmin") && user !== null
                    ?
                    <div className={cl.links}>
                        <Link to="/profile" className={cl.link}>
                            <UserLogo />
                        </Link>

                        <Link to="/cart" className={cl.link}>
                            <CartLogo />
                        </Link>

                        <Link to="/admin/" className={cl.link}>
                            <AdminLogo />
                        </Link>
                    </div>
                    :
                    user
                        ?
                        <div className={cl.links}>
                            <Link to="/profile" className={cl.link}>
                                <UserLogo />
                            </Link>

                            <Link to="/cart" className={cl.link}>
                                <CartLogo />
                            </Link>
                        </div>
                        :
                        <div className={cl.links}>
                            <Link to="/profile" className={cl.link}>
                                <UserLogo />
                            </Link>
                        </div>
            }
        </div>
    )
}