import React from "react";
import cl from './styles/Navbar.module.css'
import { Link } from "react-router-dom";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { Context } from "..";

export default function Navbar(){
    const {auth} = useContext(Context);
    const [user, loading, error] = useAuthState(auth);

    return(
        <div className={cl.navbar}>
            <div>ТУТ БУДУТ КАКИЕ-ТО КРИТЕРИИ</div>
            <div className={cl.logo}>Кроксы с дырочками</div>

            <Link to="/" className={cl.link}>Магазин</Link>
            {
                user 
                ?
                    <button onClick={()=> auth.signOut()}>
                        Выйти
                    </button>
                :
                    <Link to="/login" className={cl.link}>Логин</Link>
            }
            {
                user ?
                <div>
                    <Link to="/profile" className={cl.link}>Профиль</Link>
                    <Link to="/cart" className={cl.link}>Корзина</Link>
                    <Link to="/addproduct" className={cl.link}>Добавить товар</Link>
                </div>
                :
                <div/>
            }
        </div>
    )
}