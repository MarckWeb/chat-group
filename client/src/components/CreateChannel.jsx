import React from 'react'

const CreateChannel = ({ setAddChannel }) => {
   return (
      <div onClick={() => setAddChannel(false)} className='w-full max-w-xs h-52 bg-red-400 rounded-xl absolute top-32 left-96 z-20 '>createChannel</div>
   )

   //centrar al medio de la pantalla
}

export default CreateChannel