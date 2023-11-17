import React, { useEffect, useState } from 'react'
import CommentsFeed from '../layout/CommentsFeed'
import Channels from '../layout/Channels'
import CreateChannel from '../components/createChannel'

const Home = () => {
   const [members, setMembers] = useState(true)
   const [channelTitle, setChannelTitle] = useState('')
   const [addChannel, setAddChannel] = useState(false)



   return (
      <div className='relative lg:flex lg:flex-row'>

         {addChannel ? <>
            <div className=' w-full h-screen bg-[#3c393f8a] fixed top-0 left-0 z-30 '></div>
            <CreateChannel setAddChannel={setAddChannel} />
         </> : ''}

         <Channels
            members={members}
            setMembers={setMembers}
            channelTitle={channelTitle}
            setChannelTitle={setChannelTitle}
            setAddChannel={setAddChannel} />
         <CommentsFeed
            members={members}
            setMembers={setMembers}
            channelTitle={channelTitle}
            setChannelTitle={setChannelTitle} />
      </div>
   )
}

export default Home