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

const CommentsFeed = ({ showMembers, setShowMembers, channelTitle, userSelect }) => {
   const ref = useRef();

   console.log(ref.current)

   // Contextos para obtener datos.
   const { users } = useContextUsers()
   const { comments } = useContextComments()
   const { images } = useContextImages()

   console.log(comments)

   useEffect(() => {
      console.log('useEffect ejecutado');
      const container = ref.current;
      console.log('Container:', container);

      if (container) {
         container.scrollTop = container.scrollHeight;
         console.log('Scroll al final:', container.scrollTop);
      }
   }, [comments, images]);

   return (
      <section className='relative w-full max-w-7xl lg:pl-72'>
         <Header
            showMembers={showMembers}
            setShowMembers={setShowMembers}
            channelTitle={channelTitle}
         />

         <article ref={ref} className='h-screen pt-16 pb-28 lg:ml-12 border border-red-600' style={{ overflowY: 'auto' }}>
            {channelTitle === ''
               ? comments?.filter(comment => comment.channel_id === 1)
                  .map(comment => {
                     const commentImage = images?.find(image => image.comment_id === comment.id)
                     const user = users?.find(user => user.id === comment.user_id);
                     return <React.Fragment key={comment.id}>

                        <ListComments
                           userImage={user?.profile_image}
                           name={user?.name}
                           lastname={user?.lastname}
                           date={formatDate(comment.created_at)}
                           comment={comment.content}
                           image={commentImage?.image_url}

                        />

                     </React.Fragment>
                  }) : <>
                  {comments
                     ? comments
                        .filter((comment) => comment.channel_id === channelTitle.id)
                        .map((comment, i) => {
                           const commentImage = images?.find(image => image.comment_id === comment.id)
                           const user = users?.find(user => user.id === comment.user_id);

                           return <React.Fragment key={comment.id}>
                              <ListComments
                                 userImage={user?.profile_image}
                                 name={user?.name}
                                 lastname={user?.lastname}
                                 date={formatDate(comment.created_at)}
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
            channelTitle={channelTitle}
            ref={ref} />
      </section>
   )
}

export default CommentsFeed

