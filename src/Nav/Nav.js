
import React, { PureComponent } from 'react';
import './Nav.scss';

export default class Nav extends PureComponent {
  render() {
    return (
      <nav className='flash-menu'>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">Flash</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><a href="/signin">Sign In</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}
