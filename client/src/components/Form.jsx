import React, { useState } from 'react'
import Inputs from './Inputs'
import Button from './Button';

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordFill } from "react-icons/ri";

const Form = ({ title }) => {

   const [toggle, setToggle] = useState(true)
   const statusOfForm = (e) => {
      e.preventDefault()
      setToggle(!toggle)
   }
   return (
      <form action="" className=' w-full border border-indigo-600 flex flex-col justify-center items-center gap-4 p-5'>
         <h2 className='text-3xl font-bold'>{toggle ? 'Iniciar Sesion' : 'Registrarme'}</h2>
         {toggle ? '' : <>
            <Inputs
               icon={<TfiEmail />}
               type='text'
               name='name'
               placeholder='Jhon'
            />
            <Inputs
               icon={<TfiEmail />}
               type='text'
               name='lastname'
               placeholder='Doe'
            />
         </>}

         <Inputs
            icon={<TfiEmail />}
            type='text'
            name='email'
            placeholder='Jhon@example.com'
         />
         <Inputs
            icon={<RiLockPasswordFill />}
            type='password'
            name='password'
            placeholder='**********' />

         <Button
            value='Iniciar' />

         <Button

            value={toggle ? 'registrase' : 'login'}
            onClick={statusOfForm} />

         <p>o inicia sesion con redes</p>

         <div className='flex flex-row gap-4 text-4xl'>
            <a className='border border-black rounded' href="http://localhost:3000/auth/google/"><FcGoogle /></a>
            <a className='border border-black rounded' href=""><FaFacebook /></a>
         </div>

      </form>
   )
}

export default Form