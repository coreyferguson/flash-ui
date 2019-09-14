
import React from 'react';
import { FitCenterPageContainer as PageContainer } from '../PageContainer';
import Button from '../Button';
import Construction from '../Construction';

export default class LandingViewAuthenticated extends React.PureComponent {

  render() {
    return (
      <PageContainer className='construction-wrapper'>
        <Construction>
          <Button to='/cards/edit'>create card</Button>
        </Construction>
      </PageContainer>
    );
  }

}
