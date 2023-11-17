import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import { AppProvider } from './service/AppContext'
import Home from './pages/Home'
import Login from './pages/Login'


function App() {
  const [isAutenticated, setIsAutenticated] = useState
    (document.cookie.split('=')[1])


  return (
    <AppProvider>
      <BrowserRouter>
        <div className="container m-auto">
          <Routes>
            <Route
              path='/home'
              element={isAutenticated ? <Home /> : <Navigate to='/' />} />
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





