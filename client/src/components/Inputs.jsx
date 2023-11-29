import React from 'react'

const Inputs = ({ icon, type, name, placeholder, value, onChange }) => {
   return (
      <div className=' w-full h-14 flex flex-row items-center rounded-xl  content-center bg-gray-200 lg:text-2xl '>
         <span className='col-span-1 md:text-3xl p-4 '>{icon}</span>
         <input
            className='col-span-9 outline-none w-full h-full bg-transparent lg:ml-2'
            type={type}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required
            autoComplete='off' />
      </div>
   )
}

export default Inputs