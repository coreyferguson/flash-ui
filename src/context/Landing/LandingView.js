
import React from 'react';
import Authenticated from './LoadableLandingViewAuthenticated'
import Unauthenticated from './LandingViewUnauthenticated';
import AuthSwitch from '../authentication/AuthSwitch';
import Style from './LandingStyle';

const LandingView = () => (
  <Style><AuthSwitch authenticated={Authenticated} unauthenticated={Unauthenticated} /></Style>
);

export default LandingView;
