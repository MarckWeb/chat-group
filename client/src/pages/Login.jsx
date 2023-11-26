import React, { useState } from 'react'
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

   return (
      <div className={`border border-red-700 w-full h-screen before:w-[2000px] before:h-[2000px] before:rounded-[50%] before:bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 before:absolute before:top-[0] before:left-[50%] before:z-10 before:transform  before:translate-x-[-50%] before:transition-transform  before:duration-1000 before:ease-linear ${toggle ? 'before:translate-y-[-85%] ' : 'before:translate-y-[26%]'}   ${toggle ? 'md:before:translate-x-[-60%] md:before:translate-y-[-85%]' : 'md:before:translate-x-[-60%] md:before:translate-y-[30%]'} relative overflow-hidden`}>
         <div className={`w-full absolute z-20 top-0 left-0 transform ${toggle ? 'translate-y-[20%]' : 'translate-y-[-100%]'} transition duration-500 ease-linear flex flex-row justify-between items-center p-2 `}>
            <IntroForm
               className=' text-white flex flex-col items-center gap-2'
               title={'lorem lorem'}
               description={'more lorem ipsun more loren more lorem ipsun more loren'}
               statusOfForm={statusOfForm}
               toggle={toggle} />

            <img className='w-52 h-52 hidden md:block' src={group} alt="" />
         </div>

         <div className={`w-full max-w-md p-1 absolute transition duration-1000 ease-linear ${toggle ? 'top-[100%] transform translate-y-[-120%]' : 'top-0 transform translate-y-[0'}  left-[50%] transform translate-x-[-50%] `}>

            <Form setIsAutenticated={setIsAutenticated}
               toggle={toggle} />
         </div>

         <div className={`w-full absolute bottom-0 left-0 z-20 transform ${toggle ? 'translate-y-[100%]' : 'translate-y-[-20%]'} transition duration-500 ease-linear  flex flex-row justify-between items-center p-2 `}>
            <IntroForm
               className=' text-white flex flex-col items-center gap-2'
               title={'lorem lorem'}
               description={'more lorem ipsun more loren more lorem ipsun more loren'}
               statusOfForm={statusOfForm}
               toggle={toggle} />

            <img className='w-48 h-48 hidden md:block' src={peeople} alt="" />
         </div>
      </div>
   )
}

export default Login