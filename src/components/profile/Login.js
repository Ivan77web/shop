import React, { useContext, useEffect } from "react";
import { Context } from "../..";
import firebase from 'firebase/compat/app';
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import cl from "../styles/Login.module.css"
import MyButton from "../UI/MyButton";
import { useCollectionData } from "react-firebase-hooks/firestore";

export default function Login() {
    const { auth, firestore } = useContext(Context);
    const [allUsers] = useCollectionData(
        firestore.collection("allUsers")
    )

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const { user } = await auth.signInWithPopup(provider);
        checkUser(user)
    }

    const addUserInDB = async user => {
        await setDoc(doc(firestore, "allUsers", `user_${user.uid}`), {
            name: user.displayName,
            email: user.email,
            id: user.uid,
            status: "user"
        });
    }

    const checkUser = (user) => {
        let flag = 0;
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i].id == user.uid) {
                flag = 1;
            }
        }

        if (flag == 0) {
            addUserInDB(user);
        }
    }

    return (
        <div className={cl.login}>
            <div className={cl.intro}>
                Для продолжения требуется авторизоваться
            </div>

            <div onClick={login} className={cl.button}>
                <MyButton width="250px" height="50px" bgColor="black" color="white" name="Войти через google" />
            </div>
        </div>
    )
}