import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import Message from './Message/Message';

import './Messages.css';

// We need to pass the message that's sent from chat.js and the name so we can determine who is send what message
const Messages = ({ messages, name, room}) => (
    <ScrollToBottom className="messages">
        {/* We need to loop through the messages so we use a map with an index (i) => For each message we generate a div that 
        will have the index of the message as it's key where the Message is being rendered in that div where message and name 
        are coming from props */}
        {messages.map((message, i) => <div key={i}><Message message={message} name={name} room={room}/></div>)}

    </ScrollToBottom>
)

export default Messages;