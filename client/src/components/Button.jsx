import React from 'react'

const Button = ({ value, onClick }) => {
   return (
      <button
         className='rounded-md py-1.5 px-3.5 bg-blue-950 text-white hover:bg-blue-500 md:text-2xl '
         onClick={onClick}>{value}</button>
   )
}

export default Button