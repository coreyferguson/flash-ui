
import React from 'react';
import './FitCenterPageContainer.scss';
import Navigation from '../Navigation';

// TODO: Rename to FitCenterPageContainer and inclue in the PageContainer folder
export default class FitCenterPageContainer extends React.PureComponent {
  render() {
    return (
      <div className='fit-center-page-container'>
        <Navigation />
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
