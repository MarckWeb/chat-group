import React, { useEffect, useState, useRef } from 'react'
import Header from './Header'

import { useContextUsers } from '../service/UserContext.jsx';
import { useContextComments } from '../service/CommentContext.jsx';
import { useContextMembers } from '../service/MemberContext.jsx';
import { avatar } from '../assets/index.js';
import { IoMdSend } from "react-icons/io";

const CommentsFeed = ({ showMembers, setShowMembers, channelTitle, userSelect }) => {
   const commentsListRef = useRef();
   const [formState, setFormState] = useState({ comment: '' });
   const { users } = useContextUsers()
   const { comments, handleComments } = useContextComments()
   const { members, handleMembers } = useContextMembers()


   useEffect(() => {
      // Desplazar automáticamente hacia abajo cuando se actualizan los comentarios
      if (commentsListRef.current) {
         commentsListRef.current.scrollTop = commentsListRef.current.scrollHeight;
      }
   }, [comments]);


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


   const handleSendComment = async (e) => {
      e.preventDefault()
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

   return (
      <section className='relative w-full max-w-7xl lg:pl-72'>
         <Header
            showMembers={showMembers}
            setShowMembers={setShowMembers}
            channelTitle={channelTitle}
         />

         <article className='h-full max-h-[800px] pt-14 mb-24 lg:ml-12 overflow-y-auto'
            style={{ overflowY: 'hidden' }}
            ref={commentsListRef}>
            {channelTitle === ''
               ? comments?.filter(comment => comment.channel_id === 11)
                  .map(comment => {
                     const user = users?.find(user => user.id === comment.user_id);

                     return <section key={comment.id} className=' mb-4 flex flex-row gap-3 m-5'>
                        <img className='w-10 h-10 bg-gray-400 rounded p-1' src={avatar} alt="" />
                        <div>
                           <p>{`${user?.name} ${user?.lastname}`} <span>{comment.date_creation}</span></p>
                           <p>{comment.content}</p>
                        </div>
                     </section>
                  }) : ''}
            {comments
               ? comments
                  .filter(comment => comment.channel_id === channelTitle.id)
                  .map(comment => {
                     //pintamos los usuarios que quedaron del filtro de comentarios y canal
                     const user = users?.find(user => user.id === comment.user_id);

                     return <section key={comment.id} className=' mb-4 flex flex-row gap-3 m-5'>
                        <img className='w-10 h-10 bg-gray-400 rounded p-1' src={avatar} alt="" />
                        <div>
                           <p>{`${user?.name} ${user?.lastname}`} <span>{comment.date_creation}</span></p>
                           <p>{comment.content}</p>
                        </div>
                     </section>
                  })
               : ''}
         </article>

         <section className=' w-full max-w-screen-lg h-20  fixed bottom-0 bg-white grid items-center '>
            <div className='h-14 w-11/12 m-auto rounded-lg  flex flex-row bg-gray-400 p-2'>
               <input
                  className='w-full bg-transparent outline-none'
                  type="text"
                  name='comment'
                  value={formState.comment}
                  onChange={(e) => setFormState({ ...formState, comment: e.target.value })} />
               <span onClick={handleSendComment} className='w-10 flex text-2xl bg-blue-600 rounded-lg'><IoMdSend className='m-auto text-white' /></span>
            </div>
         </section>
      </section>
   )
}

export default CommentsFeed