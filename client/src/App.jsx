import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";

import { AppProvider } from './service/AppContext'
import Home from './pages/Home'
import Login from './pages/Login'
import { useEffect } from 'react'


function App() {



  useEffect(() => {
    try {
      const user = document.cookie.split('=')[1]
      console.log(user)
      // const { decodedToken, isExpired } = useJwt(user);
      // console.log(decodedToken, isExpired)
      // const token = "eyJ0eXAiO.../// jwt token";
      const decoded = jwtDecode(user);

      console.log(decoded);


    } catch (error) {

    }

  }, [])




  return (
    <AppProvider>
      <BrowserRouter>
        <div className="container m-auto">
          <Routes>
            <Route
              path='/home'
              element={<Home />} />
            <Route
              path='/'
              element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>

    </AppProvider>

  )
}

export default App





