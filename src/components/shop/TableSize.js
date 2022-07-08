import React, { useEffect, useState } from "react";
import arrow from "../../icons/arrow.png"
import cl from "../styles/TableSize.module.css"

export default function TableSize({errorSize, setErrorSize, inputSize, setInputSize, arrSizes}){
    const [menu, setMenu] = useState(false)
    const sizes = arrSizes.split(",")
    const [styleForElem, setStyleForElem] = useState("")
    const open = (e) => {
        if( !(e.target.classList.contains(`${cl.sizeMenu}`)) && !(e.target.classList.contains(`${cl.elemSize}`)) ){
            setMenu(!menu)
        }
    }
    const choiceSize = (e) => {
        setInputSize(e.target.innerHTML);
        setErrorSize(false);
        setMenu(false)
    }

    useEffect(()=>{
        if(inputSize != null && !errorSize){
            setStyleForElem(`${cl.TableSize} ${cl.TableSizeActive}`)
        }else if(errorSize){
            setStyleForElem(`${cl.TableSize} ${cl.TableSizeError}`)
        } else{
            setStyleForElem(`${cl.TableSize}`)
        }
    }, [inputSize, errorSize])

    return(
        <div onClick={open} className= {styleForElem}>
            {
                inputSize
                ?
                    <div className={cl.text}>Выбранный размер: {inputSize}</div>
                :
                    <div className={cl.text}>Выберите размер</div>
            }
            <img src={arrow} className={cl.arrow}/>

            {
                menu
                ?
                <div className={cl.sizeMenu}>
                    {
                        sizes.map(elem => 
                            <div onClick={choiceSize} key={elem} className={cl.elemSize}>{elem}</div>   
                        )
                    }
                </div>
                :
                <div/>
            }
        </div>
    )
}