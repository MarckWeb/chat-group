import React, { useState, useRef, useEffect } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/es.js'
import Header from './Header'
import ListComments from '../components/ListComments.jsx';

import { useContextUsers } from '../service/UserContext.jsx';
import { useContextComments } from '../service/CommentContext.jsx';
import { useContextImages } from '../service/ImagesContext.jsx';
import BoxComent from '../components/BoxComent.jsx';
import Separation from '../components/Separation.jsx';

const CommentsFeed = ({ showMembers, setShowMembers, channelTitle, userSelect }) => {
   const ref = useRef();
   // Obtener datos de los contextos
   const { users } = useContextUsers()
   const { comments } = useContextComments()
   const { images } = useContextImages()

   // Función para formatear la fecha en el formato deseado.
   const formatDate = (isoDate) => {
      return dayjs(isoDate).locale('es').format("dddd [a las] h:mm A");
   };


   // Efecto secundario para desplazar el contenedor hacia abajo cuando hay nuevos comentarios
   useEffect(() => {
      const container = ref.current;
      if (container) {
         container.scrollTop = container.scrollHeight;
      }
   }, [comments, images]);

   // Variable para almacenar el último día registrado
   let lastDay = null;

   // Función para renderizar los comentarios
   const renderComments = () => {

      // Filtrar comentarios según el canal o mostrar todos si no hay canal seleccionado
      const filteredComments = channelTitle === ''
         ? comments?.filter(comment => comment.channel_id === 1)
         : comments?.filter(comment => comment.channel_id === channelTitle.id);

      return filteredComments?.map(comment => {
         const commentImage = images?.find(image => image.comment_id === comment.id);
         const user = users?.find(user => user.id === comment.user_id);

         console.log(user)

         // Obtener el día actual del comentario
         const currentDay = dayjs(comment.created_at).format('dddd');

         // Agregar una línea si el día actual es diferente al último día registrado
         const daySeparator = currentDay !== lastDay && (
            <Separation key={`separator-${comment.id}`} day={dayjs(comment.created_at).locale('es').format('dddd, D MMMM YYYY')} />
         );

         // Actualizar el último día registrado
         lastDay = currentDay;

         return (
            <React.Fragment key={comment.id}>
               {/* Renderizar línea de separación (si es necesario) */}
               {daySeparator}

               <ListComments
                  userImage={user?.profile_image}
                  name={user?.name}
                  lastname={user?.lastname}
                  date={formatDate(comment.created_at)}
                  comment={comment.content}
                  image={commentImage?.image_url}
               />
            </React.Fragment>
         );
      });
   };

   return (
      <section className='relative w-full max-w-7xl lg:pl-72'>
         <Header
            showMembers={showMembers}
            setShowMembers={setShowMembers}
            channelTitle={channelTitle}
         />

         {/* Contenedor de comentarios */}
         <article ref={ref} className='h-screen pt-16 pb-28 lg:ml-12' style={{ overflowY: 'auto' }}>
            {renderComments()}
         </article>

         {/* Componente del input para escribir el comentario */}
         <BoxComent
            userSelect={userSelect}
            channelTitle={channelTitle} />
      </section>
   )
}

export default CommentsFeed

