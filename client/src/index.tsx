import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import { Provider } from 'react-redux';
import {store} from './astore/store'
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client'
import App from './App';

const link = createHttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include'
})

// #Apollographql authentication

function installSW(){
  if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/serviceworker.js')
    .then((reg) => console.log('service worker registered',reg))
    .catch((err) => console.log('service worker not registered',err))
  }
}

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ApolloProvider client={client}>
        <App/>
      </ApolloProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

installSW();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
