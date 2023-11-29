import React from 'react'

const Separation = ({ day }) => {
   return (
      <div className='text-center py-3 flex flex-row justify-center items-center gap-5'>
         <span className='w-52 h-[2px] bg-gray-400 block'></span>
         <p className='text-blue-950'>{day}</p>
         <span className='w-52 h-[2px] bg-gray-400 block'></span>
      </div>
   )
}

export default Separation