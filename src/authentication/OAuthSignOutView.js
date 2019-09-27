
import React from 'react';
import PageContainer from '../PageContainer';

export default class OAuthSignOutView extends React.PureComponent {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PageContainer>
        <h2>you are signed out</h2>
      </PageContainer>
    );
  }

}
