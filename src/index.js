import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

firebase.initializeApp(
  {
    apiKey: "AIzaSyAHXlj0EQDMr_-p7X-vostOIyel3s2AtdM",
    authDomain: "shop-f9d27.firebaseapp.com",
    projectId: "shop-f9d27",
    storageBucket: "shop-f9d27.appspot.com",
    messagingSenderId: "264104838803",
    appId: "1:264104838803:web:944f0047a43865e5e1ef66",
    measurementId: "G-DBNPX60FEN",
    storageBucket: 'gs://shop-f9d27.appspot.com'
  }
);

export const Context = createContext(null);

const auth = firebase.auth()
const firestore = firebase.firestore();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context.Provider value={{
    firebase,
    auth,
    firestore
  }}>
    <App />
  </Context.Provider>
);
