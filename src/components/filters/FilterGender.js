import React from "react";
import arrow from "../../icons/arrow.png"
import cl from "../styles/FilterGender.module.css"

export default function FilterGender({filterGender, setFilterGender}) {
    const openGenderMenu = e => {
        if (!(e.target.closest(`.${cl.genders}`))) {
            const variants = e.target.closest(`.${cl.filterGender}`).querySelector(`.${cl.genders}`);
            const img = e.target.closest(`.${cl.filterGender}`).querySelector(`.${cl.arrowImg}`);
            const filterGender = e.target.closest(`.${cl.filterGender}`);

            variants.classList.toggle(cl.active)
            img.classList.toggle(cl.activeImg);
            filterGender.classList.toggle(cl.openMenu)
        }
    }

    const choiseGender = (e, gender) => {
        setFilterGender(gender);
        
        const variants = e.target.closest(`.${cl.filterGender}`).querySelector(`.${cl.genders}`);
        const filterGender = e.target.closest(`.${cl.filterGender}`);
        const img = e.target.closest(`.${cl.filterGender}`).querySelector(`.${cl.arrowImg}`);

        variants.classList.toggle(cl.active)
        img.classList.toggle(cl.activeImg);
        filterGender.classList.toggle(cl.openMenu)
    }

    return (
        <div onClick={e => openGenderMenu(e)} className={cl.filterGender}>
            
            <div className={cl.introGender}>
                <p>{filterGender == "" ? "Пол" : filterGender}</p>
                <img className={cl.arrowImg} src={arrow} />
            </div>

            <div className={cl.genders + " " + cl.active}>
                <div className={cl.variants}>
                    <p onClick={(e) => choiseGender(e, "Не выбрано")} className={cl.variant}>Не выбрано</p>
                    <p onClick={(e) => choiseGender(e, "Мужской")} className={cl.variant}>Мужской</p>
                    <p onClick={(e) => choiseGender(e, "Женский")} className={cl.variant}>Женский</p>
                </div>
            </div>
        </div>
    )
}