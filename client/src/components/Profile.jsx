import React from 'react'

import { IoIosArrowDown } from "react-icons/io";

import { avatar } from '../assets/index.js'

const Profile = () => {
   return (
      <section className='w-full max-w-xs h-20 mt-auto bg-black flex flex-row justify-between items-center px-5'>
         <img src={avatar} alt="" className='w-10 h-10' />
         <p className='text-lg'>nombre usuario</p>
         <IoIosArrowDown className='text-3xl' />
      </section>
   )
}

export default Profile