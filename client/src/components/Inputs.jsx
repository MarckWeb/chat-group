import React from 'react'

const Inputs = ({ icon, type, name, placeholder, values, onChange }) => {
   return (
      <div className=' w-full h-14 flex flex-row items-center rounded-xl p-4 content-center bg-gray-200 text-2xl '>
         <span className='col-span-1 text-3xl  lg:p-4'>{icon}</span>
         <input
            className='col-span-9 outline-none h-full bg-transparent ml-2 '
            type={type}
            name={name}
            placeholder={placeholder}
            value={values}
            onChange={onChange}
            required
            autoComplete='off' />
      </div>
   )
}

export default Inputs