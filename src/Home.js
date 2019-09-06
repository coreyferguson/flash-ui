
import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import ErrorBoundary from './ErrorBoundary';
import Landing from './Landing';
import SigninView from './authentication/SigninView';
import OAuthCallbackView from './authentication/OAuthCallbackView';
import SignoutView from './authentication/SignoutView';
import OAuthSignOutView from './authentication/OAuthSignOutView';

export default class Home extends React.PureComponent {

  render() {
    return (
      <ErrorBoundary>
        <Router>
          <Route path='/' exact component={Landing} />
          <Route path='/signin' exact component={SigninView} />
          <Route path='/signout' exact component={SignoutView} />
          <Route path='/oauth/callback' exact component={OAuthCallbackView} />
          <Route path='/oauth/signout' exact component={OAuthSignOutView} />
        </Router>
      </ErrorBoundary>
    );
  }

}
