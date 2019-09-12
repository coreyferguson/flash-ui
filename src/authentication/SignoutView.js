
import React from 'react';
import sessionService from './sessionService';
import Interim from '../Interim';

export default class SignoutView extends React.PureComponent {

  constructor(props) {
    super(props);
    this._sessionService = props.sessionService || sessionService;
    this.signout();
  }

  signout() {
    return this._sessionService.signout();
  }

  render() {
    return (
      <Interim />
    );
  }


}
