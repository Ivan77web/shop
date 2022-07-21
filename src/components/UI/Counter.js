import React, { useContext, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../..";
import cl from "./styles/Counter.module.css"
import { doc, updateDoc } from "firebase/firestore";

export default function Counter({user, product, deleteProductOnCart}) {
    const {firestore} = useContext(Context);
    const [productOnCart] = useCollectionData(
        firestore.collection(`cart_${user.uid}`)
    )
    const [count, setCount] = useState()

    useEffect(()=>{
        if(productOnCart){
            productOnCart.map((productOnCart)=>{
                if(productOnCart.article === product.article && productOnCart.size === product.size){
                    setCount(productOnCart.number)
                }
            })
        }
    }, [productOnCart])

    const decrement = async () => {
        const ref = doc(firestore, `cart_${user.uid}`, `${product.article}_size${product.size}`);
        await updateDoc(ref, {
            number: Number(count) - 1
        });    
    }

    const increment = async () => {
        const ref = doc(firestore, `cart_${user.uid}`, `${product.article}_size${product.size}`);
        await updateDoc(ref, {
            number: Number(count) + 1
        });
    }

    useEffect(()=>{
        if(count < 1){
            deleteProductOnCart()
        }
    }, [count])

    if(count){
        return(
            <div className={cl.counter}>
                <button onClick={decrement} className={cl.decrement}>-</button>
                <div className={cl.num}>{count}</div>
                <button onClick={increment} className={cl.increment}>+</button>
            </div>
        )
    }
}
