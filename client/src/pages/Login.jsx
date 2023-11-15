import React from 'react'
import Form from '../components/Form'

const Login = () => {
   return (
      <div className='w-full h-screen bg-gray-200 m-auto'>
         <div className='border border-black max-w-sm w-full m-auto   '>
            <Form
               title='Iniciar Sesion' />
            {/* <Form
               title='Registrarme' /> */}
         </div>
      </div>
   )
}

export default Login