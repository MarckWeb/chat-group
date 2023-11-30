import { useState, useEffect } from 'react'
import './App.css'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { AppProviderUsers } from './service/UserContext'
import { AppProviderMembers } from './service/MemberContext'
import { AppProviderChannels } from './service/Channel.config.context'
import { AppProviderComments } from './service/CommentContext'
import { AppProviderImages } from './service/ImagesContext'
import Home from './pages/Home'
import Login from './pages/Login'

function App() {
  const [isAutenticated, setIsAutenticated] = useState('')


  //verificamos si exo¡iste un token o cookies para autorizar al chat
  useEffect(() => {
    console.log('entra y que psas')

    const token = localStorage.getItem('token') || document.cookie.split('=')[1];
    if (token) {
      console.log('if')
      console.log(token)
      setIsAutenticated(token)
    }
    else {
      console.log('else')
      console.log(token)
      setIsAutenticated('')
    }
  }, [])

  return (
    <AppProviderUsers>
      <AppProviderChannels>
        <AppProviderMembers>
          <AppProviderComments>
            <AppProviderImages>
              <div className="">
                {isAutenticated
                  ? <Home
                    setIsAutenticated={setIsAutenticated} />
                  : <Login
                    isAutenticated={isAutenticated}
                    setIsAutenticated={setIsAutenticated} />}
                <ToastContainer />
              </div>
            </AppProviderImages>
          </AppProviderComments>
        </AppProviderMembers>
      </AppProviderChannels>
    </AppProviderUsers>
  )
}

export default App





