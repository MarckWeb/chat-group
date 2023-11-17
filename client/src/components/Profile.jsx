import React, { useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode";

import { IoIosArrowDown } from "react-icons/io";

import { avatar } from '../assets/index.js'

const Profile = () => {

   const [userSelect, setUserSelect] = useState()

   //traemos el token de cookies
   const user = document.cookie.split('=')[1]

   const handleUserSelect = async () => {
      try {

         if (user) {
            const res = await fetch(`http://localhost:3000/api/user/${jwtDecode(user).id}`)
            const data = await res.json()
            setUserSelect(data)
         }
      } catch (error) {
         console.error(error)
      }
   }


   useEffect(() => {
      handleUserSelect()
   }, [])

   return (
      <section className='w-full max-w-xs h-20 mt-auto bg-black flex flex-row justify-between items-center px-5'>
         <img src={avatar} alt="" className='w-10 h-10' />
         <p className='text-lg'>{`${userSelect?.name} ${userSelect?.lastname}`}</p>
         <IoIosArrowDown className='text-3xl' />
      </section>
   )
}

export default Profile