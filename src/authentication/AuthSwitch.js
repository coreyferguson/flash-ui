
import React from 'react';
import sessionService from './sessionService';

export default class AuthSwitch extends React.PureComponent {

  constructor(props) {
    super(props);
    props = props || {};
    this._sessionService = props.sessionService || sessionService;
    this.authenticated = this._sessionService.isUserSignedIn();
  }

  showAuthenticatedView() {
    if (!this.authenticated) return;
    const Component = this.props.authenticated;
    return <Component />
  }

  showUnauthenticatedView() {
    if (this.authenticated) return;
    const Component = this.props.unauthenticated;
    return <Component />
  }

  render() {
    return this.showUnauthenticatedView() || this.showAuthenticatedView();
  }

}

