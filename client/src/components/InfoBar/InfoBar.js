import React from 'react';
import closeIcon from '../../icons/closeIcon.png'; // image for close icon
import onlineIcon from '../../icons/onlineIcon.png'; // image for online icon
import closeIconDark from '../../icons/closeIconDark.png';

import './InfoBar.css';


const InfoBar = ( { room } ) => (
    // Dynamically changes the CSS depending on room name. If it is “Red” it will have the className “redInfoBar”, If it is "Blue" then it will have the className "blueInfoBar", etc.
    <div className={room === "Red" ? "redInfoBar" : room === "Blue" ? "blueInfoBar" : room === "Yellow" ? "yellowInfoBar" : room === "Green" ? "greenInfoBar" : "neutralInfoBar"}>
        {/* Dynamically changes the CSS depedning on room name for the info bar inner container, if it's yellow we have the yellowContainer (for displaying room name) else it's just the regular leftinnerCotainer */}
        <div className={room === "Yellow" ? "darkYellowLeftInnerContainer" : "leftInnerContainer"}>
            <img className="onlineIcon" src={onlineIcon} alt="online" />
            <h2>{room}</h2>
        </div>
        <div className="rightInnerContainer">
            {/* An ancor tag that will have a reference to a route, since we need to clean the socket off we have to do a full page refresh a go to '/' which is the home page (not best practice) */}
            <a href="/"><img src={room === "Yellow" ? closeIconDark : closeIcon} alt="close"/></a> 
        </div>
    </div>
)

export default InfoBar;