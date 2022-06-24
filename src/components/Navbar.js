import React from "react";
import cl from './styles/Navbar.module.css'
import { Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { Context } from "..";
import iconProfile from "../icons/profileIcon.png"
import iconSneakers from "../icons/sneakersIcon.png"

export default function Navbar({isAdmin}){
    const {auth} = useContext(Context);
    const [user, loading, error] = useAuthState(auth);

    return(
        <div className={cl.navbar}>
            <div className={cl.criteria}>ТУТ БУДУТ КАКИЕ-ТО КРИТЕРИИ</div>
            <div className={cl.logo}>Кроксы с дырочками</div>

            {
                isAdmin
                ?
                    <div className={cl.links}>
                        <Link to="/" className={cl.link}>Магазин</Link>
                        <Link to="/profile" className={cl.link}>Профиль</Link>
                        <Link to="/cart" className={cl.link}>Корзина</Link>
                        <Link to="/admin/" className={cl.link}>Панель админа</Link>
                        {/* <Link to="/addproduct" className={cl.link}>Добавить товар</Link> */}
                    </div>  
                :  
                    user 
                    ?
                        <div className={cl.links}>
                            <Link to="/" className={cl.link}>Магазин</Link>
                            <Link to="/profile" className={cl.link}>Профиль</Link>
                            <Link to="/cart" className={cl.link}>Корзина</Link>
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