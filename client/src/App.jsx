import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { AppProvider } from './service/AppContext'
import Home from './pages/Home'
import Login from './pages/Login'


function App() {

  const [isAutenticate, setIsAutenticate] = useState(false)

  return (
    <AppProvider>
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route
              path='/'
              element={<Home />} />
            <Route
              path='/login'
              element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>

    </AppProvider>

  )
}

export default App


//1-- colocar el user global
//2-- en comentarios comprara el id channel, es decir cuando se hace click en canal ese momento se debe llamar a la funcion que imprima todos los comentarios que tengan el channel.id igual al id del cannal, seguido de eso par alos nombres buscar por user_id dentro del map. 




