import React, { useContext } from "react";
import { Context } from "../..";
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import cl from "../styles/Login.module.css"

export default function Login(){
    const {auth} = useContext(Context);

    const login = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        const {user} = await auth.signInWithPopup(provider);
    }

    return(
        <div className={cl.login}>
            <button onClick={login}>
                Войти через гугл
            </button>
        </div>
    )
}