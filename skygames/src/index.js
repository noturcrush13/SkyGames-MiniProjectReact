import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import client from './database/apollo-client';
import { ApolloProvider } from '@apollo/client';
// console.log("client = ",client);

ReactDOM.render(
  <ApolloProvider client={client}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);