import React from 'react';


import './Input.css';

// message, setMessage, and sendMessage are being passed from Chat.js
const Input = ({ message, setMessage, sendMessage, room}) => (
    <form className="form">
        <input 
            className="input"
            type="text"
            placeholder="Type a message..."
            value={message} 
            onChange={(event) => setMessage(event.target.value)} 
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        {/* This is just a send button that will act like when we press 'Enter', it will send the message. className changes depending on room name (if room is red then className is "redSendButton") */}
        <button className={room === "Red" ? "redSendButton" : room === "Blue" ? "blueSendButton" : room === "Green" ? "greenSendButton" : room === "Yellow" ? "yellowSendButton" : "neutralSendButton"} 
        onClick={(event) => sendMessage(event)}>Send</button>
    </form>

)

export default Input;