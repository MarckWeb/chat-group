import { useState, useEffect } from 'react'
import './App.css'

import { AppProviderUsers } from './service/UserContext'
import { AppProviderMembers } from './service/MemberContext'
import { AppProviderChannels } from './service/Channel.config.context'
import { AppProviderComments } from './service/CommentContext'
import Home from './pages/Home'
import Login from './pages/Login'


function App() {
  const [isAutenticated, setIsAutenticated] = useState('')

  useEffect(() => {

    const token = localStorage.getItem('token') || document.cookie.split('=')[1];
    if (token) {
      setIsAutenticated(token)
    }
    else {
      setIsAutenticated('')
    }
  }, [])


  return (
    <AppProviderUsers>
      <AppProviderChannels>
        <AppProviderMembers>
          <AppProviderComments>
            <div className="container m-auto">
              {isAutenticated
                ? <Home
                  setIsAutenticated={setIsAutenticated} />
                : <Login
                  isAutenticated={isAutenticated}
                  setIsAutenticated={setIsAutenticated} />}
            </div>
          </AppProviderComments>
        </AppProviderMembers>
      </AppProviderChannels>
    </AppProviderUsers>
  )
}

export default App





