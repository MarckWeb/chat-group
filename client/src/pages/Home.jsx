import React, { useEffect, useState } from 'react'
import CommentsFeed from '../layout/CommentsFeed'
import Channels from '../layout/Channels'
import CreateChannel from '../components/createChannel'

const Home = () => {
   const [members, setMembers] = useState(true)
   const [channelTitle, setChannelTitle] = useState('')
   const [addChannel, setAddChannel] = useState(false)
   const [channels, setChannels] = useState([]);


   const apiChannels = async () => {
      try {
         const response = await fetch('http://localhost:3000/api/channel');
         const data = await response.json();
         setChannels(data);
      } catch (error) {
         console.error('Error fetching channels:', error);
      }
   };

   useEffect(() => {
      apiChannels();
   }, []);



   return (
      <div className='relative lg:flex lg:flex-row'>

         {addChannel ? <>
            <div className=' w-full h-screen bg-[#3c393f8a] fixed top-0 left-0 z-30 '></div>
            <CreateChannel setAddChannel={setAddChannel}
               channels={channels}
               apiChannels={apiChannels} />
         </> : ''}

         <Channels
            members={members}
            setMembers={setMembers}
            channelTitle={channelTitle}
            setChannelTitle={setChannelTitle}
            setAddChannel={setAddChannel}
            channels={channels}
            setChannels={setChannels} />
         <CommentsFeed
            members={members}
            setMembers={setMembers}
            channelTitle={channelTitle}
            setChannelTitle={setChannelTitle} />
      </div>
   )
}

export default Home