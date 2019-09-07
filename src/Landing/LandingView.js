
import React from 'react';
import Authenticated from './LandingViewAuthenticated';
import Unauthenticated from './LandingViewUnauthenticated';
import AuthSwitch from '../authentication/AuthSwitch';
import './index.scss';

const LandingView = props => (
  <div className='landing'>
    <AuthSwitch authenticated={Authenticated} unauthenticated={Unauthenticated} />
  </div>
);

export default LandingView;
