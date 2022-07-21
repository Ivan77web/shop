import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./profile/Login";
import Shop from "./shop/Shop";
import Profile from "./profile/Profile";
import Cart from "./cart/Cart";
import ProductPage from "./shop/ProductPage";
import Check from "./check/Check";
import Admin from "./admin/Admin";
import MyAccount from "./admin/myAccount/MyAccount";
import Orders from "./admin/orders/Orders";
import OurUsers from "./admin/ourUsers/OurUsers";
import OurAdmins from "./admin/ourAdmins/OurAdmins";
import AddProduct from "./admin/products/addProduct/AddProduct";
import AllProducts from "./admin/products/allProducts/AllProducts";
import { useAuthState } from "react-firebase-hooks/auth";
import { Context } from "..";
import Loader from "./UI/loader/Loader";
import MyOrders from "./myOrders/MyOrders";

export default function AppRouter({ userData, brandNavBar }) {
    const { auth } = useContext(Context);
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return (
            <Loader />
        )
    }

    return userData.status === "admin" || userData.status === "mainAdmin"
        ?
        (
            <Routes>
                <Route path="/" element={<Shop brandNavBar={brandNavBar} />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/cart" element={<Cart />} />

                <Route path="/admin/*" element={<Admin />}>
                    <Route path="" element={<MyAccount />} />
                    <Route path="myaccount" element={<MyAccount />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="ouradmins" element={<OurAdmins />} />
                    <Route path="ourusers" element={<OurUsers />} />
                    <Route path="addproduct" element={<AddProduct />} />
                    <Route path="allproducts" element={<AllProducts />} />
                </Route>

                <Route path="/shop" element={<Shop brandNavBar={brandNavBar} />} />
                <Route path='/shop/:article' element={<ProductPage />} />
                <Route path='/check' element={<Check />} />
                <Route path='/myOrders' element={<MyOrders />} />
                <Route path="*" element={<Shop brandNavBar={brandNavBar} />} />
            </Routes>
        )
        :
        user
            ?
            (
                <Routes>
                    <Route path="/" element={<Shop brandNavBar={brandNavBar} />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/shop" element={<Shop brandNavBar={brandNavBar} />} />
                    <Route path='/shop/:article' element={<ProductPage />} />
                    <Route path='/check' element={<Check />} />
                    <Route path="*" element={<Shop brandNavBar={brandNavBar} />} />
                    <Route path='/myOrders' element={<MyOrders />} />
                </Routes>
            )
            :
            (
                <Routes>
                    <Route path="/" element={<Shop brandNavBar={brandNavBar} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path='/shop/:article' element={<ProductPage />} />
                    <Route path="*" element={<Shop brandNavBar={brandNavBar} />} />
                </Routes>
            )
}