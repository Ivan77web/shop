import React from "react";
import cl from "../styles/CheckBlock.module.css"

export default function CheckBlock({ productsMyCart, allPrice, searchDataProductInAllProduct}) {
    return(
        <div className={cl.checkBlockMain}>
            <div className={cl.intro}>
                Чек заказа:
            </div>

            <div className={cl.checkBlock}>

                <table className={cl.table}>
                    <thead>
                        <tr>
                            <th className={cl.tableBrand}>Бренд</th>
                            <th className={cl.tableModel}>Модель</th>
                            <th className={cl.tableModel}>Размер</th>
                            <th className={cl.tableNumber}>Кол-во</th>
                            <th className={cl.tablePrice}>Цена</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            productsMyCart.map(product => 
                                <tr className={cl.trOneTable} key={product.article + product.size}>
                                    <td>{searchDataProductInAllProduct(product.article).brand}</td> 
                                    <td>{searchDataProductInAllProduct(product.article).model}</td>
                                    <td>{product.size}</td>
                                    <td>{product.number}</td>
                                    <td>{searchDataProductInAllProduct(product.article).price * product.number} руб.</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>

                <div style={{display: "flex"}}>
                    <div style={{height: "30px", marginLeft: "30px"}}>
                        <strong>Итого</strong>
                    </div>

                    <div style={{width:"100%", height: "30px", textAlign: "right", marginRight:"15px"}}>
                        <strong>{allPrice} руб.</strong>
                    </div>
                </div>
            </div>
        </div>
    )
}