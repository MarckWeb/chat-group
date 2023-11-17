import React, { useEffect, useState } from 'react'
import Header from './Header'

import { useAppContext } from '../service/AppContext';
import { avatar } from '../assets/index.js';
import { IoMdSend } from "react-icons/io";

const CommentsFeed = ({ members, setMembers, channelTitle, setChannelTitle }) => {
   const [comments, setComments] = useState()
   const { users } = useAppContext()

   useEffect(() => {
      const handleApiComments = async () => {
         const response = await fetch('http://localhost:3000/api/comments')
         const data = await response.json()
         setComments(data)
         console.log(data)
      }

      handleApiComments()
   }, [])
   return (
      <section className='relative w-full max-w-7xl lg:pl-72'>
         <Header
            members={members}
            setMembers={setMembers}
            channelTitle={channelTitle}
            setChannelTitle={setChannelTitle}
         />
         <article className='pt-14 pb-20 lg:pl-12'>
            {comments ? comments.map(comment => {
               const user = users?.find((user) => user.id === comment.user_id);

               return <section key={comment.id} className=' mb-4 flex flex-row gap-3 m-5'>
                  <img className='w-10 h-10 bg-gray-400 rounded p-1' src={avatar} alt="" />
                  <div>
                     <p>{`${user?.name} ${user?.lastname}`} <span>{comment.date_creation}</span></p>
                     <p>{comment.content}</p>
                  </div>
               </section>
            }) : ''}
         </article>


         <section className=' w-full max-w-screen-lg h-20  fixed bottom-0 bg-white grid items-center '>
            <div className='h-14 w-11/12 m-auto rounded-lg  flex flex-row bg-gray-400 p-2'>
               <input
                  className='w-full bg-transparent outline-none'
                  type="text"
                  name='comment' />
               <span className='w-10 flex text-2xl bg-blue-600 rounded-lg'><IoMdSend className='m-auto text-white' /></span>
            </div>

         </section>

      </section>
   )
}

export default CommentsFeed