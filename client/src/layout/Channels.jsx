import React, { useEffect, useState } from 'react'

import { useAppContext } from '../service/AppContext';


import { IoIosArrowBack } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import Profile from '../components/Profile';
import { avatar } from '../assets/index.js'

const Channels = ({ members, setMembers, userLogin, setChannelTitle, setAddChannel }) => {

   const [channels, setChannels] = useState([]);
   const [showChannel, setShowChannel] = useState(true);

   const { users } = useAppContext();

   const apiChannels = async () => {
      try {
         const response = await fetch('http://localhost:3000/api/channel');
         const data = await response.json();
         setChannels(data);
      } catch (error) {
         console.error('Error fetching channels:', error);
      }
   };

   useEffect(() => {
      apiChannels();
   }, []);

   const showMembersOrChannel = () => {
      setMembers(!members)
   }

   const hanldeShowChannels = () => {
      setShowChannel(!showChannel)
   }

   const handleChannelSelected = (id) => {
      //cerramos nav
      setMembers(!members)
      setShowChannel(!showChannel)

      //cambia titulo header por defecto a bienenida
      if (id === 0) {
         return setChannelTitle('canal de bienvenida')
      }
      //cambia titulo header segun su id
      if (channels) {
         const toGoChannel = channels.find(channel => channel.id === id)
         return (
            setChannelTitle(toGoChannel.name)
         )

      }


   }


   return (
      <article className={`w-full max-w-xs h-screen bg-primary text-customText flex flex-col  fixed top-0 left-0 ${members ? 'transform translate-x-[-120%] transition-transform duration-500 ease-in-out' : ''} z-10 lg:fixed lg:transform-none  `}>

         <header
            className=' flex flex-row justify-start items-center w-full h-16 p-3  relative'>
            {showChannel ? <IoIosArrowBack
               className='text-4xl cursor-pointer '
               onClick={hanldeShowChannels} /> : ''}

            <h2 className='uppercase font-bold text-lg pl-3 '>{showChannel ? 'Todos los canales' : 'Canales'}</h2>
            {showChannel ? '' : <IoAdd onClick={() => setAddChannel(true)} />}

            <span className='w-10 h-10 rounded-xl  text-3xl p-1 absolute right-1 border border-white cursor-pointer hover:bg-black lg:hidden'
               onClick={showMembersOrChannel}><IoClose /></span>
         </header>
         <section className='px-9 '>
            {showChannel ? <>
               <h3 className='uppercase font-bold py-4'>Canal de Bienvenida</h3>
               <p className=''>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium sit dignissimos voluptatum repellat, deserunt vitae cumque natus cupiditate illo excepturi molestiae</p>

               <h2 className='uppercase py-5'>Miembros del canal</h2>
            </> : <input type="text" />}
            <ul className='h-52 border border-white overflow-auto'>
               {showChannel ? '' : <li className='cursor-pointer mt-3' onClick={() => handleChannelSelected(0)}>Canal de Bienvenida</li>}

               {channels ? channels.map(member => {
                  if (showChannel) {
                     const user = users?.find((user) => user.id === member.creator_id);

                     return (
                        <li className=' pb-5' key={member.id}>
                           <img className='w-10 h-10 border border-white rounded p-1' src={avatar} alt="" />
                           <span className='pt-2'>{user ? `${user?.name} ${user.lastname}` : 'Usuario Desconocido'}</span>
                        </li>
                     )
                  } else {
                     return (

                        <li id={member.id} key={member.id} className='pt-2 cursor-pointer'
                           onClick={() => handleChannelSelected(member.id)}>{member.name}</li>
                     )
                  }

               }) : ''}
            </ul>


         </section>
         <Profile
            userLogin={userLogin} />
      </article>
   )
}

export default Channels