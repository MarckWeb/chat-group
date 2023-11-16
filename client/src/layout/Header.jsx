import React from 'react'

import { BiMenu } from 'react-icons/bi'

const Header = ({ members, setMembers }) => {

   const handleNav = () => {
      console.log('hello')
      setMembers(!members)
   }
   return (
      <header className='flex flex-row items-center gap-3 p-2'>
         <BiMenu className='text-4xl' onClick={handleNav} />
         <h2 className='uppercase font-bold pt-2'>Canal de Bienvenida</h2>
      </header>
   )
}

export default Header