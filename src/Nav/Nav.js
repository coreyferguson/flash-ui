
import React, { PureComponent } from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom';

export default class Nav extends PureComponent {
  render() {
    return (
      <nav className='flash-menu'>
        <div className="nav-wrapper">
          <a href="/" className="brand-logo">Flash</a>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to='/signin'>Sign In</Link></li>
          </ul>
        </div>
      </nav>
    );
  }
}
