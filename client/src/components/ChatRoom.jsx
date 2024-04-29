import React from 'react'
import ChatList from './ChatList'
// import { useParams } from 'react-router-dom'
import Navbar from './Navbar'
const ChatRoom = () => {
    
  return (
    <div>
      <Navbar option='chat'/>
      <ChatList />
        <hr />
        
    </div>
  )
}

export default ChatRoom
