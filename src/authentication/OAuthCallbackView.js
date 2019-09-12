
import React from 'react';
import sessionService from './sessionService';
import clientService from '../clientService';
import Interim from '../Interim';

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
      <Interim>
        <h1>validating...</h1>
      </Interim>
    );
  }

}
