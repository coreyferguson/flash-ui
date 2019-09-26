
import ApolloClient from 'apollo-boost';
import sessionService from '../authentication/sessionService';

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

export default client;
