
import React from 'react';
import Authenticated from './LoadableLandingViewAuthenticated'
import Unauthenticated from './LandingViewUnauthenticated';
import AuthSwitch from '../authentication/AuthSwitch';
import './index.scss';

const LandingView = props => (
  <AuthSwitch authenticated={Authenticated} unauthenticated={Unauthenticated} />
);

export default LandingView;
