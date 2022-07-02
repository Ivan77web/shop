import React, { useContext } from "react";
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import cl from "../../styles/OneUser.module.css"
import { Context } from "../../..";

export default function OneUser({ user, isAdmin }) {
    const { auth, firestore } = useContext(Context);
    const openMenu = e => {
        const menu = e.target.closest(`.${cl.correctStatus}`).querySelector(`.${cl.options}`)
        menu.classList.toggle(cl.active)
    }

    const correctStatus = (e, status) => {
        setDoc(doc(firestore, "allUsers", `user_${user.id}`), {
            name: user.name,
            email: user.email,
            id: user.id,
            status: status
        });

        const menu = e.target.closest(`.${cl.correctStatus}`).querySelector(`.${cl.options}`)
        menu.classList.toggle(cl.active)
    }

    return (
        <div className={cl.oneUser}>
            <table className={cl.table}>

                <col style={{ width: "300px" }} />
                <col style={{ width: "300px" }} />

                <tbody>
                    <tr className={cl.trOneTable}>
                        <td><b>Имя пользователя</b></td>
                        <td>{user.name}</td>
                    </tr>

                    <tr className={cl.trOneTable}>
                        <td><b>ID пользователя</b></td>
                        <td>{user.id}</td>
                    </tr>

                    <tr className={cl.trOneTable}>
                        <td><b>EMail пользователя</b></td>
                        <td>{user.email}</td>
                    </tr>

                    <tr className={cl.trOneTable}>
                        <td><b>Статус пользователя</b></td>
                        <td>{user.status}</td>
                    </tr>
                </tbody>
            </table>

            {
                isAdmin
                    ?
                    <div className={cl.correctStatus}>
                        <div onClick={e => openMenu(e)} className={cl.textStatus}>Изменить статус</div>

                        <div className={cl.options + " " + cl.active}>
                            <div className={cl.option} onClick={e => correctStatus(e, "user")} style={user.status == "user" ? { background: "rgb(140, 172, 140)" } : { background: "white" }}>Пользователь</div>
                            <div className={cl.option} onClick={e => correctStatus(e, "admin")} style={user.status == "admin" ? { background: "rgb(140, 172, 140)" } : { background: "white" }}>Администратор</div>
                            <div className={cl.option} onClick={e => correctStatus(e, "mainAdmin")} style={user.status == "mainAdmin" ? { background: "rgb(140, 172, 140)" } : { background: "white" }}>Главный администратор</div>
                        </div>
                    </div>
                    :
                    <div/>
            }
        </div>
    )
}