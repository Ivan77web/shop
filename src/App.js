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

  return (
    <BrowserRouter>
      <Navbar/>
      <AppRouter/>
    </BrowserRouter>
  );
}

export default App;
