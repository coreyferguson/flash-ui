
import React from 'react';
import PageContainer from '../PageContainer';
import sessionService from './sessionService';

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
      <PageContainer>
        <h1>Signing out...</h1>
      </PageContainer>
    );
  }


}
