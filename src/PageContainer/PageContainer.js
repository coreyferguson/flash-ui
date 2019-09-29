
import Nav from '../Nav';
import PropTypes from 'prop-types';
import React from 'react';
import styled from './PageContainerStyle';

export class PageContainer extends React.PureComponent {

  render() {
    let className = this.props.className || '';
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

export default styled(PageContainer);
