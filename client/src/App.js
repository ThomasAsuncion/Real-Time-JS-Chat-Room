import React from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Join from './components/Join/Join'
import Chat from './components/Chat/Chat'


const App = () => (
    <Router>
        {/* When the user first comes to join the page he will be greeted with the Join component. inside of here he is going to pass his data into a login form 
        and through query strings we will pass that data to the chat. Once we have that data we will render the chat component. These are 2 seperate pages 
        (one is Join, one is Chat with their links being '/' and '/Chat') */}
        <Route path="/" exact component={Join} />
        <Route path="/chat" component={Chat} />
    </Router>
);

export default App;