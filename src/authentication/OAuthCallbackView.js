
import PageContainer from '../PageContainer';
import React from 'react';
import sessionService from './sessionService';
import clientService from '../clientService';

export default class OAuthCallbackView extends React.PureComponent {

  constructor(props) {
    super(props);
    this._sessionService = props.sessionService || sessionService;
    this._clientService = props.clientService || clientService;
    this.processCallback();
  }

  processCallback() {
    return this._sessionService.processCallback(this._clientService.getUrl()).then(response => {
      this._clientService.navigate('/');
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
