import React from 'react'

const Inputs = ({ icon, type, name, placeholder, values, onChange }) => {
   return (
      <div className=' w-full h-14  rounded-xl p-2 grid grid-cols-10 content-center bg-gray-300 text-xl'>
         <span className='col-span-1 text-3xl'>{icon}</span>
         <input
            className='col-span-9 outline-none h-full bg-transparent ml-2'
            type={type}
            name={name}
            placeholder={placeholder}
            value={values}
            onChange={onChange}
            required />
      </div>
   )
}

export default Inputs