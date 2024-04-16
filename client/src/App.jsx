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
    try {
      // Intentar obtener el token de localStorage
      const localStorageToken = localStorage.getItem('token');

      if (localStorageToken) {
        setIsAutenticated(localStorageToken);
      } else {
        // Si no hay token en localStorage, intentar obtenerlo de las cookies
        const token = document.cookie.split('=')[0];
        if (token) {
          setIsAutenticated(token);
        } else {
          setIsAutenticated('');
        }
      }
    } catch (error) {
      console.error('Error al obtener el token', error);
    }
  }, []);

  return (
    <AppProviderUsers>
      <AppProviderChannels>
        <AppProviderMembers>
          <AppProviderComments>
            <AppProviderImages>
              <div className="font-primary ">
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





