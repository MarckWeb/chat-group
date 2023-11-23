import React, { useState, useRef } from 'react'
import { useContextComments } from '../service/CommentContext.jsx';
import { useContextMembers } from '../service/MemberContext.jsx';
import EmojiPicker from 'emoji-picker-react';
import { IoMdSend } from "react-icons/io";
import { AiOutlineLink } from "react-icons/ai";
import { CiFaceSmile } from "react-icons/ci";

const BoxComent = ({ userSelect, channelTitle }) => {
   const commentsListRef = useRef();
   const [formState, setFormState] = useState({ comment: '' });
   const [seeEmogis, setSeeEmogis] = useState(false)
   const { handleComments } = useContextComments()
   const { handleMembers } = useContextMembers()

   // Función para manejar la selección de emojis.
   const onEmojiClick = (emojiObject) => {
      setFormState((prevFormState) => ({
         ...prevFormState,
         comment: prevFormState.comment + emojiObject.emoji,
      }));

      setSeeEmogis(!seeEmogis)
   };

   // Función para hacer que el usuario actual sea miembro del canal.
   const handleMemberChannel = async () => {
      const data = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(
            {
               userId: userSelect.id,
               channelId: channelTitle ? channelTitle.id : 11
            })
      }
      try {
         const res = await fetch('http://localhost:3000/api/members', data)
         const resData = await res.json()

         if (resData.ok === true && resData.status === 200) {
            handleMembers()
            alert('Ahora eres miembro del canal: ' + channelTitle.name)
         }
      } catch (error) {
         console.error('Error al registrar usuario:', error);
      }
   }

   // Función para enviar un comentario.
   const handleSendComment = async (e) => {
      console.log('desde otro compoenet')
      e.preventDefault()
      if (formState !== '') {
         const data = {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(
               {
                  content: formState.comment,
                  userId: userSelect.id,
                  channelId: channelTitle ? channelTitle.id : 11
               })
         }
         try {
            const res = await fetch('http://localhost:3000/api/comments', data)
            const resData = await res.json()

            if (resData.ok === true && resData.status === 200) {
               setFormState({
                  comment: ''
               })
               handleMemberChannel()
               handleComments()
               // Verifica que este mensaje se imprima en la consola.
               console.log('Desplazando hacia abajo después de agregar un nuevo comentario');

               // Desplazar automáticamente hacia abajo después de agregar un nuevo comentario
               if (commentsListRef.current) {
                  commentsListRef.current.scrollTop = commentsListRef.current.scrollHeight;
               }
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
            <span className='text-2xl cursor-pointer mx-3 '><AiOutlineLink /></span>
            <input
               className='w-full bg-transparent outline-none'
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






