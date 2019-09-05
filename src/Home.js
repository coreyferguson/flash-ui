
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import logger from './logger';

import LandingView from './LandingView';
import SigninView from './authentication/SigninView';
import OAuthCallbackView from './authentication/OAuthCallbackView';
import SignoutView from './authentication/SignoutView';
import OAuthSignOutView from './authentication/OAuthSignOutView';

export default class Home extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
    this._logger = props.logger || logger;
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error: error, errorInfo: errorInfo });
    this._logger.error('unknown error', { error, errorInfo });
  }

  showNormalState() {
    if (this.state.error) return;
    return (
      <Router>
        <Route path='/' exact component={LandingView} />
        <Route path='/signin' exact component={SigninView} />
        <Route path='/signout' exact component={SignoutView} />
        <Route path='/oauth/callback' exact component={OAuthCallbackView} />
        <Route path='/oauth/signout' exact component={OAuthSignOutView} />
      </Router>
    );
  }

  showErrorState() {
    if (!this.state.error) return;
    return <div>
      <h1>Unknown error</h1>
      <p>{this.state.error.message}</p>
    </div>;
  }

  render() {
    return this.showNormalState() || this.showErrorState();
  }

}
