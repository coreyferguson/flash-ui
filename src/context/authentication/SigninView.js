
import React from 'react';
import sessionService from './sessionService';
import clientService from '../clientService';
import Interim from '../Interim';

export default class Signin extends React.PureComponent {

  constructor(props) {
    super(props);
    this._clientService = props.clientService || clientService;
    this._sessionService = props.sessionService || sessionService;
    this.signin();
  }

  signin() {
    this._sessionService.signin().then(response => {
      this._clientService.navigate('/');
    });
  }

  render() {
    return (
      <Interim />
    );
  }

}
