
import React from 'react';
import './FitCenterPageContainer.scss';
import Nav from '../Nav';

// TODO: Rename to FitCenterPageContainer and inclue in the PageContainer folder
export default class FitCenterPageContainer extends React.PureComponent {
  render() {
    return (
      <div className='fit-center-page-container'>
        <Nav />
        <div className='content'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
