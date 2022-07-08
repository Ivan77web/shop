import React, { useContext } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from "../..";
import AdminLogo from "../UI/icons/admin/AdminLogo";
import CartLogo from "../UI/icons/cart/CartLogo";
import UserLogo from "../UI/icons/user/UserLogo";
import Login from "./Login";
import cl from "../styles/Profile.module.css"
import { Link } from "react-router-dom";

export default function Profile() {
    const { auth, firestore } = useContext(Context);
    const [user, loading, error] = useAuthState(auth);

    return (
        <div className={cl.profile}>
            <div className={cl.container}>
                {
                    user ?
                        <div className={cl.dataBlock}>
                            <div className={cl.blockOne}>
                                <div className={cl.name}>{user.displayName}</div>
                                <div className={cl.email}>{user.email}</div>
                            </div>

                            <div className={cl.blockTwo}>
                                <Link to="/myOrders" className={cl.link}>Мои заказы</Link>
                                <div className={cl.logout} onClick={() => auth.signOut()}>Выйти</div>
                            </div>
                        </div>
                        :
                        <Login />
                }
            </div>
        </div>
    )
}