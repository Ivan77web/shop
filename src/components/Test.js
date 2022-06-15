import React, { useContext } from "react";
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { Context } from "..";

export default function Test(){
    const {firestore} = useContext(Context);
    const db = firestore

    // cities - название коллекции
    // LA - название элемента

    const test = async () => {
        await setDoc(doc(db, "cities", "LA"), {
            name: "Los Angeles",
            state: "CA",
            country: "USA",
            capital: false
        });
    }

    const washingtonRef = doc(db, "cities", "LA");
    const testTwo = async () => {
        await updateDoc(washingtonRef, {
            capital: true
        });
    }

    const testThree = async () => {
        await deleteDoc(doc(db, "cities", "LA"));
    }

    return(
        <div>
            <button onClick={test}>Добавить элемент в БД</button>
            <button onClick={testTwo}>Изменить элемент в БД</button>
            <button onClick={testThree}>Удалить элемент в БД</button>
        </div>
    )
} 

