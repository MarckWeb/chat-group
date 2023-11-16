import React, { useState } from 'react'
import CommentsFeed from '../layout/CommentsFeed'
import Channels from '../layout/Channels'

const Home = () => {
   const [members, setMembers] = useState(true)
   return (
      <div className='relative lg:flex lg:flex-row'>
         <Channels
            members={members}
            setMembers={setMembers} />
         <CommentsFeed
            members={members}
            setMembers={setMembers} />
      </div>
   )
}

export default Home