import React from 'react'

import { BiMenu } from 'react-icons/bi'

const Header = ({ members, setMembers, channelTitle, setChannelTitle }) => {


   return (
      <header className='flex flex-row items-center gap-3 p-2 fixed top-0 w-full h-14 bg-blue-400 max-w-screen-lg lg:pl-12 lg:rounded-lg'>
         <BiMenu className='text-4xl cursor-pointer lg:hidden' onClick={() => setMembers(!members)} />
         <h2 className='uppercase font-bold pt-2'>{channelTitle ? channelTitle : 'canal de bienvenida'}</h2>
      </header>
   )
}

export default Header