import React from 'react'

const Button = ({ value, onClick }) => {
   return (
      <button
         className='rounded-md py-1.5 px-3.5 bg-blue-700 text-white font-bold hover:bg-blue-500'
         onClick={onClick}>{value}</button>
   )
}

export default Button