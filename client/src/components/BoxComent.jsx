import React, { useState, useRef, useEffect } from 'react'
import uuid from 'react-uuid';
//appContext
import { useContextComments } from '../service/CommentContext.jsx';
import { useContextMembers } from '../service/MemberContext.jsx';
import { useContextImages } from '../service/ImagesContext.jsx';
import EmojiPicker from 'emoji-picker-react';
//icons
import { IoMdSend } from "react-icons/io";
import { AiOutlineLink } from "react-icons/ai";
import { CiFaceSmile } from "react-icons/ci";

const VITE_URL = import.meta.env.VITE_URL;

const BoxComent = ({ userSelect, channelTitle }) => {
   const [formState, setFormState] = useState({ comment: '' });
   const [imageComment, setImageComment] = useState(null)
   const [seeEmogis, setSeeEmogis] = useState(false)

   const { handleComments } = useContextComments()
   const { handleMembers } = useContextMembers()
   const { handleImages } = useContextImages()

   // Función para manejar la selección de emojis.
   const onEmojiClick = (emojiObject) => {
      setFormState((prevFormState) => ({
         ...prevFormState,
         comment: prevFormState.comment + emojiObject.emoji,
      }));

      setSeeEmogis(!seeEmogis)
   };

   //funcion para enviar la imagen de comentario
   const handleSendImageComment = async (newIdRandom) => {
      const file = new FormData();
      if (imageComment) {
         file.append('imageComment', imageComment);
         file.append('commentsId', newIdRandom)
         const data = {
            method: 'POST',
            body: file,
         };
         const res = await fetch(`${VITE_URL}comments/image`, data)
         const resDta = await res.json()
         if (resDta.ok === true && resDta.status === 200) {
            handleImages()
            setImageComment(null)
         }
      }

   }

   // Función para hacer que el usuario actual sea miembro del canal.
   const handleMemberChannel = async (newIdRandom) => {

      const data = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(
            {
               userId: userSelect.id,
               channelId: channelTitle ? channelTitle.id : 1
            })
      }
      try {
         const res = await fetch(`${VITE_URL}members`, data)
         const resData = await res.json()

         if (resData.ok === true && resData.status === 200) {
            handleMembers()
         }
      } catch (error) {
         console.error('Error al registrar usuario:', error);
      }
   }

   // Función para enviar un comentario.
   const handleSendComment = async (e) => {
      const newIdRandom = uuid()
      e.preventDefault()
      if (formState !== '') {
         const data = {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(
               {
                  id: newIdRandom,
                  content: formState.comment,
                  userId: userSelect.id,
                  channelId: channelTitle ? channelTitle.id : 1
               })
         }
         try {
            const res = await fetch(`${VITE_URL}comments`, data)
            const resData = await res.json()

            if (resData.ok === true && resData.status === 200) {
               setFormState({
                  comment: ''
               })

               //manejamos el llamado a cada api
               handleMemberChannel(newIdRandom)
               handleComments()
               handleSendImageComment(newIdRandom)
            }

            if (resData.ok === false) {
               return alert(resData.message)
            }
         } catch (error) {
            console.error('Error al registrar usuario:', error);
         }
      }
   }


   return (
      <section className=' w-full max-w-screen-lg h-20  fixed bottom-0 grid items-center bg-white'>
         <div className='h-14 w-11/12 m-auto rounded-lg  flex flex-row items-center bg-gray-300 p-2 relative'>
            <div>
               <label className='text-2xl cursor-pointer mx-3' htmlFor="imageComment"><AiOutlineLink /></label>
               <input
                  className='hidden'
                  type="file"
                  name='imageComment'
                  id='imageComment'
                  onChange={(e) => setImageComment(e.target.files[0])} />
            </div>

            <input
               className='w-full bg-transparent outline-none ml-5'
               type="text"
               name='comment'
               autoComplete='off'
               placeholder='Escribe tu comentario'
               value={formState.comment}
               onChange={(e) => setFormState({ ...formState, comment: e.target.value })} />
            <span className='text-2xl cursor-pointer mx-3'
               onClick={() => setSeeEmogis(!seeEmogis)}>
               <CiFaceSmile />
            </span>
            <span
               onClick={handleSendComment}
               className='w-10 h-10 text-2xl flex bg-blue-600 rounded-lg cursor-pointer bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 '>
               <IoMdSend className='m-auto text-white ' />
            </span>
            {seeEmogis ? <div className='absolute bottom-14 right-0'> <EmojiPicker onEmojiClick={onEmojiClick} /></div> : ''}
         </div>
      </section>
   )
}

export default BoxComent






