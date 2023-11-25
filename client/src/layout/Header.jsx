import { useContextChannels } from '../service/Channel.config.context'
import { BiMenu } from 'react-icons/bi'

const Header = ({ showMembers, setShowMembers, channelTitle }) => {
   const { channels } = useContextChannels() || { channels: [] }
   return (
      <>
         {channels ? <header className='flex flex-row items-center gap-3 p-2 bg-white border-b-2 fixed top-0 w-full h-16 lg:pl-12 '>
            <BiMenu className='text-4xl cursor-pointer lg:hidden' onClick={() => setShowMembers(!showMembers)} />
            <h2 className='uppercase font-bold pt-2'> # {channelTitle ? channelTitle.name : channels[0].name
            }</h2>
         </header> : ''}
      </>


   )
}

export default Header