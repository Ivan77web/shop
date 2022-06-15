import React, { useEffect, useState, useContext } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from "..";
import { Link } from "react-router-dom";
import Login from "./Login";

export default function Profile(){
    const {auth, firestore} = useContext(Context);
    const [user, loading, error] = useAuthState(auth);

    return(
        <div>
            {
                user ?
                <div>
                    <div>{user.displayName}</div>
                    <div>{user.email}</div>
                    <div onClick={()=> auth.signOut()}>Выйти</div>
                </div>
                :
                <Login/>
            }
        </div>
    )
}