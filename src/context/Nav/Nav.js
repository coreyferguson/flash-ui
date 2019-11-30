
import React, { PureComponent } from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom';
import sessionService from '../authentication/sessionService';

export default class Nav extends PureComponent {

  constructor(props) {
    super(props);
    this._sessionService = props.sessionService || sessionService;
    this._authenticated = props.authenticated || this._sessionService.isUserSignedIn();
  }

  authenticatedView() {
    if (!this._authenticated) return;
    return (
      <React.Fragment>
        <li><Link to='/signout'>signout</Link></li>
        <li><Link to='/cards'>cards</Link></li>
        <li><Link to='/practice'>practice</Link></li>
      </React.Fragment>
    );
  }

  unauthenticatedView() {
    if (this._authenticated) return;
    return <li><Link to='/signin'>signin</Link></li>;
  }

  render() {
    return (
      <nav className='flash-nav'>
        <Link to='/' className='logo'>flash</Link>
        <ul>
          {this.authenticatedView() || this.unauthenticatedView()}
        </ul>
      </nav>
    );
  }
}
