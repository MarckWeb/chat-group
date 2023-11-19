import React from 'react'
import Form from '../components/Form'

const Login = ({ isAutenticated, setIsAutenticated }) => {
   return (
      <div className=' bg-gray-200 m-auto'>
         <div className='border border-black max-w-sm w-full m-auto   '>
            <Form setIsAutenticated={setIsAutenticated} />

         </div>
      </div>
   )
}

export default Login