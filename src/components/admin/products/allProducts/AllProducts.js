import React, { useContext, useEffect, useState } from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Context } from "../../../..";
import ProductPageAdmin from "./ProductPageAdmin";
import cl from "../../../styles/AllProducts.module.css"
import MyInput from "../../../UI/MyInput";
import Loader from "../../../UI/loader/Loader";

export default function AllProducts() {
    const { firestore } = useContext(Context);

    // const [products, loading] = useCollectionData(
    //     firestore.collection("products")
    // )
    //Сейчас удаление происходит только из дублирующей коллекции productsForShop

    const [products, loading] = useCollectionData(
        firestore.collection("productsForShop")
    )
    const [productsAll, loadingTwo] = useCollectionData(
        firestore.collection("products")
    )
    const [filter, setFilter] = useState("")
    const [filterFullProducts, setFilterFullProducts] = useState([])

    useEffect(() => {
        if (products) {

            const filterProducts = products.filter(product =>
                product.article.includes(filter)
            )

            let newProducts = [];

            filterProducts.map( article => {
                if(!loading && !loadingTwo){
                    productsAll.map( prod =>{
                        if(article.article === prod.article){
                            newProducts.push(prod)
                        }
                    })
                }
            })

            setFilterFullProducts(newProducts)
        }
    }, [products, filter])

    if (loading, !filterFullProducts) {
        return (
            <Loader />
        )
    }

    return (
        <div className={cl.allProducts}>
            <div className={cl.intro}>Все товары</div>

            <div className={cl.filterInput}>
                <MyInput width="100%" height="30px" name="Поис по артикулу" fontSize="15px" value={filter} onChange={setFilter} />
            </div>

            <div>
                {
                    filterFullProducts.length !== 0
                        ?
                        <div className={cl.products}>
                            {
                                filterFullProducts.map(product =>
                                    <ProductPageAdmin key={product.article} product={product} />
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