
import './Interim.scss';
import PageContainer from '../PageContainer';
import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../Loading';

export default class InterimView extends React.PureComponent {

  render() {
    return (
      <PageContainer className='interim-view'>
        <div>
          <Loading />
          {this.props.children}
        </div>
      </PageContainer>
    );
  }

}

InterimView.propTypes = {
  children: PropTypes.element.isRequired
};
