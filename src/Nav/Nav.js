
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
    return this._authenticated && (
      <Link to='/signout'>Signout</Link>
    );
  }

  unauthenticatedView() {
    return !this._authenticated && (
      <Link to='/signin'>Signin</Link>
    );
  }

  render() {
    return (
      <nav className='flash-menu'>
        <div className='nav-wrapper'>
          <Link to='/' className='brand-logo'>Flash</Link>
          <ul id='nav-mobile' className='right'>
            <li>
              {this.authenticatedView()}
              {this.unauthenticatedView()}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}
