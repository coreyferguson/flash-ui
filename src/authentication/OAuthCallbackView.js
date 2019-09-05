
import PageContainer from '../PageContainer';
import React from 'react';
import sessionService from './sessionService';

export default class OAuthCallbackView extends React.PureComponent {

  constructor(props) {
    super(props);
    sessionService.processCallback(window.location.href).then(response => {
      console.log('response:', response);
      window.location.href = '/';
    });
  }

  render() {
    return (
      <PageContainer>
        <h1>Validating credentials...</h1>
      </PageContainer>
    );
  }

}
