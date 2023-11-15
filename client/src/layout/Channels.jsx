import React, { useEffect, useState } from 'react'

import { useAppContext } from '../service/AppContext';

import { IoIosArrowBack } from "react-icons/io";
import Profile from '../components/Profile';

const Channels = () => {

   const [channels, setChannels] = useState();
   const { users } = useAppContext()
   console.log(users)
   const apiChannels = async () => {
      const response = await fetch('http://localhost:3000/api/channel')
      const data = await response.json()
      console.log(data)
      setChannels(data)
   }

   useEffect(() => {
      apiChannels()
   }, [])
   return (
      <article className='hidden'>
         <header>
            <IoIosArrowBack />
            <h2>Canales</h2>
         </header>
         <section>
            <h3>Canal de Bienvenida</h3>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium sit dignissimos voluptatum repellat, deserunt vitae cumque natus cupiditate illo excepturi molestiae</p>

            <h2>Miembros del canal</h2>

            {channels ? channels.map(member => {
               const user = users?.find((user) => user.id === member.creator_id);

               return (
                  <div key={member.id}>
                     <img src="#" alt="" />
                     <p>{user ? `${user?.name} ${user.lastname}` : 'Usuario Desconocido'}</p>
                  </div>
               )
            }) : ''}

         </section>
         <Profile />
      </article>
   )
}

export default Channels