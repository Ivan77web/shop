import React, { useEffect, useState, useContext } from "react";
import { useAuthState } from 'react-firebase-hooks/auth';
import { Context } from "..";

export default function Profile(){
    const {auth, firestore} = useContext(Context);
    const [user, loading, error] = useAuthState(auth);

    return(
        <div>
            <div>{user.displayName}</div>
            <div>{user.email}</div>
        </div>
    )
}