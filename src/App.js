import React from 'react';
import './App.css';
import Pages from './pages';
import GlobalStyle from './components/GlobalStyle';
import { ApolloProvider } from '@apollo/client';
import client from './apollo-client'; // Updated client

function App() {
    return (
        <ApolloProvider client={client}>
            <GlobalStyle />
            <Pages />
        </ApolloProvider>
    );
}

export default App;