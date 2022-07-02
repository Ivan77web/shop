import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../../..";
import cl from "../../styles/OurAdmins.module.css"
import Loader from "../../UI/loader/Loader";
import MyInput from "../../UI/MyInput";
import OneUser from "../ourUsers/OneUser";


export default function OurAdmins() {
    const {auth, firestore} = useContext(Context);
    const [user] = useAuthState(auth);
    const [inputValue, setInputValue] = useState("");
    const [allUsers, loading] = useCollectionData(
        firestore.collection("allUsers")
    )
    const [allUsersFilter, setAllUsersFilter] = useState([]);
    const [admins, setAdmins] = useState([])
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(()=>{
        if(allUsers){
            const filterUsers = allUsers.filter( user => user.id.toLowerCase().includes(inputValue.toLowerCase()) );
            setAllUsersFilter(filterUsers)
        }
    }, [inputValue, allUsers])

    useEffect(() => {
        let admins = allUsersFilter.filter( user => (user.status == "admin" || user.status == "mainAdmin" ) )
        setAdmins(admins);
    }, [allUsersFilter])

    useEffect( () => {
        if(user && !loading){
            allUsers.map( oneUser => {
                if(oneUser.id == user.uid){
                    if(oneUser.status == "mainAdmin"){
                        setIsAdmin(true)
                    }
                }
            }) 
        }
    }, [user, allUsers])

    if(loading){
        return(
            <Loader/>
        )
    }

    return(
        <div className={cl.ourAdmins}>
            <h3 className={cl.intro}>Админы</h3>

            <div className={cl.filters}>
                <MyInput width="80%" height="20px" name="Поиск по id" fontSize="20px" value={inputValue} onChange={setInputValue}/>
            </div>

            {
                admins.map( user => 
                    <OneUser key={user.id} user={user} isAdmin={isAdmin}/>
                )
            }
        </div>
    )
}