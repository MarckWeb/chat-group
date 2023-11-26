import React from 'react'
import Form from '../components/Form'

const Login = ({ setIsAutenticated }) => {
   return (
      <div className=' bg-gray-200 m-auto relative'>
         <div className=' w-full max-w-sm border border-black absolute top-40 left-[75%] transform translate-x-[-50%]'>
            <Form setIsAutenticated={setIsAutenticated} />
         </div>
      </div>
   )
}

export default Login