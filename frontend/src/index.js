import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import HomePage from './App';
import CalendarPage from './Pages/CalendarPage';
import VideoPage from './Pages/VideoPage';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

const routing = (
  <Router>
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/calendar" component={CalendarPage} />
      <Route path="/videos" component={VideoPage} />
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
