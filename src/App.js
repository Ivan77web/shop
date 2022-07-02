import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/AppRouter';
import Navbar from "./components/Navbar"
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext, useEffect, useState } from 'react';
import { Context } from ".";
import Loader from './components/UI/loader/Loader';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { doc, setDoc, updateDoc, deleteDoc } from "firebase/firestore";

function App() {
  const {auth, firestore} = useContext(Context);
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState({})
  const [allUsers] = useCollectionData(
    firestore.collection("allUsers")
  )

  useEffect(()=>{
    if(allUsers && user != null){
      allUsers.map( elem => {
        if(elem.name == user.displayName && elem.email == user.email){
          if(elem.name == "Макс Белый" && elem.email == "ivanshestopalov39@gmail.com"){
            setDoc(doc(firestore, "allUsers", `user_${elem.id}`), {
              name: elem.name,
              email: elem.email,
              id: elem.id,
              status: "mainAdmin"
            });
          }
          setUserData(elem)
        }
      })
    }
  }, [allUsers, user])

  return (
    <BrowserRouter>
      <Navbar userData={userData}/>
      <AppRouter userData={userData}/>
    </BrowserRouter>
  );
}

export default App;
