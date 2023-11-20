import React, { useEffect, useState } from 'react'
import Header from './Header'

import { useContextUsers } from '../service/UserContext.jsx';
import { useContextComments } from '../service/CommentContext.jsx';
import { avatar } from '../assets/index.js';
import { IoMdSend } from "react-icons/io";

const CommentsFeed = ({ members, setMembers, channelTitle, userSelect }) => {
   console.log(channelTitle.id)
   console.log(userSelect?.id)
   const [inputComment, setInputComment] = useState()
   const { users } = useContextUsers()
   const { comments, handleComments } = useContextComments()

   const handleMemberChannel = async () => {
      const data = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(
            {
               userId: userSelect.id,
               channelId: channelTitle.id
            })
      }
      try {
         const res = await fetch('http://localhost:3000/api/members', data)
         const resData = await res.json()
         console.log(resData)

         if (resData.ok === true && resData.status === 200) {
            alert('Ahora eres miembro del canal: ' + channelTitle.name)
         }

         if (resData.ok === false) {
            return alert(resData.message)
         }
      } catch (error) {
         console.error('Error al registrar usuario:', error);
      }
   }


   const handleSendComment = async (e) => {
      e.preventDefault()
      console.log(inputComment)
      const data = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(
            {
               content: inputComment,
               userId: userSelect.id,
               channelId: channelTitle.id
            })
      }
      try {
         const res = await fetch('http://localhost:3000/api/comments', data)
         const resData = await res.json()
         console.log(resData)

         if (resData.ok === true && resData.status === 200) {
            setInputComment('')
            handleComments()
            return alert(resData.message)
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
            members={members}
            setMembers={setMembers}
            channelTitle={channelTitle}
         />

         {/* TRUE || TRUE = TRUE : NESECITAMOS IMPRIMIR COMENTARISO DEL PRIMER CANAL por defecto al ingresar a la pagina */}
         <article className='pt-14 pb-20 lg:pl-12'>
            {comments ? comments.map(comment => {
               // verificamos que todos los comentarios esten en su canal
               if (channelTitle.id === comment.channel_id) {

                  //pintamos los usuarios que quedaron del filtro de comentarios y canal
                  const user = users?.find(user => user.id === comment.user_id);

                  return <section key={comment.id} className=' mb-4 flex flex-row gap-3 m-5'>
                     <img className='w-10 h-10 bg-gray-400 rounded p-1' src={avatar} alt="" />
                     <div>
                        <p>{`${user?.name} ${user?.lastname}`} <span>{comment.date_creation}</span></p>
                        <p>{comment.content}</p>
                     </div>
                  </section>
               }

            }) : ''}
         </article>


         <section className=' w-full max-w-screen-lg h-20  fixed bottom-0 bg-white grid items-center '>
            <div className='h-14 w-11/12 m-auto rounded-lg  flex flex-row bg-gray-400 p-2'>
               <input
                  className='w-full bg-transparent outline-none'
                  type="text"
                  name='comment'
                  value={inputComment}
                  onChange={(e) => setInputComment(e.target.value)} />
               <span onClick={handleSendComment} className='w-10 flex text-2xl bg-blue-600 rounded-lg'><IoMdSend className='m-auto text-white' /></span>
            </div>

         </section>

      </section>
   )
}

export default CommentsFeed