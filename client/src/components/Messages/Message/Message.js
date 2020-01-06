import React from 'react';
import './Message.css';
import ReactEmoji from 'react-emoji';


// 'message' and 'name' are passed from Messages.js. In here we specify what the actual Message will appear like. Remember 'message' contains the user who sent it and the text it consits of
const Message = ({ message: { text, user }, name , room}) => {
    let isSentByCurrentUser = false;

    const trimmedName = name;

    // If the user is equal to the trimmedName then that means it came from the current user and will mark the isSentByCurrentUser to be true
    if(user === trimmedName){
        isSentByCurrentUser = true;
    }

    return(
        /**
         * (?) if it is sent by current user then it will display the trimmedname of the current user and the text of the message 
         * (:) otherwise its not from the current user so it will display the message from another user
         */
        isSentByCurrentUser ? (
            <div className="messageContainer">
                <p className="sentText pr-10">{trimmedName}</p>

                <div className={room === "Red" ? "redMessageBox" : room === "Blue" ? "blueMessageBox" : room === "Green" ? "greenMessageBox" : room === "Yellow" ? "yellowMessageBox" : "neutralMessageBox"}>
                    <p className={room === "Yellow" ? "darkMessageText" : "messageText"}>{ReactEmoji.emojify(text)}</p>
                </div>
            </div>
        ) : (
            <div className="messageContainer justifyStart">
                <div className="messageBox backgroundLight">
                    <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
                </div>
                <p className="sentText pl-10">{user}</p>
            </div>
        )
    )

}

export default Message;