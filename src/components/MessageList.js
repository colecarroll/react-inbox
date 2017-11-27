import React from 'react'
import '../App.css';
import Message from './Message'

const MessageList = ({messages}) => {
  return (
    <div>
      {messages.map(message => <Message key={message.id} message = { message } />)}
    </div>
  )
}

export default MessageList