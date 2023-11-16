import React, { useEffect, useState } from 'react'

import { useAppContext } from '../service/AppContext';

import { IoIosArrowBack } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Profile from '../components/Profile';
import { avatar } from '../assets/index.js'

const Channels = ({ members, setMembers }) => {

   const [channels, setChannels] = useState();
   const [showChannel, setShowChannel] = useState(true)

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

   const hanldeShowChannels = () => {
      setShowChannel(!showChannel)
   }

   useEffect(() => {
      apiChannels()
   }, [])
   return (
      <article className={`w-full max-w-xs h-screen bg-primary text-customText flex flex-col  absolute top-0 left-0 ${members ? 'transform translate-x-[-120%] transition-transform duration-500 ease-in-out' : ''} z-10 lg:fixed lg:transform-none  `}>
         <header
            className=' flex flex-row justify-start items-center w-full h-16 p-3  relative'>
            {showChannel ? <IoIosArrowBack
               className='text-4xl cursor-pointer '
               onClick={hanldeShowChannels} /> : ''}



            <h2 className='uppercase font-bold text-lg pl-3 '>{showChannel ? 'Todos los canales' : 'Canales'}</h2>
            {showChannel ? '' : <IoAdd />}

            <span className='w-14 h-14 rounded-xl  text-5xl bg-primary absolute left-80 border border-white cursor-pointer hover:bg-black lg:hidden'
               onClick={showMembersOrChannel}><IoClose /></span>
         </header>
         <section className='px-9 '>
            {showChannel ? <>
               <h3 className='uppercase font-bold py-4'>Canal de Bienvenida</h3>
               <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium sit dignissimos voluptatum repellat, deserunt vitae cumque natus cupiditate illo excepturi molestiae</p>

               <h2 className='uppercase py-5'>Miembros del canal</h2>
            </> : <input type="text" />}

            {channels ? channels.map(member => {
               if (showChannel) {
                  const user = users?.find((user) => user.id === member.creator_id);

                  return (
                     <div className=' pb-5' key={member.id}>
                        <img className='w-10 h-10 border border-white rounded p-1' src={avatar} alt="" />
                        <p className='pt-2'>{user ? `${user?.name} ${user.lastname}` : 'Usuario Desconocido'}</p>
                     </div>
                  )
               } else {
                  return (
                     <div className='flex flex-row items-center gap-4 pb-5' key={member.id}>

                        <p className='pt-2'>{member.name}</p>
                     </div>
                  )
               }

            }) : ''}

         </section>
         <Profile />
      </article>
   )
}

export default Channels