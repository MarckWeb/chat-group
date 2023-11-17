import React from 'react'

const CreateChannel = ({ setAddChannel }) => {
   return (
      <div className='w-full max-w-[500px] h-80 bg-[#120F13] text-white rounded-xl fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-30 p-5'>
         <p className='uppercase font-bold mb-3'>Crear nuevo canal</p>
         <form
            action=""
            className='flex flex-col justify-center items-center gap-3'>
            <input
               className='w-full rounded-lg h-12 bg-[#3C393F] p-3'
               type="text"
               name='channelName'
               placeholder='Nombre de canal' />

            <textarea
               className='w-full rounded-lg h-[115px] bg-[#3C393F] p-3'
               placeholder='Descripcion de canales'>
            </textarea>

            <button className='w-24 h-10  rounded-lg bg-[#2F80ED] ml-auto' onClick={() => setAddChannel(false)}>
               Crear Canal
            </button>

         </form>
      </div>
   )

   //centrar al medio de la pantalla
}

export default CreateChannel