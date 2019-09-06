
import React from 'react';
import Authenticated from './LandingViewAuthenticated';
import Unauthenticated from './LandingViewUnauthenticated';
import AuthSwitch from '../authentication/AuthSwitch';

const LandingView = props =>
  <AuthSwitch authenticated={Authenticated} unauthenticated={Unauthenticated} />;

export default LandingView;
