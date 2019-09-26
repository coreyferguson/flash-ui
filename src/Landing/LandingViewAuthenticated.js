
import React from 'react';
import PageContainer from '../PageContainer';
import ApolloProvider from '../ApolloProvider';
import CardList from '../cards/CardList';

export default class LandingViewAuthenticated extends React.PureComponent {

  render() {
    return (
      <ApolloProvider>
        <PageContainer>
          <CardList />
        </PageContainer>
      </ApolloProvider>
    );
  }

}
