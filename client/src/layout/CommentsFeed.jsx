import React, { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es.js'
import Header from './Header'
import ListComments from '../components/ListComments.jsx';

import { useContextUsers } from '../service/UserContext.jsx';
import { useContextComments } from '../service/CommentContext.jsx';
import { useContextImages } from '../service/ImagesContext.jsx';
import BoxComent from '../components/BoxComent.jsx';

// Función para formatear la fecha en el formato deseado.
const formatDate = (isoDate) => {
   const formattedDate = dayjs(isoDate).locale('es').format("dddd [a las] h:mm A");
   return formattedDate;
};
//pedir comentario images

const CommentsFeed = ({ showMembers, setShowMembers, channelTitle, userSelect }) => {
   const commentsListRef = useRef();
   const [currentDay, setCurrentDay] = useState(null);

   // Contextos para obtener datos.
   const { users } = useContextUsers()
   const { comments } = useContextComments()
   const { images } = useContextImages()

   return (
      <section className='relative w-full max-w-7xl lg:pl-72'>
         <Header
            showMembers={showMembers}
            setShowMembers={setShowMembers}
            channelTitle={channelTitle}
         />

         <article className='h-full pt-16 mb-28 lg:ml-12'
            ref={commentsListRef}>
            {channelTitle === ''
               ? comments?.filter(comment => comment.channel_id === 11)
                  .map(comment => {
                     const commentImage = images?.find(image => image.comment_id === comment.id)
                     console.log(commentImage)
                     const user = users?.find(user => user.id === comment.user_id);

                     return <React.Fragment key={comment.id}>

                        <ListComments
                           userImage={user?.image}
                           name={user?.name}
                           lastname={user?.lastname}
                           date={formatDate(comment.date_creation)}
                           comment={comment.content}
                           image={commentImage?.image_url} />

                     </React.Fragment>
                  }) : <>
                  {comments
                     ? comments
                        .filter(comment => comment.channel_id === channelTitle.id)
                        .map(comment => {
                           const commentImage = images?.find(image => image.comment_id === comment.id)
                           const user = users?.find(user => user.id === comment.user_id);

                           return <React.Fragment key={comment.id}>
                              <ListComments
                                 userImage={user?.image}
                                 name={user?.name}
                                 lastname={user?.lastname}
                                 date={formatDate(comment.date_creation)}
                                 comment={comment.content}
                                 image={commentImage?.image_url}
                              />
                           </React.Fragment>
                        })
                     : ''}
               </>}

         </article>
         <BoxComent
            userSelect={userSelect}
            channelTitle={channelTitle} />
      </section>
   )
}

export default CommentsFeed

