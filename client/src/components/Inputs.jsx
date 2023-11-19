import React from 'react'

const Inputs = ({ icon, type, name, placeholder, values, onChange }) => {
   return (
      <div className='max-w-xs w-full h-14 border border-red-400 rounded-xl p-2 grid grid-cols-10 content-center'>
         <span className='col-span-1 text-xl'>{icon}</span>
         <input
            className='col-span-9 outline-none h-full bg-transparent ml-2'
            type={type}
            name={name}
            placeholder={placeholder}
            value={values}
            onChange={onChange} />
      </div>
   )
}

export default Inputs