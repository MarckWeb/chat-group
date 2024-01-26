import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';

import CommentsFeed from '../layout/CommentsFeed'
import Channels from '../layout/Channels'
import CreateChannel from '../components/CreateChannel.jsx'

const VITE_URL = import.meta.env.VITE_URL;

const Home = ({ setIsAutenticated }) => {
   const [showMembers, setShowMembers] = useState(true)
   const [channelTitle, setChannelTitle] = useState('')
   const [addChannel, setAddChannel] = useState(false)
   const [userSelect, setUserSelect] = useState()

   //traemos el token de cookies o de localstorage
   const user = document.cookie.split('=')[1] || localStorage.getItem('token')

   //manejamos usuario seleccionado para el perfil
   const handleUserSelect = async () => {
      try {

         if (user) {
            const res = await fetch(`${VITE_URL}user/${jwtDecode(user).id}`)
            const data = await res.json()
            setUserSelect(data)
         }
      } catch (error) {
         console.error(error)
      }
   }

   useEffect(() => {
      toast.info('Prueba la aplicacion con los datos de este Usuario, o sino puedes crear tu propio usuario')
      handleUserSelect()
   }, [])

   return (
      <div className='lg:ml-7 relative lg:flex lg:flex-row'>

         {addChannel ? <>
            <div className=' w-full h-screen bg-[#3c393f8a] fixed top-0 left-0 z-30 '></div>
            <CreateChannel
               setAddChannel={setAddChannel}
               userSelect={userSelect}
            />
         </> : ''}

         <Channels
            showMembers={showMembers}
            setShowMembers={setShowMembers}
            channelTitle={channelTitle}
            setChannelTitle={setChannelTitle}
            setAddChannel={setAddChannel}
            userSelect={userSelect}
            handleUserSelect={handleUserSelect}
            setIsAutenticated={setIsAutenticated} />
         <CommentsFeed
            showMembers={showMembers}
            setShowMembers={setShowMembers}
            channelTitle={channelTitle}
            setChannelTitle={setChannelTitle}
            userSelect={userSelect} />
      </div>
   )
}

export default Home
