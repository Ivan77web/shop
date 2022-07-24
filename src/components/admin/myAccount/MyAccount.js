import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../../..";
import Loader from "../../UI/loader/Loader";
import cl from "../../styles/MyAccount.module.css"

export default function MyAccount() {
    const { auth, firestore } = useContext(Context);
    const [user] = useAuthState(auth);
    const [userData, setUserData] = useState();
    const [loading, setLoading] = useState(true);
    const [allUsers] = useCollectionData(
        firestore.collection("allUsers")
    )

    useEffect(() => {
        if (user && allUsers) {
            allUsers.map(oneUser => {
                if (oneUser.id === user.uid) {
                    setUserData(oneUser);
                    setLoading(false)
                }
            })
        }
    }, [user, allUsers])

    if (loading) {
        return (
            <Loader />
        )
    }

    return (
        <div className={cl.myAccount}>
            <h2 className={cl.intro}>Моя страница</h2>

            <table className={cl.table}>
                <col className={cl.colOne}/>
                <col className={cl.colTwo}/>
                
                <tbody>
                    <tr className={cl.trOneTable}>
                        <td>Имя: </td>
                        <td>{userData.name}</td>
                    </tr>

                    <tr className={cl.trOneTable}>
                        <td>id: </td>
                        <td>{userData.id}</td>
                    </tr>

                    <tr className={cl.trOneTable}>
                        <td>email: </td>
                        <td>{userData.email}</td>
                    </tr>

                    <tr className={cl.trOneTable}>
                        <td>Статус: </td>
                        <td>{userData.status}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}