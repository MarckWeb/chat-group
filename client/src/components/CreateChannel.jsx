import React, { useEffect, useState } from 'react';
import { jwtDecode } from "jwt-decode";
import { useContextChannels } from '../service/Channel.config.context';

const CreateChannel = ({ setAddChannel }) => {
   const [userId, setUserId] = useState('')
   const [titleChannel, setTitleChannel] = useState('')
   const [descripcionChannel, setDescriptionChannel] = useState('')
   const { handleChannels } = useContextChannels()

   useEffect(() => {
      const user = document.cookie.split('=')[1] || localStorage.getItem('token')
      const decodeId = jwtDecode(user).id
      setUserId(decodeId)
   }, [])


   const hanldeCreateChannelForm = async (e) => {
      e.preventDefault()

      const data = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(
            {

               name: titleChannel,
               description: descripcionChannel,
               creator_id: userId
            })
      }
      try {
         const res = await fetch('http://localhost:3000/api/channel', data)
         const resData = await res.json()
         if (resData.ok === true && resData.status === 200) {
            setTitleChannel('')
            setDescriptionChannel('')
            setAddChannel(false)
            handleChannels()
            return alert(resData.message)
         }

         if (resData.ok === false) {
            return alert(resData.message)
         }
      } catch (error) {
         console.error('Error al registrar usuario:', error);
      }
   }

   const cancelCreateChannel = (e) => {
      e.preventDefault()
      setAddChannel(false)
   }
   return (
      <div className='w-full max-w-[500px] h-80 bg-[#120F13] text-white rounded-xl fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-30 p-5'>
         <p className='uppercase font-bold mb-3'>Crear nuevo canal</p>
         <form
            action=""
            className='flex flex-col justify-center items-center gap-3'>
            <input
               className='w-full rounded-lg h-12 bg-[#3C393F] p-3'
               type="text"
               name='channelName'
               placeholder='Nombre de canal'
               value={titleChannel}
               onChange={(e) => setTitleChannel(e.target.value)} />

            <textarea
               className='w-full rounded-lg h-[115px] bg-[#3C393F] p-3'
               placeholder='Descripcion de canales'
               value={descripcionChannel}
               onChange={(e) => setDescriptionChannel(e.target.value)}>

            </textarea>

            <div className='flex flex-row gap-6'>
               <button className='w-24 h-10  rounded-lg bg-[#2F80ED] ml-auto' onClick={cancelCreateChannel}>
                  Cancelar
               </button>
               <button className='w-24 h-10  rounded-lg bg-[#2F80ED] ml-auto' onClick={hanldeCreateChannelForm}>
                  Crear Canal
               </button>
            </div>

         </form>
      </div>
   )
}

export default CreateChannel