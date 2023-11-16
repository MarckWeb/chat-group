import React, { useEffect, useState } from 'react'
import Header from './Header'

import { useAppContext } from '../service/AppContext';
import { IoMdSend } from "react-icons/io";

const CommentsFeed = ({ members, setMembers }) => {
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
      <section className=''>
         <Header
            members={members}
            setMembers={setMembers} />
         <article >
            {comments ? comments.map(comment => {
               const user = users?.find((user) => user.id === comment.user_id);

               return <section key={comment.id} className='border border-indigo-600 mb-4 '>
                  <img src="" alt="" />
                  <div>
                     <p>{`${user?.name} ${user?.lastname}`} <span>{comment.date_creation}</span></p>
                     <p>{comment.content}</p>
                  </div>
               </section>
            }) : ''}
         </article>



         <section>
            <input
               type="text"
               name='comment' />

            <span><IoMdSend /></span>

         </section>

      </section>
   )
}

export default CommentsFeed