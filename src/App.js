import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/AppRouter';
import Navbar from "./components/Navbar"
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext, useEffect, useState } from 'react';
import { Context } from ".";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { doc, setDoc } from "firebase/firestore";
import { ADMIN_DATA } from './utils/adminData';

function App() {
  const { auth, firestore } = useContext(Context);
  const [user] = useAuthState(auth);
  const [userData, setUserData] = useState({})
  const [brandNavBar, setBrandNavbar] = useState("");
  const [allUsers] = useCollectionData(
    firestore.collection("allUsers")
  )

  useEffect(() => {
    if (allUsers && user !== null) {
      allUsers.map(elem => {
        if (elem.name === user.displayName && elem.email === user.email) {
          if (elem.name === ADMIN_DATA.name && elem.email === ADMIN_DATA.email) {
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
      <Navbar brandNavBar={brandNavBar} setBrandNavbar={setBrandNavbar} userData={userData} />
      <AppRouter className="appRouter" brandNavBar={brandNavBar} userData={userData} />
    </BrowserRouter>
  );
}

export default App;
