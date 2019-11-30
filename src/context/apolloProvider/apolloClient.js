
import ApolloClient from 'apollo-boost';
import sessionService from '../authentication/sessionService';
import config from 'config';

const client = new ApolloClient({
  uri: config.api.uri,
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
