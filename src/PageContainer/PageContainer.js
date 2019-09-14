
import React from 'react';
import Nav from '../Nav';
import PropTypes from 'prop-types';
import './PageContainer.scss';

export default class PageContainer extends React.PureComponent {

  render() {
    let className = 'page-container';
    if (this.props.className) className += ` ${this.props.className}`;
    return (
      <div className={className}>
        <Nav />
        <div className='page-content'>
          {{...this.props.children}}
        </div>
      </div>
    );
  }

}

PageContainer.propTypes = {
  className: PropTypes.string
};
