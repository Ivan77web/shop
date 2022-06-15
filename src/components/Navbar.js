import React from "react";
import cl from './styles/Navbar.module.css'
import { Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { Context } from "..";
import iconProfile from "../icons/profileIcon.png"
import iconSneakers from "../icons/sneakersIcon.png"

export default function Navbar(){
    const {auth} = useContext(Context);
    const [user, loading, error] = useAuthState(auth);

    return(
        <div className={cl.navbar}>
            <div className={cl.criteria}>ТУТ БУДУТ КАКИЕ-ТО КРИТЕРИИ</div>
            <div className={cl.logo}>Кроксы с дырочками</div>

            {
                user ?
                <div className={cl.links}>
                    <Link to="/" className={cl.link}>Магазин</Link>
                    {/* <div className={cl.link} onClick={()=> auth.signOut()}>Выйти</div> */}
                    <Link to="/profile" className={cl.link}>Профиль</Link>
                    <Link to="/cart" className={cl.link}>Корзина</Link>
                    <Link to="/addproduct" className={cl.link}>Добавить товар</Link>
                    {/* <img style={{width: "50px", background:"white", height: "50px"}} src={iconProfile}/> */}
                    {/* <img src={iconSneakers}/> */}
                </div>
                :
                <div className={cl.links}>
                    <Link to="/" className={cl.link}>Магазин</Link>
                    <Link to="/profile" className={cl.link}>Профиль</Link>
                    {/* <Link to="/login" className={cl.link}>Логин</Link> */}
                </div>
            }
        </div>
    )
}