
import './Interim.scss';
import PageContainer from '../PageContainer';
import PropTypes from 'prop-types';
import React from 'react';

export default class InterimView extends React.PureComponent {

  render() {
    return (
      <PageContainer className='interim-view'>
        {this.props.children}
      </PageContainer>
    );
  }

}

InterimView.propTypes = {
  children: PropTypes.element.isRequired
};
