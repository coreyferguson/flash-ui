
import React from 'react';
import PageContainer from '../PageContainer';

export default class OAuthSignOutView extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PageContainer>
        <h1>you are signed out</h1>
      </PageContainer>
    );
  }

}
