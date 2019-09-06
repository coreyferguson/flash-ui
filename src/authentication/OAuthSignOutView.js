
import React from 'react';
import PageContainer from '../PageContainer';

export default class OAuthSignOutView extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PageContainer>
        <h3 className='header'>You are signed out</h3>
      </PageContainer>
    );
  }

}
