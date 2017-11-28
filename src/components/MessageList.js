import React from 'react'
import '../App.css';
import Message from './Message'

const MessageList = (props) => {
  return (
    <div>
      {props.data.map((message => 
      <Message 
        key= {message.id}
        message = {message}
        onStar = {() => props.toggleStar(message.id-1)}
        onSelect = {() => props.handleSelected(message.id-1)}
        onRead = { () =>props.handleRead(message.id-1)}
    />
    ))}
    </div>
    )
}

export default MessageList