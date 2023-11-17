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
         {addChannel ? <CreateChannel setAddChannel={setAddChannel} /> : ''}

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