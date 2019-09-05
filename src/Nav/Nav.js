
import React, { PureComponent } from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom';
import sessionService from '../authentication/sessionService';

export default class Nav extends PureComponent {

  constructor(props) {
    super(props);
    this._authenticated = props._authenticated || sessionService.isUserSignedIn();
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
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">Flash</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
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
