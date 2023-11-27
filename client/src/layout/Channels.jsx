import React, { useState } from 'react'

import { useContextUsers } from '../service/UserContext.jsx';
import { useContextChannels } from '../service/Channel.config.context.jsx'
import { useContextMembers } from '../service/MemberContext.jsx';

import { IoIosArrowBack } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import Profile from '../components/Profile';

const Channels = ({ showMembers, setShowMembers, userLogin, setChannelTitle, setAddChannel, channelTitle, userSelect, handleUserSelect, setIsAutenticated }) => {

   const [showChannel, setShowChannel] = useState(true);
   const { users } = useContextUsers();
   const { channels } = useContextChannels()
   const { members } = useContextMembers()

   //muestra entre miembros y canal
   const showMembersOrChannel = () => {
      setShowMembers(!showMembers)
   }

   //cierra y muestra los canales
   const handleShowChannels = () => {
      setShowChannel(!showChannel)
   }

   //selecionar el canal
   const handleChannelSelected = (id) => {
      //cerramos nav
      setShowMembers(!showMembers)
      setShowChannel(!showChannel)

      //cambia titulo header segun su id
      if (channels) {
         const toGoChannel = channels.find(channel => channel.id === id)

         return (
            setChannelTitle(toGoChannel)
         )
      }
   }

   return (
      <article className={`w-full max-w-xs h-screen bg-primary text-customText flex flex-col  fixed top-0 left-0 ${showMembers ? 'transform translate-x-[-120%] transition-transform duration-500 ease-in-out' : ''} z-10 lg:fixed lg:transform-none  `}>

         <header
            className=' flex flex-row justify-start items-center w-full h-16 p-3  relative border-collapse border-b-2'>
            <div className='flex flex-row justify-between items-center '>
               {showChannel
                  ? <span className='bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 w-8 h-8 rounded'>
                     <IoIosArrowBack
                        className='text-3xl cursor-pointer '
                        onClick={handleShowChannels} />
                  </span>
                  : ''}

               <h2 className='uppercase font-bold text-lg pl-3 '>
                  {showChannel
                     ? 'Todos los canales'
                     : 'Canales'}</h2>
               {showChannel
                  ? ''
                  : <span className=' ml-40 w-8 rounded-md h-8 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 text-3xl cursor-pointer hover:bg-black'>
                     <IoAdd
                        onClick={() => setAddChannel(true)} />
                  </span>}
            </div>

            {showChannel
               ? <span
                  className='w-8 h-8 rounded-md  text-3xl absolute right-1 border border-white cursor-pointer hover:bg-black lg:hidden'
                  onClick={showMembersOrChannel}><IoClose /></span>
               : ''}
         </header>
         <section className='px-7 '>
            {showChannel && channels
               ? <>
                  <h3 className='uppercase font-bold py-4'>{channelTitle ? channelTitle.name : channels[0].name}</h3>
                  <p className='italic'>{channelTitle ? channelTitle.description : channels[0].description}</p>

                  <h2 className='uppercase py-5 font-bold'>Miembros del canal</h2>
               </>
               : <div className='flex flex-row gap-2 items-center w-64 h-12 rounded-lg bg-[#3C393F] p-2 mt-4'>
                  <CiSearch className='text-2xl' />
                  <input
                     className='w-full outline-none bg-transparent'
                     type="text"
                     name='channel'
                     placeholder='Search' />
               </div>}
            <ul className='h-52'>
               {showChannel && channelTitle === ''
                  ? <>
                     {members?.filter(member => member.channel_id === 1)
                        .map(member => {
                           const user = users?.find((user) => user.id === member.user_id);
                           return (
                              <li className='pl-4 p-1 rounded bg-gray-300 flex flex-row items-center gap-5 mb-4 text-black shadow-4xl'
                                 key={member.id}>

                                 <img
                                    className='w-10 h-10 border border-black  rounded-[50%]'
                                    src={user?.profile_image}
                                    alt="" />


                                 <span
                                    className='pt-2'>{user
                                       ? `${user.name}  ${user.lastname}`
                                       : 'Usuario Desconocido'}</span>

                              </li>
                           )
                        })}
                  </> : ''}
               {showChannel
                  ? members?.filter(member => member.channel_id === channelTitle.id)
                     .map((member) => {
                        const user = users?.find((user) => user.id === member.user_id);
                        return (
                           <li className='p-1 rounded bg-gray-300 flex flex-row items-center gap-5 mb-2 text-black shadow-4xl'
                              key={member.id}>
                              <figure >
                                 <img
                                    className='w-10 h-10 border border-black rounded-[50%]'
                                    src={user?.profile_image}
                                    alt="" />
                              </figure>

                              <span
                                 className='pt-2'>{user
                                    ? `${user.name}  ${user.lastname}`
                                    : 'Usuario Desconocido'}</span>
                           </li>
                        )
                     })
                  : <>
                     {
                        channels?.map(channel => {
                           return <li
                              key={channel.id}
                              className='cursor-pointer mt-4 hover:bg-[#3C393F] h-10 flex flex-row items-center p-2'
                              onClick={() => handleChannelSelected(channel.id)}>
                              <span className='bg-[#3C393F] w-10 h-10 rounded uppercase flex justify-center items-center'>{channel.name.charAt('0')}</span>
                              <span className='ml-3'>{channel.name}</span>
                           </li>
                        })
                     }
                  </>}
            </ul>

         </section>
         <Profile
            userLogin={userLogin}
            userSelect={userSelect}
            handleUserSelect={handleUserSelect}
            setIsAutenticated={setIsAutenticated} />
      </article>
   )
}

export default Channels

//ARREGLAR LAS RUTAS CON DOTEV Y LA IMAGEN DE GOOGLE ELINAR ALGUNOS COMENTARIOS, UX