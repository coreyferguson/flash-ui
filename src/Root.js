
import ApolloClient from 'apollo-boost';
import React from 'react';
import Router from './Router';
import sessionService from './authentication/sessionService';
import { ApolloProvider } from '@apollo/react-hooks';

const client = new ApolloClient({
  uri: 'https://flash-api-dev.overattribution.com/graphql',
  request: operation => {
    const session = sessionService.getSignInUserSession();
    const token = session.idToken.jwtToken;
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ''
      }
    });
  }
});

export default function Root() {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
}
