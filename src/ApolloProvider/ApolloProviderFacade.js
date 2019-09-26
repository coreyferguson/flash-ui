
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import client from './apolloClient';

export default function ApolloProviderFacade(props) {
  return (
    <ApolloProvider client={client}>
      {props.children}
    </ApolloProvider>
  );
}
