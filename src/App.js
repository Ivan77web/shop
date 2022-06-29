import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/AppRouter';
import Navbar from "./components/Navbar"
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext, useEffect, useState } from 'react';
import { Context } from ".";
import Loader from './components/UI/loader/Loader';

function App() {
  const {auth} = useContext(Context);
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingRoutes, setLoadingRoutes] = useState(true);

  useEffect(()=>{
    if(user){
        if(user.email == "ivanshestopalov39@gmail.com" && user.displayName == "Макс Белый"){
            setIsAdmin(true);
        }
    }else{
      setIsAdmin(false)
      setLoadingRoutes(false)
    }
  }, [user])

  if(loadingRoutes){
    return(
        <Loader/>
    )
  }

  return (
    <BrowserRouter>
      <Navbar isAdmin={isAdmin}/>
      <AppRouter user={user} isAdmin={isAdmin}/>
    </BrowserRouter>
  );
}

export default App;
