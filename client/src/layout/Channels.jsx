import React, { useEffect, useState } from 'react'

import { useAppContext } from '../service/AppContext';

import { IoIosArrowBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Profile from '../components/Profile';

const Channels = ({ members, setMembers }) => {

   const [channels, setChannels] = useState();

   const { users } = useAppContext()
   console.log(users)
   const apiChannels = async () => {
      const response = await fetch('http://localhost:3000/api/channel')
      const data = await response.json()
      console.log(data)
      setChannels(data)
   }

   const showMembersOrChannel = () => {
      setMembers(!members)
   }

   useEffect(() => {
      apiChannels()
   }, [])
   return (
      <article className={`w-full max-w-xs border border-red-700 h-screen flex flex-col bg-secondary absolute top-0 left-0 ${members ? 'transform translate-x-[-120%] transition-transform duration-500 ease-in-out' : ''}`}>
         <header
            className=' flex flex-row justify-start items-center w-full h-16 p-3  relative'>
            <IoIosArrowBack className='text-4xl cursor-pointer ' />
            <h2 className='uppercase font-bold text-lg pl-3 '>Todos los Canales</h2>
            <span className='w-14 h-14 rounded-xl  text-5xl bg-primary absolute left-80 border border-white cursor-pointer hover:bg-black '
               onClick={showMembersOrChannel}><IoClose /></span>
         </header>
         <section className='px-9 '>
            <h3 className='uppercase font-bold py-4'>Canal de Bienvenida</h3>
            <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium sit dignissimos voluptatum repellat, deserunt vitae cumque natus cupiditate illo excepturi molestiae</p>

            <h2 className='uppercase py-5'>Miembros del canal</h2>

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