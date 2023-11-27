import React, { useEffect, useState } from 'react'
import Inputs from './Inputs'
import Button from './Button';

import { ImGoogle2 } from "react-icons/im";
import { ImFacebook2 } from "react-icons/im";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";
import { ImLinkedin } from "react-icons/im";
const VITE_URL = import.meta.env.VITE_URL;

const Form = ({ setIsAutenticated, toggle, setToggle }) => {
   console.log(toggle)

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

            return alert(resData.message)

         }

         if (resData.ok === false) {
            return alert(resData.message)
         }
      } catch (error) {
         console.error('Error al registrar usuario:', error);
      }
   }

   const handleUserLogin = async (e) => {
      e.preventDefault()
      const { email, password } = inputValues

      if (!email && !password) {
         return alert('Ingrese los datos')
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
            return alert(resData.message)

         }
      } catch (e) {
         console.error(e)
      }
   };

   return (
      <form className='text-2xl w-full flex flex-col justify-center items-center gap-4 p-5'>
         <h2 className='text-3xl font-bold'>{toggle ? 'Iniciar Sesion' : 'Registrarme'}</h2>
         {toggle ? '' : <>
            <Inputs
               icon={<FaRegUser />}
               type='text'
               name='name'
               placeholder='Jhon'
               value={inputValues.name}
               onChange={hanldeValuesInput}
            />
            <Inputs
               icon={<FiUsers />}
               type='text'
               name='lastname'
               placeholder='Doe'
               value={inputValues.lastname}
               onChange={hanldeValuesInput}
            />
         </>}

         <Inputs
            icon={<TfiEmail />}
            type='text'
            name='email'
            placeholder='Jhon@example.com'
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
            <a href="http://localhost:3000/auth/google/"><ImGoogle2 /></a>
            <a href=""><ImFacebook2 /></a>
            <a href=""><ImLinkedin /></a>
         </div>

      </form >
   )
}

export default Form