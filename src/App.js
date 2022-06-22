import { BrowserRouter } from 'react-router-dom';
import './App.css';
import AppRouter from './components/AppRouter';
import Navbar from "./components/Navbar"
import { useAuthState } from 'react-firebase-hooks/auth';
import { useContext } from 'react';
import { Context } from ".";

function App() {
  const {auth} = useContext(Context);
  const [user, loading, error] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingRoutes, setLoadingRoutes] = useState(true);

  useEffect(()=>{
    if(user){
        if(user.email == "ivanshestopalov39@gmail.com" && user.displayName == "Макс Белый"){
            setIsAdmin(true);
        }
        setLoadingRoutes(false)
    }
  }, [user])

  if(loadingRoutes){
    return(
        <div>
            LOADING
        </div>
    )
  }

  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
