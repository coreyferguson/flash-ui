
import Navigation from '../Navigation';
import PropTypes from 'prop-types';
import React from 'react';
import styled from './PageContainerStyle';

export class PageContainer extends React.PureComponent {

  render() {
    let className = this.props.className || '';
    if (this.props.className) className += ` ${this.props.className}`;
    return (
      <div className={className}>
        <Navigation showLogo={this.props.showLogo} />
        <div className='page-content'>
          {{...this.props.children}}
        </div>
      </div>
    );
  }

}

PageContainer.propTypes = {
  className: PropTypes.string,
  showLogo: PropTypes.bool
};

PageContainer.defaultProps = {
  showLogo: true
};

export default styled(PageContainer);
