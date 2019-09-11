
import React from 'react';
import Nav from '../Nav';
import PropTypes from 'prop-types';
import './PageContainer.scss';

export default class PageContainer extends React.PureComponent {

  render() {
    const className = this.props.flex ? 'flex' : '';
    return (
      <div className={`page-container ${className}`}>
        <Nav />
        <div className='page-content'>
          {{...this.props.children}}
        </div>
      </div>
    );
  }

}

PageContainer.propTypes = {
  flex: PropTypes.boolean
};
