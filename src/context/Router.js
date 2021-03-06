
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ErrorBoundary from './error/ErrorBoundary';
import Landing from './Landing';
import OAuthCallbackView from './authentication/OAuthCallbackView';
import OAuthSignOutView from './authentication/OAuthSignOutView';
import React from 'react';
import SigninView from './authentication/SigninView';
import SignoutView from './authentication/SignoutView';
import { CardEditPage } from '../features/cards/CardEdit';
import { PracticePage } from '../features/cards/Practice';
import RootStyle, { GlobalStyle } from '@bit/overattribution.growme.root-style';

export default function Home() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <RootStyle>
        <ErrorBoundary>
          <Router>
            <Route path='/' exact component={Landing} />
            <Route path='/cards' exact component={Landing} />
            <Route path='/cards/edit' exact component={CardEditPage} />
            <Route path='/cards/:cardId/edit' exact component={CardEditPage} />
            <Route path='/practice' exact component={PracticePage} />
            <Route path='/signin' exact component={SigninView} />
            <Route path='/signout' exact component={SignoutView} />
            <Route path='/oauth/callback' exact component={OAuthCallbackView} />
            <Route path='/oauth/signout' exact component={OAuthSignOutView} />
          </Router>
        </ErrorBoundary>
      </RootStyle>
    </React.Fragment>
  );
}
