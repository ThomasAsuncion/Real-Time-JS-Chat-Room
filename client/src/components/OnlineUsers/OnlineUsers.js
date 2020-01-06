import React from 'react';
import onlineIcon from '../../icons/onlineIcon.png'
import './OnlineUsers.css';

const OnlineUsers = ({ users, room }) => (
    <div className="textContainer">
        {
            users ? (
                    <div>
                        {/* If the room name is "Red" then the className will be "redOnlineUsersInfoBar", if the room name is "Blue" the className will be "blueOnlineUsersInfoBar", ... else it will just be "neutralOnlineUsersInfoBar" */}
                        <div className={room === "Red" ? "redOnlineUsersInfoBar" : room === "Blue" ? "blueOnlineUsersInfoBar" : room === "Green" ? "greenOnlineUsersInfoBar" : room === "Yellow" ? "yellowOnlineUsersInfoBar" : "neutralOnlineUsersInfoBar"}>
                            <div className={room === "Yellow" ? "darkYellowOnlineUsersLeftInnerContainer" : "onlineUsersLeftInnerContainer"}>
                                <h3>Online Users</h3>
                            </div>
                        </div>
                        <div className="activeContainer">
                            <p>
                                {/* Will get all the user's names and list them out */}
                                {users.map(({ name }) => (
                                    <div key={name} className="activeItem">
                                        <img alt="Online Icon" src={onlineIcon} />
                                        <h3 className="onlineUserStyle">{name}</h3>
                                    </div>
                                ))}
                            </p>
                        </div>
                    </div>
                )
                : null
        }
    </div>
);

export default OnlineUsers;
