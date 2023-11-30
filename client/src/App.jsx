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
      console.log('Todas las cookies:', document.cookie);
      // Intentar obtener el token de localStorage
      const localStorageToken = localStorage.getItem('token');

      if (localStorageToken) {
        console.log('Token encontrado en localStorage:', localStorageToken);
        setIsAutenticated(localStorageToken);
      } else {
        // Si no hay token en localStorage, intentar obtenerlo de las cookies

        const token = document.cookie.split(';').map(cookie => cookie.trim()).find(cookie => cookie.startsWith('token='));

        if (token) {
          console.log('Token encontrado en cookies:', token);
          setIsAutenticated(token);
        } else {
          console.log('Token no encontrado');
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





