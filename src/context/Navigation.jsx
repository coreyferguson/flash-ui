import React, { useEffect, useState } from 'react';
import Navigation from '@bit/overattribution.growme.navigation';
import sessionService from './authentication/sessionService';
import { Link } from 'react-router-dom';
import config from 'config';

export default function NavigationWrapper(props) {
  const [ authenticated, setAuthenticated ] = useState(false);
  useEffect(() => {
    if (sessionService.isUserSignedIn()) setAuthenticated(true);
  });
  const contextualLinks = [];
  if (!authenticated) {
    contextualLinks.push(<Link to='/signin'>sign in</Link>);
  } else {
    contextualLinks.push(<Link to='/signout'>sign out</Link>);
    contextualLinks.push(<Link to='/cards'>cards</Link>);
    contextualLinks.push(<Link to='/practice'>practice</Link>);
  }
  const logo = props.showLogo
    ? <Link to='/'><img src={`${config.assets.domain}/logo_medium.jpg`} />growme.fyi</Link>
    : undefined;
  const navigationProps = { logo, contextualLinks };
  return <Navigation {...navigationProps} />;
}

NavigationWrapper.propTypes = {
  showLogo: PropTypes.bool
};

NavigationWrapper.defaultProps = {
  showLogo: true
};