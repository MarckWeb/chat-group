
import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'

import { AppProvider } from './service/AppContext'
import Home from './pages/Home'
import Login from './pages/Login'


function App() {



  return (
    <AppProvider>
      <BrowserRouter>
        <div className="container m-auto bg-primary text-customText ">
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





