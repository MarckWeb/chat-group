import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

import Form from '../components/Form'
import IntroForm from '../components/IntroForm'
import { peeople, group } from '../assets/index.js'

const Login = ({ setIsAutenticated }) => {

   const [toggle, setToggle] = useState(true)

   //cambia entre form inicia y resgistrarse
   const statusOfForm = (e) => {
      e.preventDefault()
      setToggle(!toggle)
   }

   useEffect(() => {
      toast.info('Bienvenido has una pruba a la aplicacion con los datos de este Usuario, o sino puedes crear tu propio usuario. ;)')
   }, [])


   return (
      <div className={`w-full h-screen before:w-[2000px] before:h-[2000px] before:rounded-[50%] before:bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 before:absolute before:top-[0] before:left-[50%] before:z-10 before:transform  before:translate-x-[-50%] before:transition-transform  before:duration-1000 before:ease-linear relative overflow-hidden 
      ${toggle
            ? 'before:translate-y-[-88%] md:before:translate-x-[-60%] md:before:translate-y-[-88%] lg:before:translate-y-[-50%] lg:before:translate-x-[-100%]'
            : 'before:translate-y-[28%] md:before:translate-x-[-60%] md:before:translate-y-[25%] lg:before:translate-x-[0%] lg:before:translate-y-[-50%]'}`}>
         <div className={`absolute z-20 top-0 left-0 lg:ml-[15%] transform transition duration-500 ease-linear flex flex-row justify-between items-center p-2 lg:flex-col lg:top-[50%] lg:translate-y-[-50%] 
         ${toggle
               ? 'translate-y-[5%] lg:translate-x-[-25%]'
               : 'translate-y-[-100%] lg:translate-x-[-150%]'}`}>
            <IntroForm
               className=' text-white flex flex-col items-center gap-2 lg:gap-8'
               title={'Grupos de Chat'}
               description={'Bienvenido a Conexión Grupal, un proyecto de chat diseñado para llevar la comunicación a un nivel más dinámico y colaborativo. '}
               statusOfForm={statusOfForm}
               toggle={toggle} />

            <img className='w-52 h-52 hidden md:block lg:w-[500px] lg:h-[400px]' src={group} alt="" />
         </div>

         <div className={`w-full max-w-md lg:max-w-lg lg:text-4xl p-1 absolute transition duration-1000 ease-linear transform left-[50%] translate-x-[-50%] lg:top-[50%] lg:translate-y-[-50%] 
         ${toggle
               ? 'top-[100%] translate-y-[-120%] lg:left-[75%] lg:translate-x-[-35%]'
               : 'top-0  translate-y-[0] lg:left-[2%] lg:translate-x-[10%]'}  
                `}>
            <Form setIsAutenticated={setIsAutenticated}
               toggle={toggle} />
         </div>

         <div className={`absolute lg:right-0 z-20 transform top-[100%]  
         ${toggle
               ? 'translate-y-[100%]  lg:translate-x-[100%]'
               : 'translate-y-[-100%] lg:top-[50%] lg:translate-y-[-50%] lg:left-[75%] lg:translate-x-[-35%]'} 
               transition duration-500 ease-linear  flex flex-row justify-between items-center p-2 lg:flex-col lg:gap-11 lg:top-[50%] lg:translate-y-[-50%] `}>
            <IntroForm
               className=' text-white flex flex-col items-center gap-2 lg:gap-8'
               title={'Conexion Grupal'}
               description={'Facilitamos la interacción fluida y la construcción de conexiones significativas en un espacio donde la comunicación fluye de manera instantánea.'}
               statusOfForm={statusOfForm}
               toggle={toggle} />

            <img className='w-48 h-48 hidden md:block lg:w-[500px] lg:h-[400px]' src={peeople} alt="" />
         </div>
      </div>
   )
}

export default Login
