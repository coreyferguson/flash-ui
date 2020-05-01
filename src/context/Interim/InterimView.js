
import PropTypes from 'prop-types';
import React from 'react';
import Loading from '@bit/overattribution.growme.loading-page';
import Style from './InterimStyle';
import Navigation from '../Navigation';

export default class InterimView extends React.PureComponent {

  render() {
    return (
      <Style>
        <Navigation />
        <Loading />
        {this.props.children}
      </Style>
    );
  }

}

InterimView.propTypes = {
  children: PropTypes.element
};
