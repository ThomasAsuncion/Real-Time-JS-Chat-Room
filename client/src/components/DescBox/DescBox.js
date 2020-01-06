import React from 'react';
import './DescBox.css';
import ReactEmoji from 'react-emoji';

const OnlineUsers = ({ room }) => (
    <div className="descContainer">
        {/* If the room name is "Red" then the className will be "redDescContainerHeader", if the room name is "Blue" the className will be "blueDescContainerHeader", ... else it will just be "neutralDescContainerHeader" */}
        <div className={room === "Red" ? "redDescContainerHeader" : room === "Blue" ? "blueDescContainerHeader" : room === "Green" ? "greenDescContainerHeader" : room === "Yellow" ? "yellowDescContainerHeader" : "neutralDescContainerHeader"}>
            <div className={room === "Yellow" ? "darkYellowDescContainerInnerLeft" : "descContainerInnerLeft"}>
                <h3>Project Information</h3>
            </div>
        </div>

        <div className="descActiveContainer">
            <div className="descText">
                <p>A real time basic chat application that can be used to communicate with anyone across the world. </p>
                <p>This was created using React, Node.js, Express.js and Socket.IO. Learn more about them here:</p>
                <div>
                    <li><a href="https://reactjs.org/" target="_blank">React</a></li>
                    <li><a href="https://nodejs.org/en/about/" target="_blank">Node.js</a> </li>
                    <li><a href="https://expressjs.com/" target="_blank">Express.js</a> </li>
                    <li><a href="https://socket.io/" target="_blank">Socket.IO</a> </li>
                </div>
                <p>This app supports the use of emojis {ReactEmoji.emojify(":):DB)")} thanks to <a href="https://www.npmjs.com/package/react-emojify">emojify</a>! Try it out in the chat by typing: ":)", ":cool:" or ":wink:".</p>
                <hr className="lineCut" target="_blank"></hr>
                <p>More information regarding additional resources and the project source code can be found on the GitHub link below:</p>
                <div>
                    <li><a href="https://github.com/ThomasAsuncion/Real-Time-JS-Chat-Room" target="_blank">Open Source Project Repository</a></li>
                    <p></p>
                </div>
                <hr className="lineCut" target="_blank"></hr>
                <p></p>
                <p>Lastly if you would to learn more about me or see more of my other open source projects the links below will redirect you to my GitHub:</p>
                <div>
                    <li><a href="https://github.com/ThomasAsuncion" target="_blank">My GitHub</a></li>
                </div>
  
          

            </div>

        </div>
    </div>

);

export default OnlineUsers;
