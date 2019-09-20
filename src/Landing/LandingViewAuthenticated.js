
import React from 'react';
import PageContainer from '../PageContainer';
import Button from '../Button';
import CardListView from '../cards/CardListView';

export default class LandingViewAuthenticated extends React.PureComponent {

  render() {
    return (
      <PageContainer>
        <React.Fragment>
          <Button to='/cards/edit'>create card</Button>
          <CardListView />
        </React.Fragment>
      </PageContainer>
    );
  }

}
