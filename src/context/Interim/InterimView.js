
import './Interim.scss';
import PageContainer from '../PageContainer';
import PropTypes from 'prop-types';
import React from 'react';
import Loading from '@bit/overattribution.growme.loading-page';

export default class InterimView extends React.PureComponent {

  render() {
    return (
      <PageContainer className='interim-view'>
        <React.Fragment>
          <Loading />
          {this.props.children}
        </React.Fragment>
      </PageContainer>
    );
  }

}

InterimView.propTypes = {
  children: PropTypes.element
};
