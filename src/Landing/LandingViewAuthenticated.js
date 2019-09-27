
import React from 'react';
import PageContainer from '../PageContainer';
import CardList from '../cards/CardList';

export default class LandingViewAuthenticated extends React.PureComponent {

  render() {
    return (
      <PageContainer>
        <CardList />
      </PageContainer>
    );
  }

}
