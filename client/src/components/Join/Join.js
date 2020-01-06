import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Used to actually link to our '/chat' path

import './Join.css';

// When the user joins a connection request will be fired up and when the user leaves a disconnection event will be fired up
const Join = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [agreement, setAgreement] = useState(false);

    return (
        <div className="joinOuterContainer">
            <div className="joinInnerContainer">
                <h1 className="heading">Gamechat</h1>
                {/* onChange is passing a parameter called event that will occur when a user is typing something into the input and event.target.value will hold that value. By using setName we can set the name with the target value*/}
                <div>
                    <input placeholder="Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)} /></div>
                <div>
                    <select placeholder="Select a room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)}>
                        <option className="selectOption" value="">Select Room</option>
                        <option className="selectOption" value="Red">Red</option>
                        <option className="selectOption" value="Blue">Blue</option>
                        <option className="selectOption" value="Yellow">Yellow</option>
                        <option className="selectOption" value="Green">Green</option>
                    </select>
                </div>
                <div >
                    <div className="agreementBox">
                        <label className="homeContainer">
                            <input type="checkbox" name="agreement" value="agreement" onChange={(event) => setAgreement(event.target.checked)} />
                            <span className="homeCheckmark"></span>
                        </label>
                        <div className="termsAgreement">
                            I understand that I am fully responsible for my own information and safety when using this application.
                    </div>
                </div>
                    {/* The line: onClick={event => (!name || !room) || !agreement  ? event.preventDefault() : null} means that if we dont have a name or room value
                        and didn't check the agreement we will prevent the button from moving on to the next page, because if we continue without a name or room it will break our app. Also the
                        null part means that we did provide a name or room or check the agreement so if we do have that do nothing and just continue to the next page
                    
                        Additionally regarding the 'to= ...' info: We passed data through URL: Link will go to the '/chat' component but before it does it will 
                        pass parameters by using the '?' question mark (this is how you pass parameters). It will pass the name and room values that were set from 
                        the input fields above. We pass multiple parameters with a single and '&' sign. This is how we are able to pass the info name and room state 
                        info from our Join page '/' to the Chat page '/chat'. */}
                    <Link onClick={event => (!name || !room || !agreement) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                        <button className="button mt-20" type="submit">Sign In</button>
                    </Link>
                </div>
            </div>
        </div>
    )
};

export default Join;