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
        onStar = {() => props.toggleStar(props.data.indexOf(message))}
        onSelect = {() => props.handleSelected(props.data.indexOf(message))}
        onRead = { () =>props.handleRead(props.data.indexOf(message))}
    />
    ))}
    </div>
    )
}

export default MessageList