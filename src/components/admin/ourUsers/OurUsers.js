import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../../..";
import cl from "../../styles/OurUsers.module.css"
import Loader from "../../UI/loader/Loader";
import MyInput from "../../UI/MyInput";
import OneUser from "./OneUser";

export default function OurUsers(){
    const {auth, firestore} = useContext(Context);
    const [inputValue, setInputValue] = useState("")
    const [user] = useAuthState(auth);
    const [allUsersFilter, setAllUsersFilter] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false)
    const [allUsers, loading] = useCollectionData(
        firestore.collection("allUsers")
    )

    useEffect(()=>{
        if(allUsers){
            const filterUsers = allUsers.filter( user => user.id.toLowerCase().includes(inputValue.toLowerCase()) );
            setAllUsersFilter(filterUsers)
        }
    }, [inputValue, allUsers])

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
        <div className={cl.ourUsers}>
            <h3 className={cl.intro}>Пользователи</h3>

            <div className={cl.filters}>
                <MyInput width="80%" height="20px" name="Поиск по id" fontSize="20px" value={inputValue} onChange={setInputValue}/>
            </div>

            {
                allUsersFilter.map( user => 
                    <OneUser key={user.id} user={user} isAdmin={isAdmin}/>
                )
            }
        </div>
    )
}