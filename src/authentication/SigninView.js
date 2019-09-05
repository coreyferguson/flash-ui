
import PageContainer from '../PageContainer';
import React from 'react';
import sessionService from './sessionService';

export default class Signin extends React.PureComponent {

  constructor(props) {
    super(props);
    sessionService.signin().then(response => {
      window.location.href = '/';
    });
  }

  render() {
    return (
      <PageContainer>
        <h1>Signing in...</h1>
      </PageContainer>
    );
  }

}
