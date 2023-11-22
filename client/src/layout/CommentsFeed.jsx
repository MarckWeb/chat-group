import React, { useState, useRef } from 'react';
import { format, parseISO } from 'date-fns';
import EmojiPicker from 'emoji-picker-react';
import Header from './Header'

import { useContextUsers } from '../service/UserContext.jsx';
import { useContextComments } from '../service/CommentContext.jsx';
import { useContextMembers } from '../service/MemberContext.jsx';
import { IoMdSend } from "react-icons/io";
import { AiOutlineLink } from "react-icons/ai";
import { CiFaceSmile } from "react-icons/ci";

const CommentsFeed = ({ showMembers, setShowMembers, channelTitle, userSelect }) => {
   const commentsListRef = useRef();
   const [formState, setFormState] = useState({ comment: '' });
   const [seeEmogis, setSeeEmogis] = useState(false)

   // Contextos para obtener datos.
   const { users } = useContextUsers()
   const { comments, handleComments } = useContextComments()
   const { members, handleMembers } = useContextMembers()

   // Función para formatear la fecha en el formato deseado.
   const formatDate = (isoDate) => {
      const parsedDate = parseISO(isoDate);
      const formattedDate = format(parsedDate, "EEEE h:mm a");
      return formattedDate;
   };

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
      <section className='relative w-full max-w-7xl lg:pl-72'>
         <Header
            showMembers={showMembers}
            setShowMembers={setShowMembers}
            channelTitle={channelTitle}
         />

         <article className='h-full max-h-[800px] pt-16 mb-24 lg:ml-12 overflow-y-auto'
            style={{ overflowY: 'hidden' }}
            ref={commentsListRef}>
            {channelTitle === ''
               ? comments?.filter(comment => comment.channel_id === 11)
                  .map(comment => {
                     const user = users?.find(user => user.id === comment.user_id);

                     return <section key={comment.id} className=' mb-4 flex flex-row gap-3 m-5 bg-gray-200 shadow-lg p-3 rounded-lg '>
                        <img className='w-10 h-10  rounded-[50%] p-1' src={user?.image} alt="" />
                        <div>
                           <p><span className='bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-1 text-white mr-5 rounded-md'>
                              {`${user?.name} ${user?.lastname}`}
                           </span>  <span className='text-gray-400 italic'>{formatDate(comment.date_creation)}</span></p>
                           <p className='mt-2'>{comment.content}</p>
                        </div>
                     </section>
                  }) : ''}
            {comments
               ? comments
                  .filter(comment => comment.channel_id === channelTitle.id)
                  .map(comment => {
                     //pintamos los usuarios que quedaron del filtro de comentarios y canal
                     const user = users?.find(user => user.id === comment.user_id);

                     return <section key={comment.id} className='mb-4 flex flex-row gap-3 m-5 bg-gray-200 p-3 shadow-lg rounded-lg '>
                        <img className='w-12 h-12 rounded-[50%] p-1' src={user?.image} alt="" />
                        <div>
                           <p>
                              <span className='bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-1 text-white mr-5 rounded-md'>{`${user?.name} ${user?.lastname}`}</span> <span >{formatDate(comment.date_creation)}</span></p>
                           <p>{comment.content}</p>
                        </div>
                     </section>
                  })
               : ''}
         </article>

         <section className=' w-full max-w-screen-lg h-20  fixed bottom-0 grid items-center '>
            <div className='h-14 w-11/12 m-auto rounded-lg  flex flex-row items-center bg-gray-300 p-2 relative'>
               <span className='text-2xl cursor-pointer mx-3 '><AiOutlineLink /></span>
               <input
                  className='w-full bg-transparent outline-none'
                  type="text"
                  name='comment'
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
      </section>
   )
}

export default CommentsFeed