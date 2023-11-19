import React, { useEffect, useState } from 'react'
import Inputs from './Inputs'
import Button from './Button';

import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { TfiEmail } from "react-icons/tfi";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { FiUsers } from "react-icons/fi";


const Form = ({ setIsAutenticated }) => {
   const [toggle, setToggle] = useState(true)
   const [inputValues, setInputValues] = useState({
      name: '',
      lastname: '',
      email: '',
      password: ''
   })

   //cambia entre form inicia y resgistrarse
   const statusOfForm = (e) => {
      e.preventDefault()
      setToggle(!toggle)
   }

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
      console.log('enviar datos')
      console.log(inputValues)
      const data = {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(inputValues)
      }
      try {
         const res = await fetch('http://localhost:3000/api/auth/register', data)
         const resData = await res.json()
         console.log(resData)

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
      console.log('comparamos login')
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
         const res = await fetch('http://localhost:3000/api/auth/login', data)
         const resData = await res.json()
         console.log(resData)
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

   useEffect(() => {
      console.log(inputValues)
   }, [inputValues])

   return (
      <form action="" className=' w-full border border-indigo-600 flex flex-col justify-center items-center gap-4 p-5'>
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