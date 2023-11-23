import React from 'react'

const ListComments = ({ id, userImage, name, lastname, date, comment }) => {
   return (
      <section className=' mb-4 flex flex-row gap-3 m-5 bg-gray-200 shadow-lg p-3 rounded-lg '>
         <img className='w-10 h-10  rounded-[50%] p-1' src={userImage} alt="" />
         <div>
            <p><span className='bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 p-1 text-white mr-5 rounded-md'>
               {`${name} ${lastname}`}
            </span>  <span className='text-gray-400 italic'>{date}</span></p>
            <p className='mt-2'>{comment}</p>
         </div>
      </section>
   )
}

export default ListComments