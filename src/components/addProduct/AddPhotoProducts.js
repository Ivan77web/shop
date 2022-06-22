import React, { useState, useEffect } from "react";
import cl from "../styles/AddPhotoProducts.module.css"

export default function AddPhotoProducts({setProductPhoto}){
    const [input, setInput] = useState();

    useEffect(()=>{
        setInput(document.querySelector('input'));
    },[])

    function updateImageDisplay() {
        const curFiles = input.files; // данные о фото
        setProductPhoto(curFiles[0]);

        if(curFiles.length === 0) {
            alert("Фотографии не загружены");
        } else {
            const list = document.createElement('ol');
            document.querySelector(`.${cl.blockPhoto}`).appendChild(list);

            for(let i = 0; i < curFiles.length; i++) {
                const listItem = document.createElement('li');
                
                if(validFileType(curFiles[i])) {
                    const image = document.createElement('img');
                    image.classList.add(cl.photo) // стили фото
                    image.src = window.URL.createObjectURL(curFiles[i]); // вот тут все происходит
                    listItem.appendChild(image);
                }
  
                list.appendChild(listItem);
            }
        }
    }

    var fileTypes = [
        'image/jpeg',
        'image/pjpeg',
        'image/png'
    ]
  
    function validFileType(file) {
        for(let i = 0; i < fileTypes.length; i++) {
            if(file.type === fileTypes[i]) {
                return true;
            }
        }
  
        return false;
    }

    // Добавить атрибут multiple в input, чтобы добавлять несколько фотографий

    return(
        <form className={cl.addPhotoProducts} method="post" encType="multipart/form-data">

            <div>
                <label htmlFor="image_uploads">Добавить фото (PNG, JPG)</label>
                <input className={cl.input} onChange={updateImageDisplay} type="file" id="image_uploads" name="image_uploads" accept=".jpg, .jpeg, .png"/> 
            </div>

            <div className={cl.blockPhoto}>
                
            </div>

        </form>
    )
}