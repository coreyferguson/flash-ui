import React from 'react';
import AuthSwitch from '../../../context/authentication/AuthSwitch';
import Unauthenticated from '../../../context/Landing/LandingViewUnauthenticated';
import Navigation from '../../../context/Navigation';
import Practice from './index';
import Style from './PracticePageStyle';

function Authenticated() {
  return (
    <Style>
      <Navigation />
      <Practice />
    </Style>
  );
}

export default function PracticePage(props) {
  return (
    <AuthSwitch authenticated={Authenticated} unauthenticated={Unauthenticated} />
  );
}