import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';


import { AppProvider } from './service/AppContext'
import Home from './pages/Home'
import Login from './pages/Login'


function App() {
  const [isAutenticated, setIsAutenticated] = useState('')

  useEffect(() => {

    const token = localStorage.getItem('token') || document.cookie.split('=')[1];

    console.log(token)
    if (token) {
      setIsAutenticated(token)
    }
    else {
      setIsAutenticated('')
    }
  }, [])
  useEffect(() => {
    console.log(isAutenticated)
  }, [isAutenticated])

  return (
    <AppProvider>

      <div className="container m-auto">
        {isAutenticated
          ? <Home
            setIsAutenticated={setIsAutenticated} />
          : <Login
            isAutenticated={isAutenticated}
            setIsAutenticated={setIsAutenticated} />}
      </div>
    </AppProvider>
  )
}

export default App





