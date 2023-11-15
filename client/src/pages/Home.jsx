import React from 'react'
import CommentsFeed from '../layout/CommentsFeed'
import Channels from '../layout/Channels'

const Home = () => {
   return (
      <div>
         <Channels />
         <CommentsFeed />
      </div>
   )
}

export default Home