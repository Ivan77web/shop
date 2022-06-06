import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Login";
import Shop from "./Shop";
import Profile from "./Profile";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { Context } from "..";
import Cart from "./Cart";
import AddProduct from "./AddProduct";

export default function AppRouter(){
    const {auth} = useContext(Context);
    const [user, loading, error] = useAuthState(auth);

    return user ? 
    (
        <Routes>
            <Route path="/" element={<Shop/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/addproduct" element={<AddProduct/>} />
            <Route path="*" element={<Shop/>}/>
        </Routes>
    )
    :
    (
        <Routes>
            <Route path="/" element={<Shop/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="*" element={<Shop/>}/>
        </Routes>
    )
}