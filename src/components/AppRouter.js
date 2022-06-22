import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./profile/Login";
import Shop from "./shop/Shop";
import Profile from "./profile/Profile";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { Context } from "..";
import Cart from "./cart/Cart";
import AddProduct from "./addProduct/AddProduct";
import ProductPage from "./shop/ProductPage";
import Check from "./check/Check";

export default function AppRouter(){
    const {auth} = useContext(Context);
    const [user, loading, error] = useAuthState(auth);

    return isAdmin 
        ?
            (
                <Routes>
                    <Route path="/" element={<Shop/>}/>
                    <Route path="/profile" element={<Profile/>} />
                    <Route path="/cart" element={<Cart/>} />
                    <Route path="/addproduct" element={<AddProduct/>} />
                    <Route path="/shop" element={<Shop/>}/>
                    <Route path='/shop/:article' element={<ProductPage/>} />
                    <Route path='/check' element={<Check/>} />
                    <Route path="*" element={<Shop/>}/>
                </Routes>
            )
        :
            user 
            ?  
                (
                    <Routes>
                        <Route path="/" element={<Shop/>}/>
                        <Route path="/profile" element={<Profile/>} />
                        <Route path="/cart" element={<Cart/>} />
                        <Route path="/shop" element={<Shop/>}/>
                        <Route path='/shop/:article' element={<ProductPage/>} />
                        <Route path='/check' element={<Check/>} />
                        <Route path="*" element={<Shop/>}/>
                    </Routes>
                )
            :
                (
                    <Routes>
                        <Route path="/" element={<Shop/>}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/profile" element={<Profile/>} />
                        <Route path='/shop/:article' element={<ProductPage/>} />
                        <Route path="*" element={<Shop/>}/>
                    </Routes>
                )
}