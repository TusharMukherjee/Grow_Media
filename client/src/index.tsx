import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { Provider } from 'react-redux';
import {store} from './astore/store'
import {ApolloClient, InMemoryCache, ApolloProvider, createHttpLink} from '@apollo/client'

const link = createHttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include'
})

// #Apollographql authentication


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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
