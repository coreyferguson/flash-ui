
import React from 'react';
import PageContainer from '../PageContainer';
import sessionService from './sessionService';

export default class SignoutView extends React.PureComponent {

  constructor(props) {
    super(props);
    this.signout();
  }

  signout() {
    return sessionService.signout();
  }

  render() {
    return (
      <PageContainer>
        <h1>Signing out...</h1>
      </PageContainer>
    );
  }


}
