
import React from 'react';
import PageContainer from '../PageContainer';
import Button from '../Button';

export default class LandingViewAuthenticated extends React.PureComponent {

  render() {
    return (
      <PageContainer>
        <div>
          <h1>Welcome!</h1>
          <Button to='/cards/edit'>Create Card</Button>
        </div>
      </PageContainer>
    );
  }

}
