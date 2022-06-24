import React, { useContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../../../..";
import ProductPageAdmin from "./ProductPageAdmin";
import cl from "../../../styles/AllProducts.module.css"
import MyInput from "../../../UI/MyInput";

export default function AllProducts() {
    const {auth, firestore} = useContext(Context);
    const [products, loading] = useCollectionData(
        firestore.collection("products")
    )
    const [filter, setFilter] = useState("")
    const [filterProducts, setFilterProducts] = useState();

    useEffect(()=>{
        if(products){
            const filterProducts = products.filter( product=>
                product.article.includes(filter)
            ) 

            setFilterProducts(filterProducts)
        }
    },[products, filter])

    if(loading, !filterProducts){
        return(
            <div>
                LOADING
            </div>
        )
    }

    return(
        <div className={cl.allProducts}>
            <div className={cl.intro}>Все товары</div>

            <div className={cl.filterInput}>
                <MyInput width="100%" height="30px" name="Поис по артикулу" fontSize="15px" value={filter} onChange={setFilter}/>
            </div>

            <div>
                {
                    filterProducts.length != 0
                    ?
                    <div className={cl.products}>
                    {
                        filterProducts.map(product => 
                            <ProductPageAdmin key={product.article} product={product}/>
                        )
                    }
                    </div>
                    :
                    <div className={cl.textError}>Товары по такому фильтру не найдены</div>
                }
            </div>
        </div>
    )
}