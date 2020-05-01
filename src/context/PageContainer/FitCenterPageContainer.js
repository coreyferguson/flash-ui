
import React from 'react';
import Navigation from '../Navigation';
import Style from './FitCenterPageContainerStyle';

// TODO: Rename to FitCenterPageContainer and inclue in the PageContainer folder
export default class FitCenterPageContainer extends React.PureComponent {
  render() {
    return (
      <Style>
        <Navigation />
        <div className='content'>
          {this.props.children}
        </div>
      </Style>
    );
  }
}
