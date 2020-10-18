import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import HomePage from './App';
import CalendarPage from './Pages/CalendarPage';
import VideoPage from './Pages/VideoPage';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';

import { Route, Link, BrowserRouter as Router } from 'react-router-dom';

export const client = new ApolloClient({
  uri: 'http://127.0.0.1:8000/graphql',
  cache: new InMemoryCache()
});

const routing = (
  <ApolloProvider client={client}>
  <Router>
    <div>
      <Route exact path="/" component={HomePage} />
      <Route path="/calendar" component={CalendarPage} />
      <Route path="/videos" component={VideoPage} />
    </div>
  </Router>
  </ApolloProvider>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
