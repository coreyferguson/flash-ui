
import React from 'react';
import PageContainer from '../PageContainer';
import { Link } from 'react-router-dom';

export default class LandingViewAuthenticated extends React.PureComponent {

  render() {
    return (
      <PageContainer>
        <div>
          <h1>Welcome!</h1>
          <Link to='/cards/edit'>Create Card</Link>
        </div>
      </PageContainer>
    );
  }

}
