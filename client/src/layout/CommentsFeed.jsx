import React, { useEffect, useState } from 'react'
import Header from './Header'

import { useAppContext } from '../service/AppContext';

const CommentsFeed = () => {
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
      <section>
         <Header />

         {comments ? comments.map(comment => {
            const user = users?.find((user) => user.id === comment.user_id);

            return <section key={comment.id} className='border border-indigo-600 mb-4'>
               <img src="" alt="" />
               <div>
                  <p>{`${user?.name} ${user?.lastname}`} <span>{comment.date_creation}</span></p>
                  <p>{comment.content}</p>
               </div>
            </section>
         }) : ''}


      </section>
   )
}

export default CommentsFeed