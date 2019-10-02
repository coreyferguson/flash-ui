
import ErrorBoundary from './ErrorBoundary';
import Landing from './Landing';
import OAuthCallbackView from './authentication/OAuthCallbackView';
import OAuthSignOutView from './authentication/OAuthSignOutView';
import PracticeLazyLoader from './Practice/PracticeLazyLoader';
import React, { useState } from 'react';
import sessionService from './authentication/sessionService';
import SigninView from './authentication/SigninView';
import SignoutView from './authentication/SignoutView';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.scss';

export default function Home() {
  const [ authenticatedViews, setAuthenticatedViews ] = useState();

  if (!authenticatedViews && sessionService.isUserSignedIn()) {
    import(/* webpackChunkName: "EditCard" */ './cards/EditCard').then(({ EditCardPage }) => {
      setAuthenticatedViews([
        <Route key='1' path='/cards/edit' exact component={EditCardPage} />,
        <Route key='2' path='/cards/:cardId/edit' exact component={EditCardPage} />
      ]);
    });
  }

  return (
    <div className='flash'>
      <ErrorBoundary>
        <Router>
          <Route path='/' exact component={Landing} />
          <Route path='/cards' exact component={Landing} />
          <Route path='/practice' exact component={PracticeLazyLoader} />
          <Route path='/signin' exact component={SigninView} />
          <Route path='/signout' exact component={SignoutView} />
          <Route path='/oauth/callback' exact component={OAuthCallbackView} />
          <Route path='/oauth/signout' exact component={OAuthSignOutView} />
          {authenticatedViews}
        </Router>
      </ErrorBoundary>
    </div>
  );
}
