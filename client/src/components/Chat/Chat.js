import React, { useState, useEffect } from 'react'; // Use effect is a hook that lets you use life cycle methods (methods that trigger when something is created or destryoed)
import queryString from 'query-string'; // Helps with retreiving data from the URL
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';
import OnlineUsers from '../OnlineUsers/OnlineUsers';
import DescBox from '../DescBox/DescBox';

let socket;

const Chat = ({ location }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState(''); // A state for individual messages
    const [messages, setMessages] = useState([]); // An array that will store all of our messages
    const ENDPOINT = 'https://react-gamechat-app.herokuapp.com/'; // The endpoint is where our server is for local development make sure its 'localhost:5000'

    useEffect(() => {
        // Retrieve data that users has entered when joining. location.search takes the param info passed via. URL and stores them in name and room using queryString
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        // 1st param is a string that the back end will recognize for an event, it can be anything as long as its a string that will be remembered. 
        // 2nd param will be the data were passing, in this case were passing name and room and we will recieve it on the backend
        // 3rd param is from our callback where the backend can make a 'call back' or send data back to the front end and now our front end can process logic that was sent back from callback
        socket.emit('join', { name, room }, () => { });

        // This happens when we are unmounting the component (in other words leaving the chat): we disconnect the socket and turn it off
        return () => {
            socket.emit('disconnect'); // Just like above, the 1st param to emit is a string that will be used for an event. Needs to be the same on back end
            socket.off(); // Actually turns off the one instance of the client socket (this one person in the chat) off so we don't have a lingering user
        }

    }, [ENDPOINT, location.search]) // The 2nd param to useEffect prevents the double requests. This is set to specify when our useEffect function should be called which means that useEffect will only happen when ENDPOINT and location.search change

    // useEffect() is a special method that will only run when the 2nd paramter value changes
    useEffect(() => {
        // On is listening for a message and if a message is recieved it will store it in the messages array
        socket.on('message', (message) => {
            setMessages([...messages, message]); // Adds every 'message' to our messages array through spreading
        })

        // On is listening for a user, if a user is updated then it will add to the users list
        socket.on('roomData', ({ users }) => {
            setUsers(users);
        })

        return () => {
            socket.emit('disconnect');
            socket.off();
        }

    }, [messages]); // this [messages] means that we only want to run this useEffect() method when the messages array changes!

    // Function for sending messages
    const sendMessage = (event) => {
        event.preventDefault(); // In React a full page refresh isn't good - this means by default on an input with a key press or button page it will refresh the whole page by preventingDefault() we prevent a full page refresh

        // If there is a message then we need to send the message
        if (message) {
            // Remember the sendMessage emit listner is in the server index.js where it waits for a message then sends it to room
            socket.emit('sendMessage', message, () => setMessage('')) // We use the callback so that when a message is sent it cleans and clears
        }
    }

    console.log(message, messages);

    return (
        <div className="outerContainer">
        <OnlineUsers users={users} room={room} />
            <div className="container">
                {/* By passing in room={room} where room is the state we're able to pass this to InfoBar.js and have the room name be dynamic in there as well */}
                <InfoBar room={room} />
                {/* By passing in the messages and name we are able to use this in Messages.js and further use it in by passing it inside of Messages.js to Message.js */}
                <Messages messages={messages} name={name} room={room} />
                {/* By passing in the message, setMessage and sendMessage we are able to use this in Input.js */}
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} room={room} />
            </div>
        <DescBox room={room}/>
        </div>
    )
}

export default Chat;