import React, { useEffect, useState } from 'react'
import Inputs from './Inputs'
import Button from './Button';

import { toast } from 'react-toastify';
//import { toastOptions, toastError } from '../../utils/toast';

import { ImGoogle2 } from "react-icons/im";
import { ImFacebook2 } from "react-icons/im";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { ImLinkedin } from "react-icons/im";
const VITE_URL = import.meta.env.VITE_URL;

const Form = ({ setIsAutenticated, toggle, setToggle }) => {

   const [inputValues, setInputValues] = useState({
      name: '',
      lastname: '',
      email: '',
      password: ''
   })

   //almacena datos del formulario
   const hanldeValuesInput = (e) => {
      setInputValues(
         {
            ...inputValues,
            [e.target.name]: e.target.value
         }
      )
   }

   //resgistra al usuario en la base de datos
   const handleRegisterUser = async (e) => {
      e.preventDefault()
      const id = Math.floor(Math.random() * 1000)
      const data = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ ...inputValues, id })
      }
      try {
         const res = await fetch(`${VITE_URL}auth/register`, data)
         const resData = await res.json()
         if (resData.ok === true && resData.status === 200) {
            setInputValues({
               name: '',
               lastname: '',
               email: '',
               password: ''
            })
            return toast.info(resData.message)
         }

         if (resData.ok === false) {
            toast.error(resData.message)
         }
      } catch (error) {
         console.error('Error al registrar usuario:', error);
      }
   }

   const handleUserLogin = async (e) => {
      e.preventDefault()
      const { email, password } = inputValues
      if (!email && !password) {
         return toast.info('Campos vacios')
      }
      const data = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify({ email, password })
      }

      try {
         const res = await fetch(`${VITE_URL}auth/login`, data)
         const resData = await res.json()
         if (resData.ok === true) {
            setInputValues({
               email: '',
               password: ''
            })

            localStorage.setItem('token', JSON.stringify(resData.tokenSession));
            setIsAutenticated(resData.tokenSession)
            return toast.info('Bienvenido disfruta del grupo')

         }
         if (resData.ok === false) {
            return toast.error(resData.message)
         }
      } catch (e) {
         console.error(e)
      }
   };

   return (
      <form className=' text-xl lg:text-2xl w-full flex flex-col justify-center items-center gap-4 p-5'>
         <h2 className='lg:text-3xl font-bold'>{toggle ? 'Iniciar Sesion' : 'Registrarme'}</h2>
         {toggle ? '' : <>
            <Inputs
               icon={<FaRegUser />}
               type='text'
               name='name'
               placeholder='Francisco'
               value={inputValues.name}
               onChange={hanldeValuesInput}
            />
            <Inputs
               icon={<FiUsers />}
               type='text'
               name='lastname'
               placeholder='Molero'
               value={inputValues.lastname}
               onChange={hanldeValuesInput}
            />
         </>}

         <Inputs
            icon={<TfiEmail />}
            type='text'
            name='email'
            placeholder='molero@example.com'
            value={inputValues.email}
            onChange={hanldeValuesInput}
         />
         <Inputs
            icon={<RiLockPasswordFill />}
            type='password'
            name='password'
            placeholder='**********'
            value={inputValues.password}
            onChange={hanldeValuesInput} />


         <Button
            value={toggle ? 'Iniciar Sesion' : 'registrarme'}
            onClick={toggle ? handleUserLogin : handleRegisterUser} />

         <p>o inicia sesion con redes</p>

         <div className='flex flex-row gap-4 text-4xl'>
            <a onClick={(e) => { e.preventDefault(); console.log('Google login clicked'); }} href="https://back-2r4n.onrender.com/auth/google/"><ImGoogle2 /></a>
            <a href=""><ImFacebook2 /></a>
            <a href=""><ImLinkedin /></a>
         </div>

      </form >
   )
}

export default Form