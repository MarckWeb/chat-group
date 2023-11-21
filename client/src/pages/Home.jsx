import React, { useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";


import CommentsFeed from '../layout/CommentsFeed'
import Channels from '../layout/Channels'
import CreateChannel from '../components/createChannel'

const Home = () => {
   const [showMembers, setShowMembers] = useState(true)
   const [channelTitle, setChannelTitle] = useState('')
   const [addChannel, setAddChannel] = useState(false)
   const [userSelect, setUserSelect] = useState()

   //traemos el token de cookies o de localstorage
   const user = document.cookie.split('=')[1] || localStorage.getItem('token')
   useEffect(() => {
      console.log(showMembers)
   }, [showMembers])


   //manejamos usuario señeccionado para el perfil
   const handleUserSelect = async () => {
      try {

         if (user) {
            const res = await fetch(`http://localhost:3000/api/user/${jwtDecode(user).id}`)
            const data = await res.json()
            setUserSelect(data)
         }
      } catch (error) {
         console.error(error)
      }
   }


   useEffect(() => {
      handleUserSelect()
   }, [])




   return (
      <div className='relative lg:flex lg:flex-row'>

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
            userSelect={userSelect} />
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